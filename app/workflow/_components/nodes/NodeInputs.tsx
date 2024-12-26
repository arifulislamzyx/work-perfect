import { cn } from "@/lib/utils";
import { TaskParams } from "@/type/task";
import { Handle, Position, useEdges } from "@xyflow/react";
import React, { ReactNode } from "react";
import NodeParamField from "./NodeParamField";
import { ColorForHandle } from "./Common";
import UseFlowValidation from "@/components/hooks/useFlowValidation";

export const NodeInputs = ({ children }: { children: ReactNode }) => {
  return <div className="flex flex-col divide-y gap-2">{children}</div>;
};

export const NodeInput = ({
  input,
  nodeId,
}: {
  input: TaskParams;
  nodeId: string;
}) => {
  const { invalidInputs } = UseFlowValidation();
  const edge = useEdges();
  const isConnected = edge.some(
    (edg) => edg.target === nodeId && edg.targetHandle === input.name
  );

  const hasError = invalidInputs
    .find((node) => node.nodeId === nodeId)
    ?.inputs.find((invalidInput) => invalidInput === input.name);
  return (
    <div
      className={cn(
        "flex justify-start relative p-3 bg-secondary w-full",
        hasError && "bg-destructive"
      )}
    >
      <NodeParamField param={input} nodeId={nodeId} disabled={isConnected} />
      {!input.hideHandle && (
        <Handle
          id={input.name}
          type="target"
          position={Position.Left}
          isConnectable={!isConnected}
          className={cn(
            "!bg-muted-foreground !border-2 !border-background !-left-2 !w-4 !h-4",
            ColorForHandle[input.type]
          )}
        />
      )}
    </div>
  );
};
