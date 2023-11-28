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
import { useEffect, useState } from "react";

function Order() {
  const cart = useSelector((state) => state.cart.cart);
  const totalPrice = useSelector((state) => state.cart.totalPrice);
  const navigate = useNavigate();
  const username = useSelector((state) => state.user.name);
  const dispatch = useDispatch();
  const { register, handleSubmit, reset, getValues, formState } = useForm();
  const { errors } = formState;
  const [placeError, setPlaceError] = useState("");
  const [place, setPlace] = useState({});

  const { mutate, isLoading } = useMutation({
    mutationFn: createOrder,
    onSuccess: () => {
      toast.success("new order created");
    },
    onError: (err) => toast.err(err.message),
  });

  // Places API
  // function placeChanged(e) {
  //   /* eslint-disable */
  //   setPlace({});
  //   setPlaceError("");
  //   if (autocomplete?.getPlace()) {
  //     for (const component of autocomplete.getPlace().address_components) {
  //       switch (component.types[0]) {
  //         case "street_number": {
  //           setPlace((place) => {
  //             return { ...place, street_number: component.long_name };
  //           });
  //           break;
  //         }
  //         case "route": {
  //           setPlace((place) => {
  //             return { ...place, route: component.long_name };
  //           });
  //           break;
  //         }
  //         case "sublocality_level_1": {
  //           setPlace((place) => {
  //             return { ...place, sublocality_level_1: component.long_name };
  //           });
  //           break;
  //         }
  //         case "locality": {
  //           setPlace((place) => {
  //             return { ...place, locality: component.long_name };
  //           });
  //           break;
  //         }
  //         case "administrative_area_level_2": {
  //           setPlace((place) => {
  //             return {
  //               ...place,
  //               administrative_area_level_2: component.long_name,
  //             };
  //           });
  //           break;
  //         }
  //         case "administrative_area_level_1": {
  //           setPlace((place) => {
  //             return {
  //               ...place,
  //               administrative_area_level_1: component.long_name,
  //             };
  //           });
  //           break;
  //         }
  //         case "country": {
  //           setPlace((place) => {
  //             return { ...place, country: component.long_name };
  //           });
  //           break;
  //         }
  //       }
  //     }
  //   }
  // }

  // let autocomplete;
  // useEffect(function () {
  //   /* eslint-disable */
  //   const center = { lat: -34.60809, lng: -58.430423 };
  //   const defaultBounds = {
  //     north: center.lat + 0.1,
  //     south: center.lat - 0.1,
  //     east: center.lng + 0.1,
  //     west: center.lng - 0.1,
  //   };
  //   const input = document.getElementById("pac-input");
  //   const options = {
  //     bounds: defaultBounds,
  //     componentRestrictions: { country: "ar" },
  //     fields: ["address_components", "geometry", "icon", "name"],
  //     strictBounds: true,
  //   };
  //   autocomplete = new google.maps.places.Autocomplete(input, options);
  //   autocomplete.addListener("place_changed", placeChanged);
  // }, []);

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
    // minimum requirements
    // if (
    //   !place.route ||
    //   !place.street_number ||
    //   !place.sublocality_level_1 ||
    //   !place.locality
    // ) {
    //   setPlaceError("Invalid address");
    //   return;
    // }

    // data.address = `${place.route} ${place.street_number}, ${place.sublocality_level_1}, ${place.locality}`;
    handleSendOrder(data.name, data.address);
  }

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <main className="main max-sm:flex max-sm:flex-col max-sm:justify-around">
          <div className="flex flex-col gap-4 py-8 max-sm:py-8">
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
            <div className="flex justify-between gap-4 items-center relative max-sm:w-screen max-sm:px-2">
              <label htmlFor="name">Full name</label>
              <input
                className="input "
                id="name"
                name="name"
                type="text"
                {...register("name", {
                  required: "This field is required",
                  minLength: {
                    value: 3,
                    message: "Must be at least 3 characters long",
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
            {/* {errors?.address && (
              <ErrorMessage>{errors.address.message}</ErrorMessage>
            )}
            <div className="flex justify-between gap-4 items-center relative w-96 max-sm:w-screen max-sm:px-2">
              <label htmlFor="Address">Address</label>
              <input
                className="input"
                type="text"
                id="pac-input"
                onChange={() => setPlace({})}
              ></input>
            </div>
            {placeError !== "" && <ErrorMessage>{placeError}</ErrorMessage>}
            */}
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
