"use server";

import { prisma } from "@/lib/prisma";

export async function userSelect() {
  return await prisma.users.findMany();
}