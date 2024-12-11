import { WaitFor } from "@/lib/helper/waitFor";
import prisma from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";
import React from "react";
import Editor from "../../_components/Editor";

const Page = async ({ params }: { params: { workflowId: string } }) => {
  const { workflowId } = params;
  const { userId } = await auth();
  if (!userId) {
    return <p>unauthenticated</p>;
  }
  const workflow = await prisma.workflow.findUnique({
    where: {
      id: workflowId,
      userId,
    },
  });

  await WaitFor(5000);

  if (!workflow) {
    return <p>Workflow not found</p>;
  }
  return <Editor workflow={workflow}></Editor>;
};

export default Page;
