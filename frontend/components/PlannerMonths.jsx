import PlannerMonth from "./PlannerMonth";

function PlannerMonths({ howManyMonths }) {
  const currentMonthYear = `${(new Date().getMonth() + 1).toString().padStart(2, "0")}-${new Date().getFullYear()}`;

  // howManyMonths can only be 3 or 4
  if (howManyMonths !== 3 && howManyMonths !== 4) {
    howManyMonths = 4;
  }

  return (
    <div className="mb-14">
      {/* explainer text */}
      <h3 className="text-white text-center mb-3">
        <span className="font-bold opacity-50">How It Works:</span> {` `}
        <span>
          Click a calendar day to <u>add</u> an entry. Click a table row to <u>edit</u>. Double-click a row to{" "}
          <u>delete</u>.
        </span>
      </h3>

      {/* months box */}
      <div
        className={`container mx-auto py-4 px-6 grid grid-cols-${howManyMonths} gap-${howManyMonths === 4 ? 8 : 14}`}
      >
        {/* render months */}
        {new Array(howManyMonths).fill(0).map((x, i) => (
          <PlannerMonth key={i} index={i} startPeriod={currentMonthYear} howManyMonths={howManyMonths} />
        ))}
      </div>
    </div>
  );
}

export default PlannerMonths;
