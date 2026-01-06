import BudgeterSummary from "./BudgeterSummary";
import BudgeterForm from "./BudgeterForm";
import BudgeterTable from "./BudgeterTable";

function Budgeter() {
  return (
    <div className="px-4 pb-[100px]">
      <BudgeterSummary />

      <div className="max-w-5xl mx-auto flex gap-5 md:flex-row flex-col">
        <BudgeterForm />
        <BudgeterTable />
      </div>
    </div>
  );
}

export default Budgeter;
