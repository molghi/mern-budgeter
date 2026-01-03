import { useEffect, useContext } from "react";
import { context } from "../context/MyContext";
import PlannerMonths from "./PlannerMonths";
import PlannerForms from "./PlannerForms";
import { getMonthsRemains } from "../utils/plannerFunctions";
import axios from "axios";

function Planner() {
  const { setPlannerEntries, setMonthsPureRemains, userBalance } = useContext(context);
  const howManyMonths = 4;

  useEffect(() => {
    const fetchPlannerEntries = async () => {
      try {
        const allPlannerEntries = await axios.get("http://localhost:8000/plannerentries", { withCredentials: true });
        if (allPlannerEntries.status === 200) {
          setPlannerEntries(allPlannerEntries.data.documents);
          setMonthsPureRemains(getMonthsRemains(allPlannerEntries.data.documents, howManyMonths, userBalance));
        }
      } catch (error) {
        console.error(error);
      }
    };
    fetchPlannerEntries();
  }, [userBalance]);

  return (
    <>
      <h1 className="text-center text-white text-3xl font-bold mt-7 mb-4">Plan Your Budget</h1>
      <PlannerMonths howManyMonths={howManyMonths} />
      <PlannerForms howManyMonths={howManyMonths} />
    </>
  );
}

export default Planner;
