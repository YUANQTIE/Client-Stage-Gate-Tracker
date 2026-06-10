"use server";

import { PrismaClient } from "@/lib/generated/prisma";
import { Users } from "@/lib/generated/prisma";

const prisma = new PrismaClient();

export async function userSelect() {
  const users = await prisma.$queryRaw<Users[]>`
    SELECT * FROM public."Users"
  `;
  return users;
}