import { useSelector } from "react-redux";

function Ingredient({ type, children, handleClickIngredient, price }) {
  const selectedIngredients = useSelector((state) => state.pizza.ingredients);

  return (
    <>
      <div className="flex flex-col fadeIn">
        <li
          className="px-4 pb-4 hover:scale-105 transition"
          onClick={() => handleClickIngredient(type)}
        >
          <div
            className={`menuItem ${
              selectedIngredients.includes(type) ? "selected" : ""
            }`}
          >
            <h4 className="flex justify-between ">
              <span>{children}</span> <span>${price}</span>
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
