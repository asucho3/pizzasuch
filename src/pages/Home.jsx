import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { updateName } from "../features/user/userSlice";
import { useState } from "react";
import Logo from "../ui/Logo";

function Home() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [username, setUsername] = useState("");

  localStorage.setItem("user", "");

  function handleSubmit(e) {
    e.preventDefault();
    dispatch(updateName(username));
    localStorage.setItem("user", username);
    navigate("/menu");
  }
  return (
    <main className="bg-stone-200 h-screen flex flex-col pt-24 items-center">
      <Logo extraStyles="scale-150 text-4xl mb-12 outline-amber-700 animate-bounce" />
      <h1 className="text-4xl max-sm:text-xl">Make your very own pizza</h1>
      <h2 className="text-xl py-4 max-sm:text-lg">
        Enter your name and start now!
      </h2>
      <form onSubmit={handleSubmit} className="flex flex-col">
        <input
          className="text-md px-2 py-1 focus:outline-dotted outline-2 outline-offset-2 transition-transform focus:scale-105"
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        ></input>
        <button className="button">Start now!</button>
      </form>
    </main>
  );
}

export default Home;
