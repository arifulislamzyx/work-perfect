"use server";
import prisma from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";
import React from "react";

export const DeleteWorkflow = async (id: string) => {
  const { userId } = await auth();

  if (!userId) {
    throw new Error("unauthenticated");
  }

  await prisma.workflow.delete({
    where: {
      id,
      userId,
    },
  });
  revalidatePath("/workflows");
};

export default DeleteWorkflow;
