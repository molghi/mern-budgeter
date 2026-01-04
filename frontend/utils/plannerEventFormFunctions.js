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
  userBalance,
  entryId,
  setPlannerForm
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
    setPlannerForm(null);
  }

  if (mode === "edit") {
    const response = await axios.patch(
      "http://localhost:8000/plannerentries",
      { entryId, when, amount, title },
      { withCredentials: true }
    );
    if (response.status === 200) {
      setFlashMessageContent(["success", "Entry updated!"]);
      const allPlannerEntries = await axios.get("http://localhost:8000/plannerentries", { withCredentials: true });
      setPlannerEntries(allPlannerEntries.data.documents);
      setMonthsPureRemains(getMonthsRemains(allPlannerEntries.data.documents, howManyMonths, userBalance));
    }
    setPlannerForm(null);
  }
}

export { submitPlannerEventForm };
