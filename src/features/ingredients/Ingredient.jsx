import { useSelector } from "react-redux";

function Ingredient({ type, children, handleClickIngredient, price }) {
  const selectedIngredients = useSelector((state) => state.pizza.ingredients);

  return (
    <>
      <div className="flex flex-col fadeIn">
        <li
          className="px-4 pb-4 hover:scale-105 transition max-sm:px-1 max-sm:pb-1 max-sm:hover:scale-100"
          onClick={() => handleClickIngredient(type)}
        >
          <div
            className={`menuItem max-sm:px-1 max-sm:pb-2 max-sm:w-24 ${
              selectedIngredients.includes(type) ? "selected" : ""
            }`}
          >
            <h4 className="flex justify-between max-sm:items-center max-sm:flex-col">
              <span className="max-sm:text-xs max-sm:font-extrabold">
                {children}
              </span>{" "}
              <span className="max-sm:text-xs">${price}</span>
            </h4>
            <img
              src={`/img/ingredient.jpg`}
              className=""
              alt={`ingredient ${type}`}
            ></img>
          </div>
        </li>
      </div>
    </>
  );
}

export default Ingredient;
