import UserWorkflows from "@/components/ui/Skeleton/UserWorkflows";
import UserWorkflowsSkeleton from "@/components/ui/Skeleton/UserWorkflowsSkeleton";
import React, { Suspense } from "react";
import CreateWorkFlowDialog from "./_components/CreateWorkFlowDialog";

const Page = () => {
  return (
    <div className="flex-1 flex flex-col h-full">
      <div className="flex justify-between">
        <div className="flex flex-col">
          <h1 className="text-3xl font-bold">Workflows</h1>
          <p className="text-muted-foreground">Manage Your Workflows</p>
        </div>
        <CreateWorkFlowDialog />
      </div>

      <div className="h-full py-6">
        <Suspense fallback={<UserWorkflowsSkeleton />}>
          <UserWorkflows />
        </Suspense>
      </div>
    </div>
  );
};

export default Page;
