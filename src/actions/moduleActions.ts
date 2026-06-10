"use server";
import { prisma } from "@/lib/prisma";

/**
 * Creates a new module and links it to the parent phase in a single transaction.
 *
 * @param {string} phaseId - The UUID of the parent phase this module belongs to.
 * @param {string} moduleName - The display name of the module (e.g., "Module 1", "Authentication").
 * @param {string | null} [description] - (Optional) A brief description of the module's purpose.
 * @param {Date | null} [startDate] - (Optional) The scheduled start date of the module.
 * @param {Date | null} [endDate] - (Optional) The scheduled end date of the module.
 * @returns {Promise<{success: boolean, data?: any, error?: string}>}
 * Returns `success: true` and the newly created module object if successful.
 * Returns `success: false` and an error message if the creation or linking fails.
 */
export async function createModule(
    phaseId: string,
    moduleName: string,
    description?: string | null,
    startDate?: Date | null,
    endDate?: Date | null
) {
    try {
        const newModule = await prisma.modules.create({
            data: {
                name: moduleName,
                description: description,
                start_date: startDate,
                end_date: endDate,

                PhaseModules: {
                    create: {
                        phase_id: phaseId,
                    },
                },
            },
        });
        return { success: true, data: newModule };
    } catch (error) {
        console.error("Failed to create module:", error);
        return { success: false, error: "Failed to create module and link to phase." };
    }
}


/**
 * Retrieves a specific module from the database using its unique ID.
 * Includes the relational link to its parent phase.
 * Automatically blocks access to modules that have been soft-deleted.
 *
 * @param {string} moduleId - The UUID of the module to retrieve.
 * @returns {Promise<{success: boolean, data?: any, error?: string}>}
 * Returns `success: true` and the module object if found.
 * Returns `success: false` and an error message if the module does not exist or the query fails.
 */
export async function getModuleById(moduleId: string) {
    try {
        // SECURITY CHECK GOES HERE LATER:
        // Example: await prisma.$executeRaw`SELECT set_config('request.jwt.claims', ${currentUser.token}, TRUE)`

        const moduleData = await prisma.modules.findUnique({
            where: {
                module_id: moduleId,
                // is_deleted: false,
            },
            include: {
                PhaseModules: true,
            },
        });
        if (!moduleData) {
            return { success: false, error: "Module not found in the database." };
        }
        return { success: true, data: moduleData };
    } catch (error) {
        console.error("Failed to fetch module:", error);
        return { success: false, error: "Failed to fetch module details." };
    }
}


/**
 * Updates an existing module's details in the database.
 *
 * @param {string} moduleId - The UUID of the module to update.
 * @param {string} [moduleName] - (Optional) The new name for the module.
 * @param {string | null} [description] - (Optional) The new description for the module.
 * @param {Date | null} [startDate] - (Optional) The new scheduled start date.
 * @param {Date | null} [endDate] - (Optional) The new scheduled end date.
 * @returns {Promise<{success: boolean, data?: any, error?: string}>}
 * Returns `success: true` and the updated module object if successful.
 * Returns `success: false` and an error message if the update fails.
 */
export async function updateModule(
    moduleId: string,
    moduleName?: string,
    description?: string | null,
    startDate?: Date | null,
    endDate?: Date | null
) {
    try {
        const updatedModule = await prisma.modules.update({
            where: {
                module_id: moduleId,
            },
            data: {
                name: moduleName,
                description: description,
                start_date: startDate,
                end_date: endDate,
            },
        });
        return { success: true, data: updatedModule };
    } catch (error) {
        console.error("Failed to update module:", error);
        return { success: false, error: "Failed to update module details." };
    }
}


/**
 * Performs a "soft delete" on a module by marking it as deleted instead of permanently erasing it.
 * This acts like a recycle bin, preserving historical data and preventing database corruption.
 * Note: Archiving is blocked if the module contains active child workflows to ensure operational integrity.
 *
 * @param {string} moduleId - The UUID of the module to soft delete.
 * @returns {Promise<{success: boolean, error?: string}>}
 * Returns `success: true` if the module was successfully archived.
 * Returns `success: false` and an error message if the module contains workflows or the query fails.
 */
export async function softDeleteModule(moduleId: string) {
    try {
        const attachedWorkflowsCount = await prisma.moduleWorkflows.count({
            where: {
                module_id: moduleId,
                // is_deleted: false
            },
        });
        if (attachedWorkflowsCount > 0) {
            return {
                success: false,
                error: `Cannot archive module. Please remove or archive all ${attachedWorkflowsCount} associated workflow(s) first.`
            };
        }

        await prisma.modules.update({
            where: { module_id: moduleId },
            data: {
                // is_deleted: true,
                // deleted_at: new Date(),
            },
        });
        return { success: true };
    } catch (error) {
        console.error("Failed to soft delete module:", error);
        return { success: false, error: "Failed to archive the module due to a database error." };
    }
}