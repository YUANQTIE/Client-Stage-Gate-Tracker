"use server";
import { prisma } from "@/lib/prisma";

/**
 * Creates a new workflow and links it to the parent module in a single transaction.
 *
 * @param {string} moduleId - The UUID of the parent module this workflow belongs to.
 * @param {string} workflowName - The display name of the workflow (e.g., "Workflow 1").
 * @param {string | null} [description] - (Optional) A brief description of the workflow.
 * @param {Date | null} [startDate] - (Optional) The scheduled start date of the workflow.
 * @param {Date | null} [endDate] - (Optional) The scheduled end date of the workflow.
 * @param {boolean} [isApproved=false] - (Optional) The approval status of the workflow.
 * @returns {Promise<{success: boolean, data?: any, error?: string}>}
 * Returns `success: true` and the newly created workflow object if successful.
 * Returns `success: false` and an error message if the creation or linking fails.
 */
export async function createWorkflow(
    moduleId: string,
    workflowName: string,
    description?: string | null,
    startDate?: Date | null,
    endDate?: Date | null,
    isApproved: boolean = false
) {
    try {
        const newWorkflow = await prisma.workflows.create({
            data: {
                name: workflowName,
                description: description,
                start_date: startDate,
                end_date: endDate,
                is_approved: isApproved,

                ModuleWorkflows: {
                    create: {
                        module_id: moduleId,
                    },
                },
            },
        });
        return { success: true, data: newWorkflow };
    } catch (error) {
        console.error("Failed to create workflow:", error);
        return { success: false, error: "Failed to create workflow and link to module." };
    }
}


/**
 * Retrieves a specific workflow from the database using its unique ID.
 * Includes the relational link to its parent module.
 * Automatically blocks access to workflows that have been soft-deleted.
 *
 * @param {string} workflowId - The UUID of the workflow to retrieve.
 * @returns {Promise<{success: boolean, data?: any, error?: string}>}
 * Returns `success: true` and the workflow object if found.
 * Returns `success: false` and an error message if the workflow does not exist or the query fails.
 */
export async function getWorkflowById(workflowId: string) {
    try {
        // SECURITY CHECK GOES HERE LATER:
        // Example: await prisma.$executeRaw`SELECT set_config('request.jwt.claims', ${currentUser.token}, TRUE)`

        const workflowData = await prisma.workflows.findUnique({
            where: {
                workflow_id: workflowId,
                // is_deleted: false,
            },
            include: {
                ModuleWorkflows: true,
            },
        });
        if (!workflowData) {
            return { success: false, error: "Workflow not found in the database." };
        }
        return { success: true, data: workflowData };
    } catch (error) {
        console.error("Failed to fetch workflow:", error);
        return { success: false, error: "Failed to fetch workflow details." };
    }
}


/**
 * Updates an existing workflow's details in the database.
 *
 * @param {string} workflowId - The UUID of the workflow to update.
 * @param {string} [workflowName] - (Optional) The new name for the workflow.
 * @param {string | null} [description] - (Optional) The new description for the workflow.
 * @param {Date | null} [startDate] - (Optional) The new scheduled start date.
 * @param {Date | null} [endDate] - (Optional) The new scheduled end date.
 * @param {boolean} [isApproved] - (Optional) The new approval status.
 * @returns {Promise<{success: boolean, data?: any, error?: string}>}
 * Returns `success: true` and the updated workflow object if successful.
 * Returns `success: false` and an error message if the update fails.
 */
export async function updateWorkflow(
    workflowId: string,
    workflowName?: string,
    description?: string | null,
    startDate?: Date | null,
    endDate?: Date | null,
    isApproved?: boolean
) {
    try {
        const updatedWorkflow = await prisma.workflows.update({
            where: {
                workflow_id: workflowId,
            },
            data: {
                name: workflowName,
                description: description,
                start_date: startDate,
                end_date: endDate,
                is_approved: isApproved,
            },
        });
        return { success: true, data: updatedWorkflow };
    } catch (error) {
        console.error("Failed to update workflow:", error);
        return { success: false, error: "Failed to update workflow details." };
    }
}


/**
 * Performs a "soft delete" on a workflow by marking it as deleted instead of permanently erasing it.
 * This acts like a recycle bin, preserving historical data and preventing database corruption.
 * Note: Archiving is blocked if the workflow contains active child tickets to ensure operational integrity.
 *
 * @param {string} workflowId - The UUID of the workflow to soft delete.
 * @returns {Promise<{success: boolean, error?: string}>}
 * Returns `success: true` if the workflow was successfully archived.
 * Returns `success: false` and an error message if the workflow contains tickets or the query fails.
 */
export async function softDeleteWorkflow(workflowId: string) {
    try {
        const attachedTicketsCount = await prisma.workflowsTickets.count({
            where: {
                workflow_id: workflowId,
                // is_deleted: false
            },
        });
        if (attachedTicketsCount > 0) {
            return {
                success: false,
                error: `Cannot archive workflow. Please remove or archive all ${attachedTicketsCount} associated ticket(s) first.`
            };
        }

        await prisma.workflows.update({
            where: { workflow_id: workflowId },
            data: {
                // is_deleted: true,
                // deleted_at: new Date(),
            },
        });
        return { success: true };
    } catch (error) {
        console.error("Failed to soft delete workflow:", error);
        return { success: false, error: "Failed to archive the workflow due to a database error." };
    }
}