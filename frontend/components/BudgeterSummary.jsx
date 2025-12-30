import { useContext, useState, useEffect } from "react";
import { context } from "../context/MyContext";
import { changePeriod, fetchPeriodTotals } from "../utils/budgeterSummaryFunctions";
import spinnerImg from "../public/images/loading-spinner-2.png";

function BudgeterSummary() {
  const { currencySign, period, setPeriod, totalsPerCategory, setTotalsPerCategory, isLoading, setIsLoading, budgeterEntries } = useContext(context);
  const [totalIncome, setTotalIncome] = useState(0);
  const [totalExpenses, setTotalExpenses] = useState(0);

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

  const categoryColors = {
    groceries: "#FF7F7F", // pink
    housing: "#7FB3FF", // light blue
    transport: "#7FFFBA", // mint green
    dining: "#FFFF7F", // pastel yellow
    medical: "#FFBF7F", // vibrant peach
    entertainment: "#BF7FFF", // lavender
    shopping: "#FF7FBF", // saturated magenta
    education: "#7FFFBF", // aqua
    subscriptions: "#FFDF7F", // soft orange
    travel: "#7FCFFF", // bright sky blue
    personal_care: "#FFDFBF", // apricot
    gifts: "#BFFF7F", // light green
    electronics: "#DF7FFF", // saturated lilac
    misc_other: "#FF7F7F", // redder soft red
    income: "limegreen",
  };

  useEffect(() => {
    fetchPeriodTotals(period, setTotalExpenses, setTotalIncome, setTotalsPerCategory, setIsLoading);
  }, [budgeterEntries, period]);

  // ============================================================================

  return (
    <div className="max-w-5xl mx-auto border border-[gray] rounded-xl overflow-hidden mt-12 mb-8 relative">
      <div className="p-4 bg-black text-[white] rounded">
        <h4 className="mb-3 text-center text-2xl font-bold text-[khaki]">Spending Summary</h4>

        {/* Show loading spinner on fetching data */}
        {isLoading && (
          <div className="max-h-[300px] flex justify-center absolute w-full">
            <img src={spinnerImg} className="animate-spin w-[150px] h-[150px]" alt="Loading spinner" />
          </div>
        )}

        <div className="flex justify-between items-center mb-4">
          <div>
            {/* Total income */}
            <div className="mb-2">
              <strong className="inline-block min-w-[125px] text-[white]">Total Income:</strong>
              <span className="text-lime-400">
                {currencySign} {totalIncome}
              </span>
            </div>

            {/* Total expense */}
            <div>
              <strong className="inline-block min-w-[125px] text-[white]">Total Expense:</strong>
              <span className="text-orange-400">
                {currencySign} {totalExpenses}
              </span>
            </div>
          </div>

          {/* Select Period */}
          <div>
            <div className="mb-2 text-center font-bold text-[#999]">Select Period:</div>
            <div className="flex items-center gap-3">
              {/* Go prev period */}
              <button
                onClick={() => changePeriod("prev", period, setPeriod)}
                className="rounded bg-[silver] pl-2 pr-2.5 text-black transition duration-200 hover:opacity-60 font-bold active:opacity-40"
                title="Go to previous period"
              >
                <span className="inline-block -rotate-90">▲</span>
              </button>
              {/* Go to present period */}
              <span
                onClick={() => changePeriod("cur", period, setPeriod)}
                className="cursor-pointer transition duration-200 hover:opacity-70 active:opacity-50"
                title="Go to present period"
              >{`Month ${period.split("-")[0]} of ${period.split("-")[1]}`}</span>
              {/* Go next period */}
              <button
                onClick={() => changePeriod("next", period, setPeriod)}
                className="rounded bg-[silver] pr-2 pl-2.5 text-black transition duration-200 hover:opacity-60 font-bold active:opacity-40"
                title="Go to next period"
              >
                <span className="inline-block rotate-90">▲</span>
              </button>
            </div>
          </div>
        </div>

        {/* Chart Title */}
        <h5 className="text-md mb-2">
          <span className="text-[gray] font-bold">Chart:</span> Distribution of Expenses by Category
        </h5>

        {/* Chart Block */}
        <div className="bg-[#181818] rounded p-6">
          {/* Chart Bar */}
          <div className="flex items-center justify-center h-full mb-4">
            {totalExpenses > 0 &&
              totalsPerCategory &&
              totalsPerCategory.length > 0 &&
              totalsPerCategory
                .sort((a, b) => b.totalAmount - a.totalAmount)
                .map((el) => (
                  <div
                    key={el._id}
                    title={el._id}
                    className={`h-[12px] bg-[${categoryColors[el._id]}] w-[${Math.floor(
                      (el.totalAmount / totalExpenses) * 100
                    )}%] filter hover:saturate-150 hover:shadow-xl transition duration-300 border-r border-[#181818]`}
                  ></div>
                ))}
          </div>

          {/* Chart Legend */}
          <div>
            {totalExpenses > 0 && (
              <ol className="list-decimal list-inside ml-5">
                {totalsPerCategory
                  .filter((x) => x._id !== "income")
                  .sort((a, b) => b.totalAmount - a.totalAmount)
                  .map((el) => (
                    <li key={el._id} className={`text-[${categoryColors[el._id]}] font-bold`}>
                      <span className="">{categories.find((x) => x.includes(el._id))[0]}</span>{" "}
                      <span className="opacity-50 transition duration-300 hover:opacity-100">
                        ({currencySign}
                        {el.totalAmount})
                      </span>
                    </li>
                  ))}
              </ol>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default BudgeterSummary;
