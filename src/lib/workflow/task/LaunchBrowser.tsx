import { GlobeIcon, LucideProps } from "lucide-react";
import { TaskParamsType, TaskType } from "../../../type/task";

export const LaunchBrowserTask = {
  type: TaskType.LAUNCH_BROWSER,
  label: "Launch Browser",
  icon: (props: LucideProps) => {
    return <GlobeIcon className="stroke-pink-400" {...props} />;
  },
  isEntryPoint: true,
  inputs: [
    {
      name: "Website Url",
      type: TaskParamsType.STRING,
      helperText: "eg: https://google.com",
      required: true,
      hideHandle: true,
    },
  ],
  outputs: [
    {
      name: "Web Page",
      type: TaskParamsType.BROWSER_INSTANCE,
    },
  ],
};
