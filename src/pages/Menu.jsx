import { useState } from "react";
import IngredientList from "../features/ingredients/IngredientList";
import PizzaList from "../features/pizza/PizzaList";
import { NavLink, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  addIngredient,
  removeIngredient,
  clearIngredients,
} from "../features/pizza/pizzaSlice";
import {
  add,
  clearCart,
  decrease,
  increase,
  remove,
} from "../features/cart/cartSlice";
import { useQuery } from "@tanstack/react-query";
import { getProducts } from "../services/apiCalls";
import Loader from "../ui/Loader";
import { toast } from "react-hot-toast";

function Menu() {
  const [selection, setSelection] = useState("");

  // grab the state and dispatch from the redux store
  const ingredients = useSelector((state) => state.pizza.ingredients);
  const cart = useSelector((state) => state.cart.cart);
  const dispatch = useDispatch();

  // useNavigate from react router
  const navigate = useNavigate();

  // get product list from server
  const {
    isLoading,
    data: products,
    error,
  } = useQuery({
    queryKey: ["pizzas"],
    queryFn: getProducts,
  });

  // toggle the ingredient selection
  function handleClickIngredient(ing) {
    if (!ingredients?.includes(ing)) {
      dispatch(addIngredient(ing));
    } else {
      dispatch(removeIngredient(ing));
    }
  }

  // add custom or standard pizza to cart
  function handleAddToCart(item) {
    // if there is no parameter, this is not a standard pizza; create a custom pizza with the ingredients stored in the store
    if (!item) {
      dispatch(
        add({
          name: "custom pizza",
          ingredients,
          quantity: 1,
          price: ingredients.reduce(
            (acc, cur) =>
              acc + products.find((product) => product.name === cur).price,
            0,
          ),
        }),
      );
      dispatch(clearIngredients());
      toast.success("custom pizza added to cart");
    } else {
      // if "item" is not empty, this is a standard pizza. find it from the "products" array that we got from the DB through react query
      const pizzaObj = products.find((pizza) => pizza.name === item);
      // assemble the pizza object
      const pizza = {
        name: item,
        ingredients: pizzaObj.ingredients.split(","),
        quantity: 1,
        price: pizzaObj.price,
      };
      // if the item already exists, increase quantity, otherwise add to cart
      if (cart.find((cartItem) => cartItem.name === item)) {
        dispatch(increase(item));
      } else {
        dispatch(add(pizza));
      }
    }
  }

  function handleRemoveFromCart(item) {
    const cartItem = cart.find((cartItem) => cartItem.name === item);
    // guard clause
    if (!cartItem) return;
    if (cartItem.quantity > 1) {
      dispatch(decrease(item));
    } else {
      dispatch(remove(item));
    }
  }

  function handleClearCart() {
    dispatch(clearIngredients());
    dispatch(clearCart());
  }

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <main className="main">
          <h1 className="text-4xl pt-0 p-4">Pick an option</h1>
          <ul className="flex flex-col ">
            <li
              onClick={() => setSelection("custom")}
              className="text-xl p-2 cursor-pointer hover:bg-slate-400 transition"
            >
              I want to make my own pizza!
            </li>
            <li
              onClick={() => setSelection("standard")}
              className="text-xl p-2 cursor-pointer hover:bg-slate-400 transition"
            >
              Choose a predefined pizza
            </li>
          </ul>
          <div className="flex w-3/4 justify-center max-sm:w-full">
            <ul className="flex flex-wrap mt-4 mx-auto w-full justify-center">
              {selection === "custom" && (
                <IngredientList handleClickIngredient={handleClickIngredient} />
              )}

              {selection === "standard" && (
                <PizzaList
                  handleRemoveFromCart={handleRemoveFromCart}
                  handleAddToCart={handleAddToCart}
                />
              )}
            </ul>
          </div>
          <div className="flex flex-col items-center">
            <ul className="flex gap-2">
              {/* <li>1 x mozarella,</li>
            <li>1 x mozarella,</li>
            <li>1 x mozarella</li> */}
            </ul>
            {ingredients.length > 0 && selection === "custom" && (
              <button
                onClick={() => handleAddToCart()}
                className="button w-64 justify-start"
              >
                Create and add to cart
              </button>
            )}
          </div>
          {cart.length > 0 && (
            <>
              <button
                onClick={() => navigate("/order")}
                className="fadeIn button w-64 justify-start bg-green-400 hover:bg-green-700"
              >
                Done
              </button>

              <button
                onClick={() => handleClearCart()}
                className="fadeIn button w-64 justify-start bg-gray-400 hover:bg-gray-700"
              >
                Reset
              </button>
            </>
          )}
        </main>
      )}
    </>
  );
}

export default Menu;
