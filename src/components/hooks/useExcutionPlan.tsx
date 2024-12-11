import { FlowExecutionPlan } from "@/lib/workflow/executionPlan";
import { AppNode } from "@/type/appNode";
import { useReactFlow } from "@xyflow/react";
import { useCallback } from "react";

const UseExecutionPlan = () => {
  const { toObject } = useReactFlow();

  const genarateExecutionPlan = useCallback(() => {
    const { nodes, edges } = toObject();

    if (!nodes || !edges) {
      throw new Error("Nodes or edges are undefined");
    }
    const { executionPlan } = FlowExecutionPlan(nodes as AppNode[], edges);
    return executionPlan;
  }, [toObject]);

  return genarateExecutionPlan;
};

export default UseExecutionPlan;
