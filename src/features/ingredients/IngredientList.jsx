import { useQuery } from "@tanstack/react-query";
import Ingredient from "./Ingredient";
import { getProducts } from "../../services/apiCalls";

function IngredientList({ handleClickIngredient }) {
  // get product list from server
  const {
    isLoading,
    data: ingredients,
    error,
  } = useQuery({
    queryKey: ["pizzas"],
    queryFn: getProducts,
  });

  return (
    <>
      {!isLoading && (
        <>
          {ingredients.map((ingredient) =>
            ingredient.ingredients === null ? (
              <Ingredient
                key={ingredient.id}
                handleClickIngredient={handleClickIngredient}
                type={ingredient.name}
                price={ingredient.price}
              >
                {ingredient.name}
              </Ingredient>
            ) : null,
          )}
        </>
      )}
    </>
  );
}

export default IngredientList;
