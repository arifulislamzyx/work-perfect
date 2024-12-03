import { CodeIcon, GlobeIcon, LucideProps } from "lucide-react";
import { TaskParamsType, TaskType } from "../../../type/task";

export const PageToHtmlTask = {
  type: TaskType.PAGE_TO_HTML,
  label: "Get HTML from page",
  icon: (props: LucideProps) => {
    return <CodeIcon className="stroke-pink-400" {...props} />;
  },
  isEntryPoint: false,
  inputs: [
    {
      name: "Website Url",
      type: TaskParamsType.BROWSER_INSTANCE,
      helperText: "eg: https://google.com",
      required: true,
    },
  ],
  outputs: [
    {
      name: "Html",
      type: TaskParamsType.STRING,
    },
    {
      name: "Web Page",
      type: TaskParamsType.BROWSER_INSTANCE,
    },
  ],
};
