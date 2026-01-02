import axios from "axios";
import { useEffect, useContext } from "react";
import { context } from "../context/MyContext";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Auth from "../components/Auth";
import Budgeter from "../components/Budgeter";
import Planner from "../components/Planner";
import FlashMessage from "../components/FlashMessage";

function App() {
  const {
    isLoggedIn,
    shownMainBlock,
    setBudgeterEntries,
    period,
    setFlashMessageContent,
    setIsLoggedIn,
    setUsername,
    setUserEmail,
    setUserBalance,
  } = useContext(context);

  useEffect(() => {
    // fetch all user entries for selected period
    const getUserEntries = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/entries?period=${period}`, { withCredentials: true });
        if (response.status === 200) {
          setBudgeterEntries(response.data.documents);
          setIsLoggedIn(true);
          setUsername(response.data.name);
          setUserEmail(response.data.email);
        }
      } catch (error) {
        console.error("OOPS!", error);
        if (isLoggedIn) setFlashMessageContent(["error", "Unfortunately, there was an error."]);
      }
    };
    getUserEntries();
  }, [period]);

  return (
    <>
      <div className="flex flex-col min-h-[100vh]">
        <main className="flex-1 pb-[100px]">
          <Header />

          {/* if not logged in, show Auth block */}
          {!isLoggedIn && <Auth />}

          {/* if logged in and selected main block is Tracker/Budgeter (0), show Tracker/Budgeter */}
          {isLoggedIn && shownMainBlock === 0 && <Budgeter />}

          {/* if logged in and selected main block is Planner (1), show Planner */}
          {isLoggedIn && shownMainBlock === 1 && <Planner />}
        </main>
        <Footer />

        <FlashMessage />
      </div>
    </>
  );
}

export default App;
