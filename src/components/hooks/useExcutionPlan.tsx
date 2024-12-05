import { useReactFlow } from "@xyflow/react";
import { useCallback } from "react";

const UseExecutionPlan = () => {
  const { toObject } = useReactFlow();

  const genarateExecutionPlan = useCallback(() => {
    const { nodes, edges } = toObject();
    const result = FlowExecutionPlan(nodes, edges);
  }, [toObject]);

  return genarateExecutionPlan;
};

export default UseExecutionPlan;
