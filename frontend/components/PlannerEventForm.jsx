import { useRef, useEffect, useContext, useState } from "react";
import { context } from "../context/MyContext";
import { submitPlannerEventForm } from "../utils/plannerEventFormFunctions";

function PlannerEventForm({ howManyMonths }) {
  const {
    clickedDate,
    plannerForm,
    setPlannerForm,
    setFlashMessageContent,
    setPlannerEntries,
    setMonthsPureRemains,
    userBalance,
  } = useContext(context);
  // plannerForm values: null (do not show), 'add', 'edit'.

  const firstFieldToFocusRef = useRef(null);
  const [when, setWhen] = useState(clickedDate);
  const [amount, setAmount] = useState(0);
  const [title, setTitle] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    setWhen(clickedDate);
    firstFieldToFocusRef.current.focus();
  }, [clickedDate]);

  return (
    <form
      onSubmit={(e) =>
        submitPlannerEventForm(
          e,
          plannerForm,
          when,
          amount,
          title,
          setFlashMessageContent,
          setPlannerEntries,
          setMonthsPureRemains,
          howManyMonths,
          userBalance
        )
      }
      className={`flex-1 bg-gray-800 p-4 rounded-md text-white relative`}
    >
      {/* title */}
      <h3 className="text-lg mb-1 flex gap-3">
        <span className="font-bold">
          {plannerForm.slice(0, 1).toUpperCase() + plannerForm.slice(1)} Expense / Income
        </span>
        <span className="opacity-50 text-[14px] transition duration-300 hover:opacity-100">
          (Amount: expenses are negative; income is positive)
        </span>
      </h3>

      {/* close form btn */}
      <button
        type="button"
        className="absolute top-2 right-2 flex h-8 w-8 items-center justify-center rounded-full font-bold transition duration-300 bg-red-600 text-white opacity-50 hover:opacity-100"
        aria-label="Close"
        title="Close form"
        onClick={() => setPlannerForm(null)}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-4 w-4"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth="3"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>

      {/* FIELDS */}
      <div className="grid grid-cols-4 gap-4 items-end">
        {/* when field */}
        <div>
          <span className="inline-block text-[gray] text-sm mb-1 italic">When</span>
          <input
            required
            value={when}
            onChange={(e) => setWhen(e.target.value)}
            type="date"
            placeholder="Date"
            className="w-full p-2 rounded bg-gray-700 text-white border border-gray-600"
          />
        </div>

        {/* amount field */}
        <div>
          <span className="inline-block text-[gray] text-sm mb-1 italic">Amount</span>
          <input
            required
            ref={firstFieldToFocusRef}
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            type="number"
            placeholder="Amount"
            className="w-full p-2 rounded bg-gray-700 text-white border border-gray-600"
          />
        </div>

        {/* title field */}
        <div>
          <span className="inline-block text-[gray] text-sm mb-1 italic">Title</span>
          <input
            required
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            type="text"
            placeholder="Title"
            className="w-full p-2 rounded bg-gray-700 text-white border border-gray-600"
          />
        </div>

        {/* action btn */}
        <button
          type="submit"
          className={`w-full hover:opacity-70 py-2 rounded font-bold transition duration-200 min-h-[42px] ${
            plannerForm === "add" ? "bg-blue-600" : "bg-green-600"
          }`}
        >
          {plannerForm.slice(0, 1).toUpperCase() + plannerForm.slice(1)} Event
        </button>

        {/* output errors */}
        {error && (
          <div className="mt-3 text-[red]">
            <span className="font-bold">Error:</span> {error}
          </div>
        )}
      </div>
    </form>
  );
}

export default PlannerEventForm;
