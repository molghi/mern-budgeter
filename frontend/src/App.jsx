import { useContext } from "react";
import { context } from "../context/MyContext";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Auth from "../components/Auth";
import Budgeter from "../components/Budgeter";
import FlashMessage from "../components/FlashMessage";

function App() {
  const { isLoggedIn, shownMainBlock } = useContext(context);

  return (
    <>
      <div className="flex flex-col min-h-[100vh]">
        <main className="flex-1">
          <Header />

          {/* if not logged in, show Auth block */}
          {!isLoggedIn && <Auth />}

          {/* if logged in and selected main block is Tracker/Budgeter (0), show Tracker/Budgeter */}
          {isLoggedIn && shownMainBlock === 0 && <Budgeter />}

          {/* if logged in and selected main block is Planner (1), show Planner */}
          {isLoggedIn && shownMainBlock === 1 && <div className="text-white text-center my-10">show Planner</div>}
        </main>
        <Footer />

        <FlashMessage />
      </div>
    </>
  );
}

export default App;
