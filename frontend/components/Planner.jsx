import PlannerMonths from "./PlannerMonths";
import PlannerForms from "./PlannerForms";

function Planner() {
  return (
    <>
      <h1 className="text-center text-white text-3xl font-bold mt-7 mb-4">Plan Your Budget</h1>
      <PlannerMonths howManyMonths={4} />
      <PlannerForms />
    </>
  );
}

export default Planner;
