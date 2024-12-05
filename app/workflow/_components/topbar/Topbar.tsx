"use client";
import Savebtn from "@/components/buttons/Savebtn";
import TooltipWrapper from "@/components/TooltipWrapper";
import { Button } from "@/components/ui/button";
import { ChevronLeftIcon, Workflow } from "lucide-react";
import { useRouter } from "next/navigation";
import React from "react";

interface Props {
  title: string;
  subTitle?: string;
  workflowId: string;
}

const Topbar = ({ title, subTitle, workflowId }: Props) => {
  const router = useRouter();
  return (
    <header className="w-full h-[60px] flex justify-between p-2 border-b-2 border-separate sticky top-0 bg-background z-10">
      <div className="flex flex-1 gap-1">
        <TooltipWrapper content="Back">
          <Button variant={"ghost"} size={"icon"} onClick={() => router.back()}>
            <ChevronLeftIcon size={20} />
          </Button>
        </TooltipWrapper>
        <div>
          <p className="font-bold text-ellipsis truncate">{title}</p>
          {subTitle && (
            <p className="text-xs text-muted-foreground truncate text-ellipsis">
              {subTitle}
            </p>
          )}
        </div>
      </div>

      <div className="flex gap-1 flex-1 justify-end">
        <Savebtn workflowId={workflowId} />
      </div>
    </header>
  );
};

export default Topbar;
