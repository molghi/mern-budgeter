import { useContext } from "react";
import { context } from "../context/MyContext";

function Header() {
  const { isLoggedIn, username, shownMainBlock, setShownMainBlock } = useContext(context);

  return (
    <header className="bg-gray-900 text-white">
      <div className="container mx-auto flex items-center justify-between py-4 px-6">
        {/* Logo */}
        <div className="text-2xl font-bold">
          💰 Your Budget <span className="text-green-300">{shownMainBlock === 0 ? "Tracker" : "Planner"}</span>
        </div>

        {/* Current user name */}
        {username && <div className="text-sm transition duration-300 opacity-50 hover:opacity-100">{username}'s Dashboard</div>}

        {/* Btns */}
        <div className="flex gap-4">
          {isLoggedIn ? (
            <>
              {/* Show Planner btn when Tracker is shown */}
              {shownMainBlock === 0 && (
                <button
                  title="Show Planner"
                  onClick={() => setShownMainBlock(1)}
                  className="bg-green-700 transition duration-200 hover:opacity-60 text-white font-bold py-2 px-4 rounded"
                >
                  Planner
                </button>
              )}

              {/* Show Tracker btn when Planner is shown */}
              {shownMainBlock === 1 && (
                <button
                  title="Show Tracker"
                  onClick={() => setShownMainBlock(0)}
                  className="bg-green-700 transition duration-200 hover:opacity-60 text-white font-bold py-2 px-4 rounded"
                >
                  Tracker
                </button>
              )}

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
