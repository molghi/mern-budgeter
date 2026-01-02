import { useState, useContext, useEffect } from "react";
import { context } from "../context/MyContext";
import axios from "axios";

function PlannerBalanceForm() {
  const { userBalance, setUserBalance, setFlashMessageContent } = useContext(context);
  const [currentBalance, setCurrentBalance] = useState(userBalance);

  const updateCurrentBalance = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:8000/balance", { currentBalance }, { withCredentials: true });
      if (response.status === 200) {
        setUserBalance(response.data.balance);
        setFlashMessageContent(["success", response.data.msg]);
      }
    } catch (error) {
      console.log("OOPS!", error);
    }
  };

  // ============================================================================

  useEffect(() => {
    const fetchCurrentBalance = async () => {
      const response = await axios.get("http://localhost:8000/balance", { withCredentials: true });
      setUserBalance(response.data.balance);
      setCurrentBalance(response.data.balance);
    };
    fetchCurrentBalance();
  }, []);

  // ============================================================================

  return (
    <form onSubmit={updateCurrentBalance} className="max-w-[350px] flex-1 bg-gray-800 p-4 rounded-md text-white">
      <h3 className="text-lg font-bold mb-1">Current Balance</h3>
      <h4 className="text-[gray] text-sm mb-3 italic">All future expenses and income adjust from this.</h4>
      <div className="flex gap-4">
        {/* input field */}
        <div className="flex-1 flex gap-2">
          <input
            value={currentBalance}
            onChange={(e) => setCurrentBalance(e.target.value)}
            type="number"
            min={0}
            placeholder="Amount"
            className="flex-1 p-2 rounded bg-gray-700 text-white border border-gray-600"
          />
        </div>
        {/* action btn */}
        <button
          type="submit"
          className="flex-1 w-full transition duration-200 bg-green-600 hover:bg-green-500 py-2 rounded font-bold"
        >
          Set
        </button>
      </div>
    </form>
  );
}

export default PlannerBalanceForm;
