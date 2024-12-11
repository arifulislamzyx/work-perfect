import { AppNode } from "@/type/appNode";
import { Edge } from "@xyflow/react";
import { TaskRegistry } from "./task/registry";

const GetInvalidInputs = (
  node: AppNode,
  edges: Edge[],
  planned: Set<string>
) => {
  const invalidInputs = [];

  const inputs = TaskRegistry[node.data.type].inputs;
  for (const input of inputs) {
    const inputValue = node.data.inputs[input.name];

    const inputValueProvided = inputValue?.length > 0;
    if (inputValueProvided) {
      //this input is fine so we can move on
      continue;
    }

    //if the value is not provided by the user than we need to check
    //if there is an input connect to the current input

    const inComingEdges = edges.filter((edge) => edge.target === node.id);

    const inputLinkedToOutput = inComingEdges.find(
      (edge) => edge.targetHandle === input.name
    );

    const requiredInputProvidedByVisitedOutput =
      input.required &&
      inputLinkedToOutput &&
      planned.has(inputLinkedToOutput.source);

    if (requiredInputProvidedByVisitedOutput) {
      //the inputs is required and we have a value for it
      //probided by a task that is already planned
      continue;
    } else if (!input.required) {
      //if the input is not required but there is an output linked to it
      //than we need to be sure that the output is already planned
      if (!inputLinkedToOutput) continue;

      if (inputLinkedToOutput && planned.has(inputLinkedToOutput.source)) {
        //the output is providing a value to the input: the input is fine
        continue;
      }
    }
    invalidInputs.push(input.name);
  }
  return invalidInputs;
};

export default GetInvalidInputs;
