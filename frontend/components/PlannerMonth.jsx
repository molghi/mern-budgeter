import { context } from "../context/MyContext";
import PlannerMonthTable from "./PlannerMonthTable";
import { useContext } from "react";

function PlannerMonth({ index, startPeriod }) {
  const { setPlannerForm, setClickedDate } = useContext(context);
  const [startPeriodMonth, startPeriodYear] = startPeriod.split("-").map((x) => +x);

  let monthToRender, yearToRender;
  monthToRender = startPeriodMonth + index;
  yearToRender = startPeriodYear;
  if (monthToRender > 12) {
    monthToRender = 1;
    yearToRender = startPeriodYear + 1;
  }

  const currentDate = new Date().getDate();
  const lastMonthDay = new Date(yearToRender, monthToRender, 0).getDate();
  const monthInitialOffset = new Date(yearToRender, monthToRender - 1, 1).getDay();

  const weekdayNames = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const seasonColors = {
    winter: "#4a90e2", // cool blue — icy/cold tone
    spring: "#ffb7c5", // soft pinkish — fresh flowers
    summer: "#4caf50", // vivid green — lush foliage
    autumn: "#f4a261", // warm orange — falling leaves
  };

  const getSeasonColor = (monthNum) => {
    let result;
    switch (monthNum) {
      case 12:
      case 1:
      case 2:
        result = seasonColors.winter;
        break;
      case 3:
      case 4:
      case 5:
        result = seasonColors.spring;
        break;
      case 6:
      case 7:
      case 8:
        result = seasonColors.summer;
        break;
      case 9:
      case 10:
      case 11:
        result = seasonColors.autumn;
        break;
    }
    return result;
  };

  const isFirstMonthToShow = index === 0;

  const addEvent = (e) => {
    console.log("addEvent runs");
    setPlannerForm("add");
    setClickedDate(e.target.dataset.day);
  };

  // ============================================================================

  return (
    <div className="flex flex-col h-full">
      <div className="flex-1">
        {/* month title */}
        <h2 className={`font-bold text-center mb-4 text-xl text-[${getSeasonColor(monthToRender)}]`}>
          <span>
            Month {monthToRender} of {yearToRender}
          </span>{" "}
          {` `}
          <span className="font-normal transition duration-300 opacity-50 hover:opacity-100">
            ({monthNames[monthToRender - 1]})
          </span>
        </h2>

        {/* month block of days */}
        <div className="flex flex-wrap mb-10">
          {/* render weekday names */}
          {weekdayNames.map((x, i) => (
            <div
              key={i}
              style={{ width: 100 / 7 + "%" }}
              className="py-2 text-sm text-[#777] font-bold border border-[#777] opacity-100 text-center flex items-center justify-center"
            >
              {x.slice(0, 3)}
            </div>
          ))}

          {/* render empty offset days */}
          {new Array(monthInitialOffset).fill(0).map((x, i) => (
            <div key={i} style={{ width: 100 / 7 + "%" }} className="p-2 border border-[#555]"></div>
          ))}

          {/* render true days */}
          {new Array(lastMonthDay).fill(0).map((x, i) => (
            <div
              key={i}
              data-day={`${yearToRender}-${monthToRender.toString().padStart(2, "0")}-${(i + 1)
                .toString()
                .padStart(2, "0")}`}
              onClick={addEvent}
              style={{ width: 100 / 7 + "%" }}
              className={`month-day p-2 border text-center transition duration-200 cursor-pointer hover:bg-[${getSeasonColor(
                monthToRender
              )}] hover:text-[black] 
            
            ${
              isFirstMonthToShow && i + 1 < currentDate
                ? `text-[gray] bg-[#333] opacity-60 border-[gray] hover:border-[${getSeasonColor(
                    monthToRender
                  )}] hover:opacity-100 hover:text-[${getSeasonColor(monthToRender)}] hover:bg-black`
                : `text-[${getSeasonColor(monthToRender)}] border-[${getSeasonColor(monthToRender)}]`
            }
            
            ${
              isFirstMonthToShow && i + 1 === currentDate
                ? `bg-[${getSeasonColor(monthToRender)}] filter saturate-150 text-[black]`
                : ""
            }`}
            >
              {i + 1}
            </div>
          ))}
        </div>
      </div>

      {/* month table */}
      <PlannerMonthTable />
    </div>
  );
}

export default PlannerMonth;
