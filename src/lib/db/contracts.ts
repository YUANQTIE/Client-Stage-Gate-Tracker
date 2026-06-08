import { prisma } from "@/lib/prisma";

export async function getContractsByProject(projectId: string) {
  return prisma.contract.findMany({ where: { projectId } });
}
