"use client";
import React, { useState } from "react";
import {
  DropdownMenu,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Button } from "../ui/button";
import { MoreVerticalIcon, TrashIcon } from "lucide-react";
import TooltipWrapper from "../TooltipWrapper";
import { DropdownMenuContent } from "@radix-ui/react-dropdown-menu";
import DeleteDialogWorkflow from "../../../app/(dashboard)/workflows/_components/DeleteDialogWorkflow";

const WorkflowActions = ({
  workflowName,
  workflowId,
}: {
  workflowId: string;
  workflowName: string;
}) => {
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  return (
    <>
      <DeleteDialogWorkflow
        open={showDeleteDialog}
        setOpen={setShowDeleteDialog}
        workflowName={workflowName}
        workflowId={workflowId}
      />
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant={"outline"} size={"sm"}>
            <TooltipWrapper content={"More Actions"}>
              <div className="flex items-center justify-center w-full h-full">
                <MoreVerticalIcon size={18} />
              </div>
            </TooltipWrapper>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>Actions</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            onSelect={() => setShowDeleteDialog((prev) => !prev)}
            className="text-destructive flex items-center gap-2"
          >
            <TrashIcon size={16} />
            Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};

export default WorkflowActions;
