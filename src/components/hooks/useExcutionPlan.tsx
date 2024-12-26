import {
  FlowExecutionPlan,
  FlowExecutionValidationError,
} from "@/lib/workflow/executionPlan";
import { AppNode } from "@/type/appNode";
import { useReactFlow } from "@xyflow/react";
import { useCallback } from "react";
import UseFlowValidation from "./useFlowValidation";
import { toast } from "sonner";

const UseExecutionPlan = () => {
  const { toObject } = useReactFlow();
  const { setInvalidInputs, clearErrors } = UseFlowValidation();

  const handleError = useCallback(
    (error: any) => {
      if (!error) return;

      switch (error.type) {
        case FlowExecutionValidationError.NO_ENTRY_POINT:
          toast.error("No entry point found in the workflow");
          clearErrors();
          break;
        case FlowExecutionValidationError.INVALID_INPUTS:
          toast.error("Some required inputs are missing or invalid");
          if (error.invalidElements) {
            setInvalidInputs(error.invalidElements);
          }
          break;
        default:
          toast.error(
            "An unexpected error occurred while validating the workflow"
          );
          clearErrors();
      }
    },
    [setInvalidInputs, clearErrors]
  );

  const generateExecutionPlan = useCallback(() => {
    try {
      const { nodes, edges } = toObject();

      if (!nodes?.length || !edges?.length) {
        toast.error("Workflow must contain at least one node and connection");
        return null;
      }

      const result = FlowExecutionPlan(nodes as AppNode[], edges);

      if (result.error) {
        handleError(result.error);
        return null;
      }

      clearErrors();
      return result.executionPlan;
    } catch (error) {
      toast.error("Failed to generate execution plan");
      return null;
    }
  }, [toObject, handleError, clearErrors]);

  return generateExecutionPlan;
};

export default UseExecutionPlan;
