import { useEffect, useContext } from "react";
import axios from "axios";
import { context } from "../context/MyContext";
import BudgeterSummary from "./BudgeterSummary";
import BudgeterForm from "./BudgeterForm";
import BudgeterTable from "./BudgeterTable";

function Budgeter() {
  const { setBudgeterEntries, period } = useContext(context);

  useEffect(() => {
    // fetch all user entries
    const getUserEntries = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/entries?period=${period}`);
        setBudgeterEntries(response.data.documents);
      } catch (error) {
        console.error("OOPS!", error);
      }
    };
    getUserEntries();
  }, []);

  return (
    <div className="pb-[100px]">
      <BudgeterSummary />
      <div className="max-w-5xl mx-auto flex gap-5">
        <BudgeterForm />
        <BudgeterTable />
      </div>
    </div>
  );
}

export default Budgeter;
