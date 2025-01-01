"use server";

import prisma from "@/lib/prisma";
import { FlowExecutionPlan } from "@/lib/workflow/executionPlan";
import { WorkflowExecutionPlan } from "@/type/workflow";
import { auth } from "@clerk/nextjs/server";

export async function RunWorkflow(form: {
  workflowId: string;
  flowDefination?: string;
}) {
  const { userId } = await auth();

  if (!userId) {
    throw new Error("unauthenticated");
  }

  const { workflowId, flowDefination } = form;
  if (!workflowId) {
    throw new Error("workflowId is required");
  }

  const workflow = await prisma.workflow.findUnique({
    where: {
      userId,
      id: workflowId,
    },
  });
  if (!workflow) {
    throw new Error("workflow not found");
  }

  let executionPlan: WorkflowExecutionPlan;

  if (!flowDefination) {
    throw new Error("Flow defination if not Define");
  }

  const flow = JSON.parse(flowDefination);
  const result = FlowExecutionPlan(flow.nodes, flow.edges);

  if (result.error) {
    throw new Error("Flow defination not valid");
  }

  if (!result.executionPlan) {
    throw new Error("no execution plan generated");
  }

  executionPlan = result.executionPlan;

  console.log("Execution Plan", executionPlan);
}
