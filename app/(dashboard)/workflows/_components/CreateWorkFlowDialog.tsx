"use client";
import React, { useCallback, useState } from "react";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Layers2Icon, Loader2 } from "lucide-react";
import CustomDialogHeader from "@/components/CustomDialogHeader";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  createWorkflowSchema,
  createWorkflowSchemaType,
} from "../../../../Schema/Workflow";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useMutation } from "@tanstack/react-query";
import { CreateWorflow } from "@/actions/workflows/createWorkflow";
import { toast } from "sonner";

const CreateWorkFlowDialog = ({ triggerText }: { triggerText?: string }) => {
  const [open, setOpen] = useState(false);
  const form = useForm<createWorkflowSchemaType>({
    resolver: zodResolver(createWorkflowSchema),
    defaultValues: {},
  });

  const { mutate, isPending } = useMutation({
    mutationFn: CreateWorflow,
    onSuccess: () => {
      toast.success("Workflow Created", { id: "create-workflow" });
    },
    onError: () => {
      toast.error("Failed to create Workflow ", { id: "create-workflow" });
    },
  });

  const onSubmit = useCallback(
    (values: createWorkflowSchemaType) => {
      toast.loading("Creating Workflow", { id: "create-workflow" });
      mutate(values);
    },
    [mutate]
  );

  return (
    <Dialog
      open={open}
      onOpenChange={(open) => {
        form.reset();
        setOpen(open);
      }}
    >
      <DialogTrigger>
        <Button>{triggerText ?? "Create Workflow"}</Button>
      </DialogTrigger>
      <DialogContent className="px-0">
        <CustomDialogHeader
          icon={Layers2Icon}
          title="Create Workflow"
          subTitle="Start Building your workflow"
        />
        <div className="p-6">
          <Form {...form}>
            <form
              className="space-y-8 w-full"
              onSubmit={form.handleSubmit(onSubmit)}
            >
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="flex gap-1 items-center">
                      Name
                      <p className="text-xs text-primary">(required)</p>
                    </FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormDescription>
                      Choose a Description and Unique Name
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="flex gap-1 items-center">
                      Description
                      <p className="text-xs text-muted-foreground">
                        (required)
                      </p>
                    </FormLabel>
                    <FormControl>
                      <Textarea className="resize-none" {...field} />
                    </FormControl>
                    <FormDescription>
                      Provide a Brief description of what your overflow done.
                      <br /> THis is option but help you remember the
                      workflow&apos;s purpose
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button type="submit" className="w-full" disabled={isPending}>
                {!isPending && "Proceed"}
                {isPending && <Loader2 className="animate-spin" />}
              </Button>
            </form>
          </Form>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default CreateWorkFlowDialog;
