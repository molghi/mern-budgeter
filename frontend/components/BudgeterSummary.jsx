import { useContext, useState } from "react";
import { context } from "../context/MyContext";

function BudgeterSummary() {
  const { currencySign } = useContext(context);
  const [periods, setPeriods] = useState([`Month ${new Date().getMonth() + 1} of ${new Date().getFullYear()}`]);

  return (
    <div className="max-w-5xl mx-auto border border-[gray] rounded-xl overflow-hidden mt-12 mb-8">
      <div className="p-4 bg-black text-[white] rounded">
        <h4 className="mb-3 text-center text-2xl font-bold text-[khaki]">Spending Summary</h4>

        <div className="flex justify-between items-center mb-4">
          <div>
            <div className="mb-2">
              <strong className="inline-block min-w-[125px] text-[white]">Total Income:</strong>
              <span className="text-lime-400">
                {currencySign}
                {/* total_income */}
              </span>
            </div>
            <div>
              <strong className="inline-block min-w-[125px] text-[white]">Total Expense:</strong>
              <span className="text-orange-400">
                {currencySign}
                {/* total_expense */}
              </span>
            </div>
          </div>
          <div>
            <strong className="mr-2 text-[white]">Select Period:</strong>
            <select className="period-select bg-black border border-[white] text-[white] rounded px-2 py-1 cursor-pointer">
              {/* Populate w/ periods */}
              {periods.map((x, i) => {
                return <option key={i}>{x}</option>;
              })}
            </select>
          </div>
        </div>

        <h5 className="text-md mb-2">
          <span className="text-[gray] font-bold">Chart:</span> Distribution of Expenses by Category
        </h5>

        <div className="bg-[#111] rounded p-6">
          <div className="flex items-center justify-center h-full mb-4">
            {/* Chart */}
            {/* @if ($total_expense > 0)
            @foreach ($categories_summary as $k => $v)
                @if ($k !== 'income')
                 <div className="h-[10px] bg-[{{ $category_colors[$k] }}] w-[{{ ($v/$total_expense)*100 }}%]"></div>
                @endif
            @endforeach
        @endif */}
          </div>
          <ol className="font-bold m-0">
            {/* Legend */}
            {/* @if ($total_expense > 0)
        <ol className="list-decimal list-inside">
            @foreach ($categories_summary as $k => $v)
                @if ($k !== 'income')
                 <li className="text-[{{ $category_colors[$k] }}]">{{$k}} ({{$currency_sign}} {{$v}})</li>
                @endif
            @endforeach
        </ol>
        @endif */}
          </ol>
        </div>
      </div>
    </div>
  );
}

export default BudgeterSummary;
