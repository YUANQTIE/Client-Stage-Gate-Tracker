"use server";

import { prisma } from "@/lib/prisma";
import { Prisma } from "@/lib/generated/prisma"; 

export async function userSelect() {
  const users = await prisma.users.findMany();
  return users;
}