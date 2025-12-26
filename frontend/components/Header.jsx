import { useContext } from "react";
import { context } from "../context/MyContext";

function Header() {
  const { isLoggedIn } = useContext(context);

  return (
    <header className="bg-gray-900 text-white">
      <div className="container mx-auto flex items-center justify-between py-4 px-6">
        {/* Logo */}
        <div className="text-2xl font-bold">Your Budgeter</div>

        {/* Btns */}
        <div className="flex gap-4">
          {isLoggedIn ? (
            <>
              <button className="bg-green-700 transition duration-200 hover:opacity-60 text-white font-bold py-2 px-4 rounded">Planner</button>
              {/* <button className="bg-green-700 transition duration-200 hover:opacity-60 text-white font-bold py-2 px-4 rounded">Budgeter</button> */}
              <button className="bg-gray-700 transition duration-200 hover:opacity-100 opacity-60 text-white font-bold py-2 px-4 rounded">Log Out</button>
            </>
          ) : (
            <>
              {/* <button className="bg-green-700 transition duration-200 hover:opacity-60 text-white font-bold py-2 px-4 rounded">Sign Up</button> */}
              {/* <button className="bg-blue-700 transition duration-200 hover:opacity-60 text-white font-bold py-2 px-4 rounded">Log In</button> */}
            </>
          )}
        </div>
      </div>
    </header>
  );
}

export default Header;
