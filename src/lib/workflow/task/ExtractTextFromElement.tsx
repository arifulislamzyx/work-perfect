import { LucideProps, TextIcon } from "lucide-react";
import { TaskParamsType, TaskType } from "../../../type/task";

export const ExtractTextFromElementTask = {
  type: TaskType.EXTRACT_TEXT_FROM_ELEMENT,
  label: "Extract text from element",
  icon: (props: LucideProps) => {
    return <TextIcon className="stroke-pink-400" {...props} />;
  },
  isEntryPoint: false,
  inputs: [
    {
      name: "Html",
      type: TaskParamsType.STRING,
      required: true,
      variant: "textarea",
    },
    {
      name: "Seletor",
      type: TaskParamsType.STRING,
      required: true,
    },
  ],
  outputs: [
    {
      name: "Extracted Text",
      type: TaskParamsType.STRING,
    },
  ],
};
