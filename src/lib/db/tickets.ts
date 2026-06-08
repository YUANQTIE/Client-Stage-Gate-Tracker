import { prisma } from "@/lib/prisma";

export async function getTicketsByWorkflow(workflowId: string) {
  return prisma.ticket.findMany({ where: { workflowId } });
}
