"use server";
import {prisma} from "@/lib/prisma";

/**
 * Retrieves all tag records from the database.
 * Typically used for cross-ticket categorization management or initializing global filtering options.
 *
 * @returns {Promise<any[]>}
 * Returns a promise that resolves to an array of all available tag objects.
 */
export async function selectTag() {
    return prisma.tags.findMany();
}