"use server";

import { prisma } from "@/lib/prisma";
import { Prisma } from "@/lib/generated/prisma"; 

export async function userSelect() {
  // Query auth.users (likely just called 'users')
  const users = await prisma.users.findMany();
  
  return users;
}