import { useContext, useEffect } from "react";
import { context } from "../context/MyContext";
import { changeUsername, changeCurrencySign } from "../utils/headerFunctions";
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
    setWeekStartsOnMon,
    setCurrencySign,
  } = useContext(context);

  // header bar dropdown list elements
  const preferencesItems = ["Change Username", "Change Week Start", "Change Currency Sign"];
  const preferencesItemsClarifiers = [
    "Username displayed at the center of this block",
    "Set week start: Monday or Sunday (in Planner)",
    "",
  ];

  // ============================================================================

  // log out action
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
      console.error("OOPS!", error);
      setFlashMessageContent(["error", "Some error happened!"]);
    }
  };

  // ============================================================================

  // perform preference action (in header bar)
  const preferenceAction = (actionString) => {
    if (actionString === preferencesItems[0]) {
      // Change Username
      changeUsername(setUsername, setFlashMessageContent);
    }
    if (actionString === preferencesItems[1]) {
      // Change Week Start
      setWeekStartsOnMon((prev) => {
        localStorage.setItem("budgeter_week_starts_on_mon", JSON.stringify(!prev)); // persist change
        return !prev;
      });
    }
    if (actionString === preferencesItems[2]) {
      // Change Currency Sign
      changeCurrencySign(setCurrencySign, setFlashMessageContent);
    }
  };

  // ============================================================================

  useEffect(() => {
    // fetch username from db
    const getUserName = async () => {
      try {
        const response = await axios.get("http://localhost:8000/username", { withCredentials: true });
        if (response.status === 200) {
          setUsername(response.data.username);
        }
      } catch (error) {
        console.error(error);
      }
    };
    getUserName();

    // fetch currency sign (user preference) from LS
    const currencySignFromLS = localStorage.getItem("budgeter_currency_sign");
    if (currencySignFromLS) {
      setCurrencySign(JSON.parse(currencySignFromLS));
    }

    // fetch last selected main block (user preference: Tracker or Planner) from LS
    const mainBlockLastChoiceFromLS = localStorage.getItem("budgeter_last_selected");
    if (mainBlockLastChoiceFromLS) {
      setShownMainBlock(+JSON.parse(mainBlockLastChoiceFromLS));
    }
  }, []);

  useEffect(() => {
    document.title = `Your Budget ${shownMainBlock === 0 ? "Tracker" : "Planner"}`; // change doc title based on which block is showing, Tracker or Planner
    localStorage.setItem("budgeter_last_selected", JSON.stringify(shownMainBlock)); // persist/memorize choice
  }, [shownMainBlock]);

  // ============================================================================

  return (
    <header className="bg-gray-900 text-white">
      <div className="container mx-auto flex items-center justify-between py-4 px-3 md:px-6 gap-4 md:flex-nowrap flex-wrap">
        {/* Logo Text */}
        <div className="text-xl lg:text-2xl font-bold">
          💰 Your Budget <span className="text-green-300">{shownMainBlock === 0 ? "Tracker" : "Planner"}</span>
        </div>

        {/* Current user name */}
        {isLoggedIn && username && (
          <div
            title={userEmail && `Logged in as ${userEmail}`}
            className="text-[11px] lg:text-sm transition duration-300 opacity-50 hover:opacity-100 uppercase"
          >
            {username.toUpperCase()}'s Dashboard
          </div>
        )}

        {/* Action Btns */}
        <div className="flex gap-4 sm:flex-nowrap flex-wrap">
          {isLoggedIn ? (
            <>
              {/* Show Planner btn when Tracker is shown */}
              {shownMainBlock === 0 && (
                <button
                  title="Show Planner"
                  onClick={() => setShownMainBlock(1)}
                  className="bg-green-700 transition duration-200 hover:opacity-60 text-white font-bold py-2 px-4 rounded whitespace-nowrap sm:text-md text-sm"
                >
                  Planner
                </button>
              )}

              {/* Show Tracker btn when Planner is shown */}
              {shownMainBlock === 1 && (
                <button
                  title="Show Tracker"
                  onClick={() => setShownMainBlock(0)}
                  className="bg-green-700 transition duration-200 hover:opacity-60 text-white font-bold py-2 px-4 rounded whitespace-nowrap sm:text-md text-sm"
                >
                  Tracker
                </button>
              )}

              {/* Preference btns */}
              <div className="bg-purple-700 hover:bg-purple-800 transition duration-200 text-white font-bold py-2 px-4 rounded cursor-pointer relative dropdown-box sm:text-md text-sm">
                <span className="dropdown-title flex items-center gap-1">
                  Preferences
                  {/* icon: triangle pointing down */}
                  {/* <span className="inline-block w-0 h-0 border-l-4 border-l-transparent border-r-4 border-r-transparent border-t-4 border-t-white"></span> */}
                </span>
                <div className="absolute z-[10] right-0 mt-2 w-52 transition duration-300 dropdown-list">
                  <ul className="bg-gray-800 text-white rounded shadow-lg divide-y divide-gray-700">
                    {preferencesItems.map((x, i) => (
                      <li
                        key={i}
                        onClick={() => preferenceAction(x)}
                        title={preferencesItemsClarifiers[i]}
                        className="px-4 py-2 hover:bg-gray-700 cursor-pointer"
                      >
                        {x}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Log out */}
              <button
                onClick={logOut}
                className="bg-gray-700 transition duration-200 hover:opacity-100 opacity-60 text-white font-bold py-2 px-4 rounded whitespace-nowrap sm:text-md text-sm"
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
