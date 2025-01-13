import {
  WorkflowExecutionPlanPhase,
  WorkflowExecutionPlan,
} from "./../../type/workflow";
import { AppNode, AppNodeMissingInputs } from "@/type/appNode";
import { Edge } from "@xyflow/react";
import { TaskRegistry } from "./task/registry";

export enum FlowExecutionValidationError {
  NO_ENTRY_POINT = "NO_ENTRY_POINT",
  INVALID_INPUTS = "INVALID_INPUTS",
}

type FlowToExecutionPlanType = {
  executionPlan?: WorkflowExecutionPlan;
  error?: {
    type: FlowExecutionValidationError;
    invalidElements?: AppNodeMissingInputs[];
  };
};

export function FlowExecutionPlan(
  nodes: AppNode[],
  edges: Edge[]
): FlowToExecutionPlanType {
  const entrypoint = nodes.find((node: AppNode) => {
    return Boolean(TaskRegistry[node.data.type]?.isEntryPoint);
  });

  if (!entrypoint) {
    console.error("No entry point found. Task Registry state:", TaskRegistry);
    return {
      error: {
        type: FlowExecutionValidationError.NO_ENTRY_POINT,
      },
    };
  }

  const inputsWithError: AppNodeMissingInputs[] = [];
  const planned = new Set<string>();

  const invalidInputs = getInvalidInputs(entrypoint, edges, planned);
  if (invalidInputs.length > 0) {
    inputsWithError.push({
      nodeId: entrypoint.id,
      inputs: invalidInputs,
    });
  }

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
      if (planned.has(currentNode.id)) continue;

      const invalidInputs = getInvalidInputs(currentNode, edges, planned);
      if (invalidInputs.length > 0) {
        const incomers = getIncomers(currentNode, nodes, edges);

        if (incomers.every((incomer) => planned.has(incomer.id))) {
          inputsWithError.push({
            nodeId: currentNode.id,
            inputs: invalidInputs,
          });
        }
        continue;
      }
      nextPhase.nodes.push(currentNode);
    }

    for (const node of nextPhase.nodes) {
      planned.add(node.id);
    }

    if (nextPhase.nodes.length > 0) {
      executionPlan.push(nextPhase);
    }
  }

  if (inputsWithError.length > 0) {
    return {
      error: {
        type: FlowExecutionValidationError.INVALID_INPUTS,
        invalidElements: inputsWithError,
      },
    };
  }

  return { executionPlan };
}

function getInvalidInputs(
  node: AppNode,
  edges: Edge[],
  planned: Set<string>
): string[] {
  if (!TaskRegistry[node.data.type]) {
    console.error(`Task type ${node.data.type} not found in registry`);
    return [];
  }

  const invalidInputs: string[] = [];
  const inputs = TaskRegistry[node.data.type].inputs || [];

  for (const input of inputs) {
    const inputValue = node.data.inputs?.[input.name];

    if (inputValue?.length > 0) continue;

    const incomingEdges = edges.filter((edge) => edge.target === node.id);
    const inputLinkedToOutput = incomingEdges.find(
      (edge) => edge.targetHandle === input.name
    );

    if (input.required) {
      if (!inputLinkedToOutput || !planned.has(inputLinkedToOutput.source)) {
        invalidInputs.push(input.name);
      }
    } else if (
      inputLinkedToOutput &&
      !planned.has(inputLinkedToOutput.source)
    ) {
      invalidInputs.push(input.name);
    }
  }

  return invalidInputs;
}

function getIncomers(node: AppNode, nodes: AppNode[], edges: Edge[]) {
  if (!node.id) return [];

  const incomersIds = new Set();

  edges.forEach((edge) => {
    if (edge.target === node.id) {
      incomersIds.add(edge.source);
    }
  });
  return nodes.filter((n) => incomersIds.has(n.id));
}
