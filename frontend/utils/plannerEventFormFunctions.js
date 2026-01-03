import axios from "axios";
import { getMonthsRemains } from "./plannerFunctions";

async function submitPlannerEventForm(
  e,
  mode,
  when,
  amount,
  title,
  setFlashMessageContent,
  setPlannerEntries,
  setMonthsPureRemains,
  howManyMonths,
  userBalance
) {
  e.preventDefault();

  if (mode === "add") {
    const response = await axios.post(
      "http://localhost:8000/plannerentries",
      { when, amount, title },
      { withCredentials: true }
    );
    if (response.status === 200) {
      setFlashMessageContent(["success", "Entry added!"]);
      const allPlannerEntries = await axios.get("http://localhost:8000/plannerentries", { withCredentials: true });
      setPlannerEntries(allPlannerEntries.data.documents);
      setMonthsPureRemains(getMonthsRemains(allPlannerEntries.data.documents, howManyMonths, userBalance));
    }
  }

  if (mode === "edit") {
  }
}

export { submitPlannerEventForm };
