import { GetWorkFlowsForUser } from "@/actions/workflows/getWorkFlowsForUser";
import { WaitFor } from "@/lib/helper/waitFor";
import React from "react";
import { Alert, AlertDescription, AlertTitle } from "../alert";
import { AlertCircle, InboxIcon } from "lucide-react";
import CreateWorkFlowDialog from "../../../../app/(dashboard)/workflows/_components/CreateWorkFlowDialog";
import WorkflowCard from "../../../../app/(dashboard)/workflows/_components/WorkflowCard";

const UserWorkflows = async () => {
  const workflows = await GetWorkFlowsForUser();
  if (!workflows) {
    return (
      <Alert variant={"destructive"}>
        <AlertCircle className="w-4 h-4" />
        <AlertTitle>Error</AlertTitle>
        <AlertDescription>
          Something wents wrong please try again later
        </AlertDescription>
      </Alert>
    );
  }

  if (workflows.length === 0) {
    return (
      <div className="flex flex-col gap-4 h-full items-center justify-center">
        <div className="rounded-full bg-accent h-20 w-20 flex items-center justify-center ">
          <InboxIcon size={40} className="stroke-primary" />
        </div>

        <div className="flex flex-col gap-1 text-center">
          <p className="font-bold">No Workflow Created Yet</p>
          <p className="text-sm text-muted-foreground ">
            Check the Button Below to create your First Workflow
          </p>
        </div>
        <CreateWorkFlowDialog triggerText="Create your first Workflow" />
      </div>
    );
  }
  return (
    <div className="gird grid-cols-1 gap-4">
      {workflows.map((workflow) => (
        <WorkflowCard key={workflow.id} workflow={workflow}></WorkflowCard>
      ))}
    </div>
  );
};

export default UserWorkflows;
