import { fetchPeriodTotals } from "./budgeterSummaryFunctions";
import axios from "axios";

// ============================================================================

// helper function
const isValidDate = (str) => {
  if (!/^(197\d|198\d|199\d|20\d{2})-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01])$/.test(str)) {
    return false;
  }
  const d = new Date(str);
  return !isNaN(d) && d.toISOString().startsWith(str);
  // What this enforces: Year: 1970–2099, Month: 01–12, Day: 01–31, Exact YYYY-MM-DD format
};

// ============================================================================

const formSubmit = async (
  e,
  amount,
  category,
  categories,
  date,
  note,
  setErrorMsg,
  setBudgeterEntries,
  mode,
  itemInEdit,
  setItemInEdit,
  setIsLoading,
  setFlashMessageContent,
  period
) => {
  e.preventDefault();

  // validate
  if (!category.trim()) return setErrorMsg("Please set a category!");
  if (+amount === 0) return setErrorMsg("Please set a valid amount!");
  if (+amount < 0) return setErrorMsg("Please set a positive amount! (Even for expenses.)");
  if (!date.trim()) return setErrorMsg("Please set a valid date!");
  if (!isValidDate(date.trim()))
    return setErrorMsg("Please set a valid date! Years: 1970–2099, Months: 01–12, Days: 01–31.");

  setErrorMsg("");

  // compose obj
  const entry = {
    amount: amount.trim(),
    category: categories.find((catItem) => catItem.includes(category))[1],
    date: date.trim(),
    note: note.trim(),
    dateProper: new Date(date.trim()),
  };

  let flag = "added";
  let response;

  // shoot network request
  try {
    setIsLoading(true);
    if (mode === "Add") {
      // req to insert new entry
      response = await axios.post("http://localhost:8000/entries", entry, { withCredentials: true });
    }

    if (mode === "Edit") {
      // req to edit entry
      response = await axios.put(
        "http://localhost:8000/entries",
        { ...entry, id: itemInEdit._id },
        { withCredentials: true }
      );
      flag = "updated";
    }

    if (response.status === 200) {
      const allUserEntries = await axios.get(`http://localhost:8000/entries?period=${period}`, {
        withCredentials: true,
      }); // fetch all user entries
      setBudgeterEntries(allUserEntries.data.documents);
      setFlashMessageContent(["success", `Entry ${flag}!`]);
    }

    setIsLoading(false);
    setItemInEdit(null);
  } catch (error) {
    console.error("OOPS!", error);
    setFlashMessageContent(["error", "Unfortunately, there was an error."]);
  }
};

// ============================================================================

export { isValidDate, formSubmit };
