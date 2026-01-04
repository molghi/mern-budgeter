import { context } from "../context/MyContext";
import PlannerMonthTable from "./PlannerMonthTable";
import { useContext, useEffect } from "react";

function PlannerMonth({ index, startPeriod, howManyMonths }) {
  const { setPlannerForm, setClickedDate, highlightedDay, plannerEntries, weekStartsOnMon, setWeekStartsOnMon } =
    useContext(context);
  const [startPeriodMonth, startPeriodYear] = startPeriod.split("-").map((x) => +x);

  const plannerEntriesOnlyDates = plannerEntries.map((x) => x.date);

  let monthToRender, yearToRender;
  monthToRender = startPeriodMonth + index;
  yearToRender = startPeriodYear;
  if (monthToRender > 12) {
    monthToRender = 1;
    yearToRender = startPeriodYear + 1;
  }

  const currentDate = new Date().getDate();
  const lastMonthDay = new Date(yearToRender, monthToRender, 0).getDate();
  let monthInitialOffset = new Date(yearToRender, monthToRender - 1, 1).getDay();

  if (weekStartsOnMon) {
    monthInitialOffset = monthInitialOffset - 1;
    if (monthInitialOffset < 0) monthInitialOffset = 7 + monthInitialOffset;
  }

  const weekdayNames = weekStartsOnMon
    ? ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"]
    : ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

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

  useEffect(() => {
    let fromLS = localStorage.getItem("budgeter_week_starts_on_mon");
    if (fromLS) {
      setWeekStartsOnMon(JSON.parse(fromLS));
    }
  }, []);

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
    setPlannerForm("add");
    setClickedDate(e.target.dataset.day);
  };

  // ============================================================================

  return (
    <div className="flex flex-col h-full">
      <div className="">
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
        <div className="min-h-[325px]">
          <div className="flex flex-wrap ">
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
            {new Array(lastMonthDay).fill(0).map((x, i) => {
              const curDate = `${yearToRender}-${monthToRender.toString().padStart(2, "0")}-${(i + 1)
                .toString()
                .padStart(2, "0")}`;

              return (
                <div
                  key={i}
                  data-day={curDate}
                  onClick={addEvent}
                  style={{ width: 100 / 7 + "%" }}
                  className={`relative month-day p-2 border text-center transition duration-200 cursor-pointer hover:bg-[${getSeasonColor(
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
            }

            ${highlightedDay === curDate ? `bg-[${getSeasonColor(monthToRender)}] text-black` : ""}

            
            
            `}
                >
                  {!plannerEntriesOnlyDates.includes(curDate) ? (
                    i + 1
                  ) : (
                    <>
                      {i + 1}
                      <span className="absolute top-0 right-0 w-0 h-0 border-l-[15px] border-l-transparent border-t-[15px] border-t-white"></span>
                    </>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* month table */}
      <PlannerMonthTable
        monthIndex={index}
        monthToRender={monthToRender}
        yearToRender={yearToRender}
        howManyMonths={howManyMonths}
      />
    </div>
  );
}

export default PlannerMonth;
