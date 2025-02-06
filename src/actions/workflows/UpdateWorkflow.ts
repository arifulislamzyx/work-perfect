"use server";
import prisma from "@/lib/prisma";
import { WorkflowStatus } from "@/type/workflow";
import { auth } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";

export const UpdateWorkflow = async ({
  id,
  defination,
}: {
  id: string;
  defination: string;
}) => {
  const { userId } = await auth();

  if (!userId) {
    throw new Error("unauthenticated");
  }

  const workflow = await prisma.workflow.findUnique({
    where: {
      id,
      userId,
    },
  });

  if (!workflow) {
    throw new Error("workflow not found");
  }

  if (workflow.status !== WorkflowStatus.DRAFT) {
    throw new Error("workflow is not Draft");
  }

  await prisma.workflow.update({
    data: {
      defination,
    },
    where: {
      id,
      userId,
    },
  });
  revalidatePath("/workflows");
};
