import { useSelector } from "react-redux";

function Footer() {
  const cartItems = useSelector((state) => state.cart.cart);

  return (
    <footer className="bg-stone-400 h-fit justify-self-end w-full flex flex-col items-center py-2 gap-2">
      <div>
        {cartItems.length > 0
          ? `${cartItems.reduce(
              (acc, cur) => acc + cur.quantity,
              0,
            )} items on cart`
          : `Your cart is empty`}

        {/* loop through the cart and calculate the total amount to be paid */}
        {cartItems.length > 0 &&
          ` / Total price: $ ${cartItems.reduce(
            (acc, cur) => acc + cur.price,
            0,
          )}`}
      </div>
    </footer>
  );
}

export default Footer;
