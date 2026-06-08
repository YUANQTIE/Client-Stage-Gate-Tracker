import { prisma } from "@/lib/prisma";

export async function getPhasesByProject(projectId: string) {
  return prisma.phase.findMany({ where: { projectId } });
}
