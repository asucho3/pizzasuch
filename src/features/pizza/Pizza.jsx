import { useSelector } from "react-redux";

function Pizza({
  type,
  children,
  handleAddToCart,
  handleRemoveFromCart,
  price,
}) {
  const inCart = useSelector((state) => state.cart.cart);

  return (
    <>
      <div className="flex flex-col fadeIn">
        <li
          className="px-4 relative hover:scale-105 transition max-sm:px-1 max-sm:pb-1 max-sm:hover:scale-100"
          onClick={() => handleAddToCart(type)}
        >
          <div
            className={`menuItem max-sm:px-1 max-sm:w-24 ${
              inCart.find((element) => element.name === type) ? "selected" : ""
            }`}
          >
            <h4 className="flex justify-between max-sm:items-center max-sm:flex-col">
              <span className="max-sm:text-xs max-sm:font-extrabold">
                {children}
              </span>{" "}
              <span className="max-sm:text-xs">${price}</span>
            </h4>
            <img src="/img/pizza.jpg" className="" alt={`pizza ${type}`}></img>
            <div className="absolute text-sm left-1/2 -bottom-0 text-base -translate-x-1/2 max-sm:text-xs max-sm:bottom-1 max-sm:w-20 max-sm:left-[3.8rem]">
              {inCart.find((element) => element.name === type) &&
                `${
                  inCart.find((element) => element.name === type).quantity
                } in cart`}
            </div>
          </div>
        </li>
        <div className="text-4xl justify-center flex gap-6 mb-2 max-sm:text-lg">
          <button onClick={() => handleAddToCart(type)}>+</button>
          <button onClick={() => handleRemoveFromCart(type)}>-</button>
        </div>
      </div>
    </>
  );
}

export default Pizza;
