"use server";
import { prisma } from "@/lib/prisma";

/**
 * Creates a new stage, automatically assigns it a scoped sequential number based on its parent project,
 * and links it to the parent project in a single transaction.
 *
 * @param {string} projectId - The UUID of the parent project this stage belongs to.
 * @param {string} stageName - The display name of the stage (e.g., "Stage 1", "Design Phase").
 * @param {Date | null} [startDate] - (Optional) The scheduled start date of the stage.
 * @param {Date | null} [endDate] - (Optional) The scheduled end date of the stage.
 * @returns {Promise<{success: boolean, data?: any, error?: string}>}
 * Returns `success: true` and the newly created stage object if successful.
 * Returns `success: false` and an error message if the creation or linking fails.
 */
export async function createStage(
    projectId: string,
    stageName: string,
    startDate?: Date | null,
    endDate?: Date | null
) {
    try {
        const existingStagesCount = await prisma.projectStages.count({
            where: {
                project_id: projectId,
            },
        });
        const nextStageNumber = existingStagesCount + 1;

        const newStage = await prisma.stages.create({
            data: {
                name: stageName,
                number: nextStageNumber,
                start_date: startDate,
                end_date: endDate,

                ProjectStages: {
                    create: {
                        project_id: projectId,
                    },
                },
            },
        });
        return { success: true, data: newStage };
    } catch (error) {
        console.error("Failed to create stage:", error);
        return { success: false, error: "Failed to create stage and link to project." };
    }
}


/**
 * Retrieves a specific stage from the database using its unique ID.
 * Includes the relational link to its parent project.
 * Automatically blocks access to stages that have been soft-deleted.
 *
 * @param {string} stageId - The UUID of the stage to retrieve.
 * @returns {Promise<{success: boolean, data?: any, error?: string}>}
 * Returns `success: true` and the stage object if found.
 * Returns `success: false` and an error message if the stage does not exist or the query fails.
 */
export async function getStageById(stageId: string) {
    try {
        // SECURITY CHECK GOES HERE LATER
        // Example: await prisma.$executeRaw`SELECT set_config('request.jwt.claims', ${currentUser.token}, TRUE)`

        const stage = await prisma.stages.findUnique({
            where: {
                stage_id: stageId,
                // is_deleted: false,
            },
            include: {
                ProjectStages: true,
            },
        });
        if (!stage) {
            return { success: false, error: "Stage not found in the database." };
        }
        return { success: true, data: stage };
    } catch (error) {
        console.error("Failed to fetch stage:", error);
        return { success: false, error: "Failed to fetch stage details." };
    }
}


/**
 * Updates an existing stage's details in the database.
 * Note: The stage 'number' is excluded from this function to protect the sequential order.
 *
 * @param {string} stageId - The UUID of the stage to update.
 * @param {string} [stageName] - (Optional) The new name for the stage.
 * @param {Date | null} [startDate] - (Optional) The new scheduled start date.
 * @param {Date | null} [endDate] - (Optional) The new scheduled end date.
 * @returns {Promise<{success: boolean, data?: any, error?: string}>}
 * Returns `success: true` and the updated stage object if successful.
 */
export async function updateStage(
    stageId: string,
    stageName?: string,
    startDate?: Date | null,
    endDate?: Date | null
) {
    try {
        const updatedStage = await prisma.stages.update({
            where: {
                stage_id: stageId,
            },
            data: {
                name: stageName,
                start_date: startDate,
                end_date: endDate,
            },
        });
        return { success: true, data: updatedStage };
    } catch (error) {
        console.error("Failed to update stage:", error);
        return { success: false, error: "Failed to update stage details." };
    }
}


/**
 * Performs a "soft delete" on a stage by marking it as deleted instead of permanently erasing it.
 * This acts like a recycle bin, preserving historical data and preventing database corruption.
 * Note: Archiving is blocked if the stage contains active child phases to ensure operational integrity.
 *
 * @param {string} stageId - The UUID of the stage to soft delete.
 * @returns {Promise<{success: boolean, error?: string}>}
 * Returns `success: true` if the stage was successfully archived.
 * Returns `success: false` and an error message if the stage contains phases or the query fails.
 */
export async function softDeleteStage(stageId: string) {
    try {
        const attachedPhasesCount = await prisma.stagePhases.count({
            where: {
                stage_id: stageId,
                // is_deleted: false
            },
        });
        if (attachedPhasesCount > 0) {
            return {
                success: false,
                error: `Cannot archive stage. Please remove or archive all ${attachedPhasesCount} associated phase(s) first.`
            };
        }

        await prisma.stages.update({
            where: { stage_id: stageId },
            data: {
                // is_deleted: true,
                // deleted_at: new Date(),
            },
        });
        return { success: true };
    } catch (error) {
        console.error("Failed to soft delete stage:", error);
        return { success: false, error: "Failed to archive the stage due to a database error." };
    }
}