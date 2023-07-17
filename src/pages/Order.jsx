import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { createOrder, getProducts } from "../services/apiCalls";
import { useMutation, useQuery } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import { clearCart } from "../features/cart/cartSlice";
import { clearIngredients } from "../features/pizza/pizzaSlice";
import { addOrder } from "../features/order/orderSlice";
import Loader from "../ui/Loader";
import { useForm } from "react-hook-form";
import ErrorMessage from "../ui/ErrorMessage";

function Order() {
  const cart = useSelector((state) => state.cart.cart);
  const totalPrice = useSelector((state) => state.cart.totalPrice);
  const navigate = useNavigate();
  const username = useSelector((state) => state.user.name);
  const dispatch = useDispatch();
  const { register, handleSubmit, reset, getValues, formState } = useForm();
  const { errors } = formState;

  const { mutate, isLoading } = useMutation({
    mutationFn: createOrder,
    onSuccess: () => {
      toast.success("new order created");
    },
    onError: (err) => toast.err(err.message),
  });

  // assemble the order
  function handleSendOrder(fullName, address) {
    const newOrder = {
      customer: username,
      products: cart
        .reduce((acc, cur) => acc + cur.name + "!", "")
        .slice(0, -1),
      ingredients: cart
        .reduce((acc, cur) => acc + cur.ingredients + "!", "")
        .slice(0, -1),
      quantities: cart
        .reduce((acc, cur) => acc + cur.quantity + "!", "")
        .slice(0, -1),
      prices: cart.reduce((acc, cur) => acc + cur.price + "!", "").slice(0, -1),
      totalPrice: cart.reduce((acc, cur) => acc + cur.price, 0),
      orderId: crypto.randomUUID(),
      //minimum 15 min delay + up to an hour more
      // ETA: String(Date.now() + Math.ceil(Math.random() * 3600000)),
      fullName,
      address,
    };
    // create the order, clear cart and ingredients and navigate to the status page
    // mutate(newOrder);
    dispatch(addOrder(newOrder));
    dispatch(clearCart());
    dispatch(clearIngredients());
    navigate(`/order/pay`);
    // navigate(`/order/status?orderId=${newOrder.orderId}`);
  }

  // handle form submission
  function onSubmit(data) {
    handleSendOrder(data.name, data.address);
  }

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <main className="main">
          <div className="flex flex-col gap-4 py-8">
            <h1>Your cart:</h1>
            <ul className="flex flex-col gap-2">
              {/* loop through the cart array and calculate the totals for each "row" */}
              {cart.map((item, index) => {
                return (
                  <li key={index} className="flex flex-col">
                    <h3>
                      {item.quantity} x {item.name} ($
                      {item.price})
                    </h3>
                    {/* if this is not a custom pizza, slice the string to avoid showing empty characters and extra "," */}
                    {/* this happens because the DB stores the ingredients in a fixed size of 5 columns */}
                    <span className="text-xs italic">
                      {item.ingredients.join(", ")}
                    </span>
                  </li>
                );
              })}
            </ul>
            <div className="font-semibold">Total: ${totalPrice}</div>
          </div>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col gap-4 justify-center w-1/8"
          >
            <div className="flex justify-between gap-4 items-center relative">
              <label htmlFor="name">Full name</label>
              <input
                className="input "
                id="name"
                name="name"
                type="text"
                {...register("name", {
                  required: "this field is required",
                  minLength: {
                    value: 3,
                    message: "must be at least 3 characters long",
                  },
                })}
              ></input>
            </div>
            {errors?.name && <ErrorMessage>{errors.name.message}</ErrorMessage>}
            <div className="flex justify-between gap-4 items-center relative">
              <label htmlFor="Address">Address</label>
              <input
                className="input"
                id="address"
                name="address"
                type="text"
                {...register("address", {
                  required: "this field is required",
                  minLength: {
                    value: 3,
                    message: "must be at least 3 characters long",
                  },
                })}
              ></input>
            </div>
            {errors?.address && (
              <ErrorMessage>{errors.address.message}</ErrorMessage>
            )}
            <button className="bg-yellow-300 mt-8 py-4 hover:bg-yellow-500 transition">
              Order now!
            </button>
          </form>
        </main>
      )}
    </>
  );
}

export default Order;
