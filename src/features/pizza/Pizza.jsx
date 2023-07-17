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
          className="px-4 relative hover:scale-105 transition"
          onClick={() => handleAddToCart(type)}
        >
          <div
            className={`menuItem ${
              inCart.find((element) => element.name === type) ? "selected" : ""
            }`}
          >
            <h4 className="flex justify-between ">
              <span>{children}</span> <span>${price}</span>
            </h4>
            <img src="/img/pizza.jpg" className="" alt={`pizza ${type}`}></img>
            <div className="absolute text-sm left-1/2 -bottom-0 text-base -translate-x-1/2">
              {inCart.find((element) => element.name === type) &&
                `${
                  inCart.find((element) => element.name === type).quantity
                } in cart`}
            </div>
          </div>
        </li>
        <div className="text-4xl justify-center flex gap-6 mb-2">
          <button onClick={() => handleAddToCart(type)}>+</button>
          <button onClick={() => handleRemoveFromCart(type)}>-</button>
        </div>
      </div>
    </>
  );
}

export default Pizza;
