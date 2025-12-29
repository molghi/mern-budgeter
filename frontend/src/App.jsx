import { useContext } from "react";
import { context } from "../context/MyContext";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Auth from "../components/Auth";
import Budgeter from "../components/Budgeter";
import FlashMessage from "../components/FlashMessage";

function App() {
  const { isLoggedIn } = useContext(context);

  return (
    <>
      <div className="flex flex-col min-h-[100vh]">
        <main className="flex-1">
          <Header />

          {!isLoggedIn ? <Auth /> : <Budgeter />}
        </main>
        <Footer />

        <FlashMessage />
      </div>
    </>
  );
}

export default App;
