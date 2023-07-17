import { useMutation, useQuery } from "@tanstack/react-query";
import Pizza from "./Pizza";
import { getProducts } from "../../services/apiCalls";

function PizzaList({ handleAddToCart, handleRemoveFromCart }) {
  // get product list from server
  const {
    isLoading,
    data: pizzas,
    error,
  } = useQuery({
    queryKey: ["pizzas"],
    queryFn: getProducts,
  });

  return (
    <>
      {!isLoading && (
        <>
          {pizzas.map((pizza) =>
            pizza.ingredients !== null ? (
              <Pizza
                key={pizza.id}
                handleRemoveFromCart={handleRemoveFromCart}
                handleAddToCart={handleAddToCart}
                type={pizza.name}
                price={pizza.price}
              >
                {pizza.name}
              </Pizza>
            ) : null,
          )}
        </>
      )}
    </>
  );
}

export default PizzaList;
