import { useContext } from "react";
import { context } from "../context/MyContext";
import BudgeterTableRow from "./BudgeterTableRow";

function BudgeterTable() {
  const { budgeterEntries } = useContext(context);

  const tableColumns = ["Amount", "Category", "Date", "Note", "Actions"];

  return (
    <>
      <div className="flex-[7]">
        <div className="p-4 pt-0 bg-black text-[white] rounded">
          <h4 className="mb-3 text-center text-2xl font-bold text-[khaki]">
            Entries {budgeterEntries && budgeterEntries.length > 0 && `(${budgeterEntries.length})`}
          </h4>

          <table className="w-full border border-[gray] text-[gray]">
            <thead className="bg-black/80 border border-[gray]">
              <tr>
                {/* Table headers */}
                {tableColumns.map((x, i) => (
                  <th key={i} className="py-2 px-3 text-green-500 text-left">
                    {x}
                  </th>
                ))}
              </tr>
            </thead>

            <tbody className="divide-y divide-[gray]">
              {/* Output entries */}
              {budgeterEntries && budgeterEntries.length > 0 ? (
                budgeterEntries.map((item) => <BudgeterTableRow key={item._id} data={item} />)
              ) : (
                <tr>
                  <td colSpan="5" className="italic text-center py-4 text-[gray]">
                    Your entries will show here.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}

export default BudgeterTable;
