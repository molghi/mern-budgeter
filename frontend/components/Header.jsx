import { useContext } from "react";
import { context } from "../context/MyContext";
import axios from "axios";

function Header() {
  const {
    isLoggedIn,
    username,
    userEmail,
    shownMainBlock,
    setShownMainBlock,
    setFlashMessageContent,
    setIsLoggedIn,
    setUsername,
    setUserEmail,
  } = useContext(context);

  const logOut = async () => {
    try {
      const response = await axios.get("http://localhost:8000/logout", { withCredentials: true });
      if (response.status === 200 && response.data.msg === "User logged out!") {
        setFlashMessageContent(["success", "User logged out!"]);
        setIsLoggedIn(false);
        setUsername("");
        setUserEmail("");
      }
    } catch (error) {
      console.log("OOPS!", error);
      setFlashMessageContent(["error", "Some error happened!"]);
    }
  };

  return (
    <header className="bg-gray-900 text-white">
      <div className="container mx-auto flex items-center justify-between py-4 px-6">
        {/* Logo */}
        <div className="text-2xl font-bold">
          💰 Your Budget <span className="text-green-300">{shownMainBlock === 0 ? "Tracker" : "Planner"}</span>
        </div>

        {/* Current user name */}
        {isLoggedIn && username && (
          <div
            title={userEmail && `Logged in as ${userEmail}`}
            className="text-sm transition duration-300 opacity-50 hover:opacity-100 uppercase"
          >
            {username.toUpperCase()}'s Dashboard
          </div>
        )}

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

              <button
                onClick={logOut}
                className="bg-gray-700 transition duration-200 hover:opacity-100 opacity-60 text-white font-bold py-2 px-4 rounded"
              >
                Log Out
              </button>
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
