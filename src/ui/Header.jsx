import { useDispatch, useSelector } from "react-redux";
import { clearCart } from "../features/cart/cartSlice";
import { clearIngredients } from "../features/pizza/pizzaSlice";
import { useNavigate } from "react-router-dom";
import { updateName } from "../features/user/userSlice";
import Logo from "./Logo";

function Header() {
  const username = useSelector((state) => state.user.name);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  if (!username) {
    const savedUser = localStorage.getItem("user");
    if (savedUser) dispatch(updateName(savedUser));
  }

  const handleBack = function () {
    dispatch(clearCart());
    dispatch(clearIngredients());
    dispatch(updateName(undefined));
    localStorage.setItem("user", "");
    navigate("/");
  };

  return (
    <nav className="bg-yellow-500 flex justify-between py-2 px-12 max-sm:px-6 max-sm:text-sm max-sm:justify-end">
      <ul className="flex gap-6 max-sm:gap-0 max-sm:hidden">
        <li>
          <Logo />
        </li>
        <li>{username ? `Let's make a pizza, ${username}!` : "Welcome!"}</li>
      </ul>
      <button onClick={handleBack}>Back to start</button>
    </nav>
  );
}

export default Header;
