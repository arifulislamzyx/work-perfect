import DeleteWorkflow from "@/actions/workflows/deleteWorkflow";
import { AlertDescription } from "@/components/ui/alert";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Input } from "@/components/ui/input";
import { useMutation } from "@tanstack/react-query";
import React, { useState } from "react";
import { toast } from "sonner";

interface Props {
  open: boolean;
  setOpen: (open: boolean) => void;
  workflowName: string;
  workflowId: string;
}

const DeleteDialogWorkflow = ({
  open,
  setOpen,
  workflowName,
  workflowId,
}: Props) => {
  const [confirmText, setConfirmText] = useState<string | null>("");
  const deleteMutaion = useMutation({
    mutationFn: DeleteWorkflow,
    onSuccess: () => {
      toast.success("Workflow Deleted Successfully", { id: workflowId });
      setConfirmText("");
    },
    onError: () => {
      toast.error("something went wrong", { id: workflowId });
    },
  });
  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            Are you Sure you want to Delete this Workflow?
          </AlertDialogTitle>
          <AlertDescription>
            If you Delete this description you will not be able to recver this.
            <div className="flex flex-col py-4 gap-2">
              <p>
                If you are sure enter <b>{workflowName}</b> to confirm:
              </p>
              <Input
                value={confirmText as string}
                onChange={(e) => setConfirmText(e.target.value)}
              />
            </div>
          </AlertDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel onClick={() => setConfirmText("")}>
            Cancel
          </AlertDialogCancel>
          <AlertDialogAction
            disabled={confirmText !== workflowName || deleteMutaion.isPending}
            className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            onClick={(e) => {
              e.stopPropagation();
              toast.loading("Deleting Workflow...", { id: workflowId });
              deleteMutaion.mutate(workflowId);
            }}
          >
            Delete
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default DeleteDialogWorkflow;
