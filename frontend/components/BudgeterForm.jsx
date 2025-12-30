import { useContext, useState, useEffect, useRef } from "react";
import { context } from "../context/MyContext";
import { formSubmit } from "../utils/budgeterFormFunctions";

function BudgeterForm() {
  const {
    mode,
    setMode,
    budgeterEntries,
    setBudgeterEntries,
    itemInEdit,
    setItemInEdit,
    setIsLoading,
    setFlashMessageContent,
    period,
    setTotalExpenses,
    setTotalIncome,
    setTotalsPerCategory,
  } = useContext(context);
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("");
  const [date, setDate] = useState(
    `${new Date().getFullYear()}-${(new Date().getMonth() + 1).toString().padStart(2, "0")}-${new Date().getDate().toString().padStart(2, "0")}`
  );
  const [note, setNote] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const firstInputRef = useRef(null);

  // ============================================================================

  const formFields = [
    { name: "Amount", label: "amount", required: true, type: "input", subtype: "number", placeholder: "Enter amount" },
    { name: "Category", label: "category", required: true, type: "select", subtype: "", placeholder: "" },
    { name: "Date", label: "date", required: true, type: "input", subtype: "date", placeholder: "" },
    { name: "Note (optional)", label: "note", required: false, type: "input", subtype: "text", placeholder: "Enter notes" },
  ];

  const categories = [
    ["Groceries", "groceries"],
    ["Housing (rent, utilities)", "housing"],
    ["Transportation (fuel, public transport)", "transport"],
    ["Food & Dining", "dining"],
    ["Healthcare & Medical", "medical"],
    ["Entertainment (movies, games, hobbies)", "entertainment"],
    ["Shopping & Apparel", "shopping"],
    ["Education (courses, books, tuition)", "education"],
    ["Subscriptions & Memberships", "subscriptions"],
    ["Travel & Vacation", "travel"],
    ["Personal Care", "personal_care"],
    ["Gifts & Donations", "gifts"],
    ["Electronics & Gadgets", "electronics"],
    ["Misc / Other", "misc_other"],
    ["Income", "income"],
  ];

  // ============================================================================

  const returnValue = (label) => {
    if (label === "amount") return amount;
    if (label === "category") return category;
    if (label === "date") return date;
    if (label === "note") return note;
  };
  const setValue = (label, value) => {
    if (label === "amount") setAmount(value);
    if (label === "category") setCategory(value);
    if (label === "date") setDate(value);
    if (label === "note") setNote(value);
  };

  // ============================================================================

  useEffect(() => {
    if (itemInEdit) {
      setMode("Edit");
      setAmount(itemInEdit.amount);
      setCategory(itemInEdit.category);
      setDate(itemInEdit.date);
      setNote(itemInEdit.note);
    }
    if (itemInEdit === null) {
      setMode("Add");
      setAmount("");
      setCategory("");
      setDate(`${new Date().getFullYear()}-${(new Date().getMonth() + 1).toString().padStart(2, "0")}-${new Date().getDate().toString().padStart(2, "0")}`);
      setNote("");
    }
    firstInputRef.current.focus();
  }, [itemInEdit, budgeterEntries]);

  // ============================================================================

  return (
    <>
      <div className="flex-[3] border border-[gray] rounded-xl overflow-hidden self-start">
        <div className="p-4 pb-8 bg-black text-[white] rounded">
          <h4 className="mb-3 text-center text-2xl font-bold text-[khaki]">{mode} Entry</h4>

          <form
            className="space-y-4"
            onSubmit={(e) =>
              formSubmit(
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
                period,
                setTotalExpenses,
                setTotalIncome,
                setTotalsPerCategory
              )
            }
          >
            {/* Iterate thru & create form fields */}
            {formFields.map((entry, index) => (
              <div key={index}>
                <label htmlFor={entry.label} className="block text-[gray] font-bold">
                  {entry.name} {entry.required && <span className="text-red-500">*</span>}
                </label>
                {entry.type === "input" ? (
                  <input
                    ref={entry.label === "amount" ? firstInputRef : null}
                    value={returnValue(entry.label)}
                    onChange={(e) => setValue(entry.label, e.target.value)}
                    required={entry.required}
                    name={entry.label}
                    id={entry.label}
                    type={entry.subtype}
                    // min={entry.subtype === "number" ? 0 : ""}
                    placeholder={entry.placeholder}
                    className="cursor-pointer w-full p-2 border border-[gray] rounded bg-black text-[white]"
                    autoFocus={entry.label === "amount"}
                  />
                ) : (
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    name="category"
                    id="category"
                    className="cursor-pointer w-full p-2 border border-[gray] rounded bg-black"
                  >
                    <option value="" disabled>
                      Select category
                    </option>
                    {categories.map((x, i) => (
                      <option key={i} value={x[1]}>
                        {x[0]}
                      </option>
                    ))}
                  </select>
                )}
              </div>
            ))}

            <button
              className={`w-full py-2 border transition duration-300 rounded hover:text-black ${
                mode === "Add" ? "border-[limegreen] text-[limegreen] hover:bg-[limegreen]" : "border-[dodgerblue] text-[dodgerblue] hover:bg-[dodgerblue]"
              }`}
            >
              {mode}
            </button>

            {/* output validation errors */}
            {errorMsg && (
              <div className="mt-4 text-[red]">
                <span className="font-bold">Error: </span>
                {errorMsg}
              </div>
            )}
          </form>
        </div>
      </div>
    </>
  );
}

export default BudgeterForm;
