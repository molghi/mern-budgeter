import { useContext, useState, useEffect } from "react";
import { context } from "../context/MyContext";

function PlannerMonthTable({ monthIndex, monthToRender, yearToRender }) {
  const {
    currencySign,
    plannerEntries,
    setHighlightedDay,
    userBalance,
    lastMonthRemains,
    setLastMonthRemains,
    monthsPureRemains,
  } = useContext(context);
  const [thisMonthEntries, setThisMonthEntries] = useState([]);
  const [thisMonthRemains, setThisMonthRemains] = useState(0);

  // ============================================================================

  useEffect(() => {
    const neededEntries = plannerEntries.filter((el) => {
      const eventMonth = new Date(el.date).getMonth() + 1;
      const eventYear = new Date(el.date).getFullYear();
      if (eventMonth === monthToRender && eventYear === yearToRender) return el;
    });
    setThisMonthEntries(neededEntries);
    setThisMonthRemains(monthsPureRemains[monthIndex]);
  }, [plannerEntries]);

  // ============================================================================

  const howManyDays = (str) => {
    const nowDayTimestamp = new Date().setHours(0, 0, 0, 0);
    const thenDayTimestamp = new Date(str).setHours(0, 0, 0, 0);
    const differenceRaw = thenDayTimestamp - nowDayTimestamp;
    const numOfDays = Math.abs(Math.floor(differenceRaw / 1000 / 60 / 60 / 24));
    const numOfWeeks = (numOfDays / 7).toFixed(1);
    if (differenceRaw > 0) {
      // it's in the future
      if (numOfDays < 8) {
        return "in " + numOfDays + ` ${numOfDays > 1 ? "days" : "day"}`;
      } else return "in " + numOfWeeks + ` ${numOfWeeks > 1 ? "weeks" : "week"}`;
    } else {
      // it's in the past
      if (numOfDays < 8) {
        return numOfDays + ` ${numOfDays > 1 ? "days" : "day"} ago`;
      } else return numOfWeeks + ` ${numOfWeeks > 1 ? "weeks" : "week"} ago`;
    }
  };

  // ============================================================================

  const hoverOverRow = (e) => {
    setHighlightedDay(e.target.closest("tr").dataset.date);
  };

  const hoverOutRow = (e) => {
    setHighlightedDay("");
  };

  // ============================================================================

  return (
    <table className="min-w-full border border-gray-700 text-white">
      {/* headers */}
      <thead className="bg-gray-800">
        <tr className="text-sm">
          <th className="px-3 py-2 text-left border-b border-gray-600">Title</th>
          <th className="px-3 py-2 text-left border-b border-gray-600">Amount</th>
          <th className="px-3 py-2 text-left border-b border-gray-600">When</th>
        </tr>
      </thead>

      {/* rows */}
      <tbody className="bg-gray-900">
        {/* render current balance in first month */}
        {monthIndex === 0 && (
          <tr className="text-sm text-[gold]">
            <td className="px-3 py-2">Balance</td>
            <td className="px-3 py-2">
              {currencySign}
              {userBalance}
            </td>
            <td className="px-3 py-2 italic"></td>
          </tr>
        )}

        {/* render entries */}
        {thisMonthEntries.map((entry, i) => (
          <tr
            data-date={entry.date}
            key={entry._id}
            className={`border-b border-gray-700 text-sm ${entry.amount > 0 ? "text-[limegreen]" : "text-[coral]"}`}
            onMouseEnter={hoverOverRow}
            onMouseLeave={hoverOutRow}
          >
            <td className="px-3 py-2">{entry.title}</td>
            <td className="px-3 py-2">
              {entry.amount > 0 ? (
                <>
                  +
                  <span className="">
                    {currencySign}
                    {entry.amount}
                  </span>
                </>
              ) : (
                <>
                  -
                  <span className="">
                    {currencySign}
                    {Math.abs(entry.amount)}
                  </span>
                </>
              )}
            </td>
            <td className="px-3 py-2 whitespace-nowrap" title={entry.date}>
              {howManyDays(entry.date)}
            </td>
          </tr>
        ))}

        {/* render remains */}
        <tr
          data-value={thisMonthRemains}
          className="text-sm bg-gray-800"
          title="Projected balance after planned transactions (income, expenses) and last month’s remainder"
        >
          <td className="px-3 py-2 font-bold">Remains</td>
          <td className="px-3 py-2">
            {currencySign}
            {thisMonthRemains}
          </td>
          <td className="px-3 py-2"></td>
        </tr>
      </tbody>
    </table>
  );
}

export default PlannerMonthTable;
