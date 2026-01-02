import { useContext } from "react";
import { context } from "../context/MyContext";
import PlannerBalanceForm from "./PlannerBalanceForm";
import PlannerEventForm from "./PlannerEventForm";

function PlannerForms() {
  const { plannerForm } = useContext(context);

  return (
    <div className="container mx-auto py-4 px-6 flex items-start gap-8 p-4">
      {/* Current Balance Form */}
      <PlannerBalanceForm />

      {/* Add Event Form */}
      {plannerForm && <PlannerEventForm />}
    </div>
  );
}

export default PlannerForms;
