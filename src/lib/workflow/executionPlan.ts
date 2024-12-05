import { AppNode } from "@/type/appNode";
import { WorkflowExecutionPlan } from "@/type/workflow";
import { Edge } from "@xyflow/react";
import { TaskRegistry } from "./task/registry";

type FlowToExecutionPlanType = {
  executionPlan: WorkflowExecutionPlan;
};

export const FlowExecutionPlan = ({
  nodes,
  edges,
}: {
  nodes: AppNode[];
  edges: Edge[];
}): FlowToExecutionPlanType => {
  const entrypoint = nodes.find(
    (node) => TaskRegistry[node.data.type].isEntryPoint
  );

  if (!entrypoint) {
    throw new Error("TODO: Handle This Error");
  }

  const executionPlan: WorkflowExecutionPlan = [
    {
      phase: 1,
      nodes: [entrypoint],
    },
  ];

  return { executionPlan };
};
