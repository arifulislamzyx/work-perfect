import React from "react";
import { Button } from "../ui/button";
import { PlayIcon } from "lucide-react";
import UseExecutionPlan from "../hooks/useExcutionPlan";

const ExecuteBtn = ({ workflowId }: { workflowId: string }) => {
  const generate = UseExecutionPlan();
  return (
    <Button
      variant={"outline"}
      className="flex items-center gap-2"
      onClick={() => {
        const plan = generate();
        console.log("---plan---");
        console.table(plan);
      }}
    >
      <PlayIcon size={16} className="stroke-orange-400" />
      Execute {workflowId}
    </Button>
  );
};

export default ExecuteBtn;
