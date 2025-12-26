import { useContext } from "react";
import { context } from "../context/MyContext";

function BudgeterForm() {
  const { mode } = useContext(context);
  const formFields = [
    { name: "Amount", label: "amount", required: true, type: "input", subtype: "number", placeholder: "Enter amount" },
    { name: "Category", label: "category", required: true, type: "select", subtype: "", placeholder: "" },
    { name: "Date", label: "date", required: true, type: "input", subtype: "date", placeholder: "" },
    { name: "Note (optional)", label: "note", required: false, type: "input", subtype: "text", placeholder: "Enter notes" },
  ];

  const formSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <>
      <div className="border border-[gray] rounded">
        <div className="p-4 bg-black text-[white] rounded">
          <h4 className="mb-3 text-center text-xl font-bold text-[khaki]">{mode} Entry</h4>

          <form className="space-y-4" onSubmit={formSubmit}>
            {/* Form Fields */}
            {formFields.map((entry, index) => (
              <div key={index}>
                <label htmlFor={entry.label} className="block text-[gray] font-bold">
                  {entry.name} {entry.required && <span className="text-red-400">*</span>}
                </label>
                {entry.type === "input" ? (
                  <input
                    required={entry.required}
                    name={entry.label}
                    id={entry.label}
                    type={entry.subtype}
                    placeholder={entry.placeholder}
                    className="w-full p-2 border border-[gray] rounded bg-black text-[white]"
                    autoFocus={entry.label === "amount"}
                  />
                ) : (
                  <select name="category" id="category" className="w-full p-2 border border-[gray] rounded bg-black text-[gray]">
                    <option disabled>Select category</option>
                  </select>
                )}
              </div>
            ))}

            <button className="w-full py-2 border border-[white] transition duration-200 rounded hover:text-black hover:bg-[white]">{mode}</button>
          </form>
        </div>
      </div>
    </>
  );
}

export default BudgeterForm;
