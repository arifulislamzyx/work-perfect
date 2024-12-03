"use server";
import { auth } from "@clerk/nextjs/server";
import {
  createWorkflowSchema,
  createWorkflowSchemaType,
} from "../../../Schema/Workflow";
import prisma from "@/lib/prisma";
import { redirect } from "next/navigation";
import { WorkflowStatus } from "@/type/workflow";
import { AppNode } from "@/type/appNode";
import { Edge } from "@xyflow/react";
import { CreateFlowNode } from "@/lib/workflow/createFlowNodes";
import { TaskType } from "@/type/task";

export const CreateWorflow = async (form: createWorkflowSchemaType) => {
  const { success, data } = createWorkflowSchema.safeParse(form);

  if (!success) {
    throw new Error("invalid form data");
  }
  const { userId } = await auth();
  if (!userId) {
    throw new Error("unauthenticated");
  }

  const initialFlow: { nodes: AppNode[]; edges: Edge[] } = {
    nodes: [],
    edges: [],
  };

  //adding flow entry piont
  initialFlow.nodes.push(CreateFlowNode(TaskType.LAUNCH_BROWSER));

  const result = await prisma.workflow.create({
    data: {
      userId,
      status: WorkflowStatus.DRAFT,
      defination: JSON.stringify(initialFlow),
      ...data,
    },
  });

  if (!result) {
    throw new Error("failed to create workflow");
  }

  redirect(`/workflow/editor/${result.id}`);
};
