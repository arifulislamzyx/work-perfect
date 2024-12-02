import { Input } from "@/components/ui/input";
import { TaskParams, TaskParamsType } from "@/type/task";
import React from "react";
import StringParam from "./param/StringParam";

const NodeParamField = ({ param }: { param: TaskParams }) => {
  switch (param.type) {
    case TaskParamsType.STRING:
      return <StringParam param={param} />;
    default:
      return (
        <div className="w-full">
          <p className="text-xs text-muted-foreground">Not Implimented</p>
        </div>
      );
  }
};

export default NodeParamField;
