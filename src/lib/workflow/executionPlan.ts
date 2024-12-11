import {
  WorkflowExecutionPlanPhase,
  WorkflowExecutionPlan,
} from "./../../type/workflow";
import { AppNode, AppNodeMissingInputs } from "@/type/appNode";
import { Edge, getIncomers } from "@xyflow/react";
import { TaskRegistry } from "./task/registry";
import GetInvalidInputs from "./getInvalidInputs";

export enum FlowExecutionValidationError {
  "NO_ENTRY_POINT",
  "INVALID_INPUTS",
}
type FlowToExecutionPlanType = {
  executionPlan: WorkflowExecutionPlan;
  error?: {
    type: FlowExecutionValidationError;
    invalidElemts?: AppNodeMissingInputs;
  };
};

export function FlowExecutionPlan(
  nodes: AppNode[],
  edges: Edge[]
): FlowToExecutionPlanType {
  console.log("nodes for execution", nodes);

  const entrypoint = nodes.find(
    (node: AppNode) => TaskRegistry[node.data.type]?.isEntryPoint
  );

  if (!entrypoint) {
    throw new Error("TODO: Handle This Error");
  }

  const planned = new Set<string>();
  const executionPlan: WorkflowExecutionPlan = [
    {
      phase: 1,
      nodes: [entrypoint],
    },
  ];

  planned.add(entrypoint.id);
  for (
    let phase = 2;
    phase <= nodes.length && planned.size < nodes.length;
    phase++
  ) {
    const nextPhase: WorkflowExecutionPlanPhase = {
      phase,
      nodes: [],
    };
    for (const currentNode of nodes) {
      if (planned.has(currentNode.id)) {
        //node already put in the execution plan
        continue;
      }

      const invalidInputs = GetInvalidInputs(currentNode, edges, planned);
      if (invalidInputs.length > 0) {
        const incomers = getIncomers(currentNode, nodes, edges);

        if (incomers.every((incomer) => planned.has(incomer.id))) {
          //if all incoming incomers/edges are planned and there are still invalid inputs
          //this means that this particular node has an invalid inputs
          //which means that the workflow is invalid
          console.error("Invalid Inputs", currentNode.id, invalidInputs);
          throw new Error("TODO: Handle Error 1");
        } else {
          //let's skip this node for now
          continue;
        }
      }
      nextPhase.nodes.push(currentNode);
    }
    for (const node of nextPhase.nodes) {
      planned.add(node.id);
    }
    executionPlan.push(nextPhase);
  }

  return { executionPlan };
}
