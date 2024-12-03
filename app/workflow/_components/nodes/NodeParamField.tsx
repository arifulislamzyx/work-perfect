import { Input } from "@/components/ui/input";
import { TaskParams, TaskParamsType } from "@/type/task";
import React, { useCallback } from "react";
import StringParam from "./param/StringParam";
import { useReactFlow } from "@xyflow/react";
import { AppNode } from "@/type/appNode";
import BrowserInstanceParam from "./param/BrowserInstanceParam";

const NodeParamField = ({
  param,
  nodeId,
}: {
  param: TaskParams;
  nodeId: string;
}) => {
  const { updateNodeData, getNode } = useReactFlow();
  const node = getNode(nodeId) as AppNode;
  const value = node?.data.inputs?.[param.name];

  const updateNodeParamValue = useCallback(
    (newValue: string) => {
      updateNodeData(nodeId, {
        inputs: {
          ...node?.data.inputs,
          [param.name]: newValue,
        },
      });
    },
    [updateNodeData, node?.data.inputs, param.name]
  );
  switch (param.type) {
    case TaskParamsType.STRING:
      return (
        <StringParam
          param={param}
          value={value}
          updateNodeParamValue={updateNodeParamValue}
        />
      );

    case TaskParamsType.BROWSER_INSTANCE:
      return (
        <BrowserInstanceParam
          param={param}
          value={" "}
          updateNodeParamValue={updateNodeParamValue}
        />
      );
    default:
      return (
        <div className="w-full">
          <p className="text-xs text-muted-foreground">Not Implimented</p>
        </div>
      );
  }
};

export default NodeParamField;