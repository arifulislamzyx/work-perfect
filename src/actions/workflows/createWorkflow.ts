"use server";
import { auth } from "@clerk/nextjs/server";
import {
  createWorkflowSchema,
  createWorkflowSchemaType,
} from "../../../Schema/Workflow";
import prisma from "@/lib/prisma";
import { WorkflowStatus } from "../../../type/workflow";
import { redirect } from "next/navigation";

export const CreateWorflow = async (form: createWorkflowSchemaType) => {
  const { success, data } = createWorkflowSchema.safeParse(form);

  if (!success) {
    throw new Error("invalid form data");
  }
  const { userId } = await auth();
  if (!userId) {
    throw new Error("unauthenticated");
  }

  const result = await prisma.workflow.create({
    data: {
      userId,
      status: WorkflowStatus.DRAFT,
      defination: "TODO",
      ...data,
    },
  });

  if (!result) {
    throw new Error("failed to create workflow");
  }

  redirect(`/workflow/editor/${result.id}`);
};
