"use server";

import { prisma } from "@/lib/prisma";

/**
 * Retrieves all user records from the database.
 * Commonly used to populate assignment dropdowns, member directories, or user selection panels.
 *
 * @returns {Promise<any[]>}
 * Returns a promise that resolves to an array containing all user objects in the database.
 */
export async function userSelect() {
  return await prisma.users.findMany();
}