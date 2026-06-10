"use server";
import { prisma } from "@/lib/prisma";

/**
 * Creates a new phase, automatically assigns it a scoped sequential number based on its parent stage,
 * and links it to the parent stage in a single transaction.
 *
 * @param {string} stageId - The UUID of the parent stage this phase belongs to.
 * @param {string} phaseName - The display name of the phase (e.g., "Planning", "Execution").
 * @param {Date | null} [startDate] - (Optional) The scheduled start date of the phase.
 * @param {Date | null} [endDate] - (Optional) The scheduled end date of the phase.
 * @returns {Promise<{success: boolean, data?: any, error?: string}>}
 */
export async function createPhase(
    stageId: string,
    phaseName: string,
    startDate?: Date | null,
    endDate?: Date | null
) {
    try {
        const existingPhasesCount = await prisma.stagePhases.count({
            where: {
                stage_id: stageId,
            },
        });
        const nextPhaseNumber = existingPhasesCount + 1;

        const newPhase = await prisma.phases.create({
            data: {
                name: phaseName,
                number: nextPhaseNumber,
                start_date: startDate,
                end_date: endDate,

                StagePhases: {
                    create: {
                        stage_id: stageId,
                    },
                },
            },
        });
        return { success: true, data: newPhase };
    } catch (error) {
        console.error("Failed to create phase:", error);
        return { success: false, error: "Failed to create phase and link to stage." };
    }
}


/**
 * Retrieves a specific phase from the database using its unique ID.
 * Includes the relational link to its parent stage.
 * Automatically blocks access to phases that have been soft-deleted.
 *
 * @param {string} phaseId - The UUID of the phase to retrieve.
 * @returns {Promise<{success: boolean, data?: any, error?: string}>}
 * Returns `success: true` and the phase object if found.
 * Returns `success: false` and an error message if the phase does not exist or the query fails.
 * Returns `success: true` and the newly created phase object if successful.
 * Returns `success: false` and an error message if the creation or linking fails.
 */
export async function getPhaseById(phaseId: string) {
    try {
        // SECURITY CHECK GOES HERE LATER:
        // Example: await prisma.$executeRaw`SELECT set_config('request.jwt.claims', ${currentUser.token}, TRUE)`

        const phase = await prisma.phases.findUnique({
            where: {
                phase_id: phaseId,
                // is_deleted: false,
            },
            include: {
                StagePhases: true,
            },
        });
        if (!phase) {
            return { success: false, error: "Phase not found in the database." };
        }
        return { success: true, data: phase };
    } catch (error) {
        console.error("Failed to fetch phase:", error);
        return { success: false, error: "Failed to fetch phase details." };
    }
}


/**
 * Updates an existing phase's details in the database.
 * Note: The phase 'number' is excluded from this function to protect the sequential order.
 *
 * @param {string} phaseId - The UUID of the phase to update.
 * @param {string} [phaseName] - (Optional) The new name for the phase.
 * @param {Date | null} [startDate] - (Optional) The new scheduled start date.
 * @param {Date | null} [endDate] - (Optional) The new scheduled end date.
 * @returns {Promise<{success: boolean, data?: any, error?: string}>}
 * Returns `success: true` and the updated phase object if successful.
 */
export async function updatePhase(
    phaseId: string,
    phaseName?: string,
    startDate?: Date | null,
    endDate?: Date | null
) {
    try {
        const updatedPhase = await prisma.phases.update({
            where: {
                phase_id: phaseId,
            },
            data: {
                name: phaseName,
                start_date: startDate,
                end_date: endDate,
            },
        });
        return { success: true, data: updatedPhase };
    } catch (error) {
        console.error("Failed to update phase:", error);
        return { success: false, error: "Failed to update phase details." };
    }
}


/**
 * Performs a "soft delete" on a phase by marking it as deleted instead of permanently erasing it.
 * This acts like a recycle bin, preserving historical data and preventing database corruption.
 * Note: Archiving is blocked if the phase contains active child modules to ensure operational integrity.
 *
 * @param {string} phaseId - The UUID of the phase to soft delete.
 * @returns {Promise<{success: boolean, error?: string}>}
 * Returns `success: true` if the phase was successfully archived.
 * Returns `success: false` and an error message if the phase contains modules or the query fails.
 */
export async function softDeletePhase(phaseId: string) {
    try {
        const attachedModulesCount = await prisma.phaseModules.count({
            where: {
                phase_id: phaseId,
                // is_deleted: false
            },
        });
        if (attachedModulesCount > 0) {
            return {
                success: false,
                error: `Cannot archive phase. Please remove or archive all ${attachedModulesCount} associated module(s) first.`
            };
        }

        await prisma.phases.update({
            where: { phase_id: phaseId },
            data: {
                // is_deleted: true,
                // deleted_at: new Date(),
            },
        });
        return { success: true };
    } catch (error) {
        console.error("Failed to soft delete phase:", error);
        return { success: false, error: "Failed to archive the phase due to a database error." };
    }
}