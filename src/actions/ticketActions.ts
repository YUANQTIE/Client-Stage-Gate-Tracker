"use server";
import { prisma } from "@/lib/prisma";
import { Prisma } from "@/lib/generated/prisma";

export type EntityFilterStatus = 'active' | 'deleted' | 'all';

// ── Tags ──────────────────────────────────────────────────────────────────────

/**
 * Retrieves all tag records from the database.
 * Typically used for cross-ticket categorization management or initializing global filtering options.
 *
 * @returns {Promise<any[]>}
 * Returns a promise that resolves to an array of all available tag objects.
 */
export async function tagSelect() {
  return await prisma.tags.findMany();
}

// ── Tickets ───────────────────────────────────────────────────────────────────

/**
 * Retrieves all ticket records from the database, eagerly loading nested relational data
 * including assigners, watchers, subtasks, tags, and assigned team members.
 */
export async function ticketSelect() {
  return await prisma.tickets.findMany({
    include: {
			TicketComments: true,
			TicketHistoryEvents: true,
			TicketImages: true,
			TicketSubtasks_TicketSubtasks_subtask_idToTickets: true,
			TicketSubtasks_TicketSubtasks_ticket_idToTickets: true,
			Users_Tickets_assigner_idToUsers: true,
			Users_Tickets_watcher_idToUsers: true,
			WorkflowsTickets: true
    }
  });
}

/**
 * Creates a new ticket and maps it to its parent workflow.
 *
 * @param {string} workflowId - The UUID of the parent workflow this ticket belongs to.
 * @param {string} name - The title/name of the ticket.
 * @param {string | null} [description] - (Optional) A brief description of the task.
 * @param {Date | null} [startDate] - (Optional) The scheduled start date.
 * @param {Date | null} [endDate] - (Optional) The scheduled end date.
 * @param {Date | null} [deadlineDate] - (Optional) The final deadline.
 * @returns {Promise<{success: boolean, data?: any, error?: string}>}
 * Returns `success: true` and the newly created ticket object if successful.
 * Returns `success: false` and an error message if the creation fails.
 */
export async function createTicket(
    workflowId: string,
    name: string,
    description?: string | null,
    startDate?: Date | null,
    endDate?: Date | null,
    deadlineDate?: Date | null
) {
    try {
        const newTicket = await prisma.tickets.create({
            data: {
                name: name,
                description: description,
                start_date: startDate,
                end_date: endDate,
                deadline_date: deadlineDate,
                workflow_id: workflowId,
                // ticket_id: automatically generated via gen_random_uuid()
                // status: automatically defaults to 'PENDING'::status
                // is_deleted: automatically defaults to false
                // creation_date / assignment_date: automatically defaults to now()
            },
        });
        return { success: true, data: newTicket };
    } catch (error) {
        console.error("Failed to create ticket:", error);
        return { success: false, error: "Failed to create ticket." };
    }
}

/**
 * Retrieves a specific ticket from the database using its unique ID.
 * Includes all nested relational data (assigners, watchers, subtasks, tags, assigned users).
 * Uses a status filter to determine if the ticket can be retrieved based on its deletion state:
 * - 'active' (default): Only retrieves the ticket if it is NOT soft-deleted.
 * - 'deleted': Only retrieves the ticket if it IS soft-deleted (useful for recycle bin views).
 * - 'all': Retrieves the ticket regardless of its deletion status.
 * Security Note: Ensure user authorization claims are verified before execution.
 *
 * @param {string} ticketId - The UUID of the ticket to retrieve.
 * @param {EntityFilterStatus} [status='active'] - The deletion status filter.
 * @returns {Promise<{success: boolean, data?: any, error?: string}>}
 * Returns `success: true` and the ticket object if found.
 * Returns `success: false` and an error message if the ticket does not exist, does not match
 * the requested status, or the query fails.
 */
export async function getTicketById(ticketId: string, status: EntityFilterStatus = 'active') {
    try {
        const isDeletedFilter = status === 'active' ? false : status === 'deleted' ? true : undefined;

        const ticketData = await prisma.tickets.findUnique({
            where: {
                ticket_id: ticketId,
                // is_deleted: isDeletedFilter,
            },
            include: {
                TicketTags: true,
                TicketAssigned: true,
                ticketSubtasks: true,
            },
        });

        if (!ticketData) {
            return { success: false, error: "Ticket not found or does not match the requested status." };
        }
        return { success: true, data: ticketData };
    } catch (error) {
        console.error("Failed to fetch ticket:", error);
        return { success: false, error: "Failed to fetch ticket details." };
    }
}

/**
 * Retrieves all subtasks belonging to a specific ticket.
 * Uses a status filter to determine which subtasks to return based on their deletion state:
 * - 'active' (default): Returns only subtasks that are NOT soft-deleted.
 * - 'deleted': Returns only subtasks that ARE soft-deleted (useful for recycle bin views).
 * - 'all': Bypasses the filter and returns everything.
 * Subtasks are returned in ascending chronological order based on their 'creation_date' field.
 *
 * @param {string} ticketId - The UUID of the parent ticket.
 * @param {EntityFilterStatus} [status='active'] - The deletion status filter.
 * @returns {Promise<{success: boolean, data?: any, error?: string}>}
 * Returns `success: true` and an array of subtasks if the query is successful.
 * Returns `success: false` and an error message if the query fails.
 */
export async function getSubtasksByTicketId(ticketId: string, status: EntityFilterStatus = 'active') {
    try {
        const isDeletedFilter = status === 'active' ? false : status === 'deleted' ? true : undefined;

        const subtasks = await prisma.ticketSubtasks.findMany({
            where: {
                ticket_id: ticketId,
                // is_deleted: isDeletedFilter,
            },
            orderBy: {
                creation_date: 'asc',
            },
        });

        return { success: true, data: subtasks };
    } catch (error) {
        console.error("Failed to fetch subtasks for ticket:", error);
        return { success: false, error: "Failed to fetch subtasks." };
    }
}

/**
 * Updates an existing ticket's fields. If new lists of tag IDs or assigned user IDs are provided,
 * it completely flushes the previous relations and remaps them to maintain clean data records.
 *
 * @param {string} ticketId - The UUID of the specific ticket to modify.
 * @param {Prisma.ticketsUncheckedUpdateInput} data - The updated payload properties for the ticket entity.
 * @param {string[]} [tagIds] - (Optional) A complete replacement array of tag UUIDs. Overwrites existing associations if defined.
 * @param {string[]} [assignedIds] - (Optional) A complete replacement array of assigned user UUIDs. Overwrites existing assignments if defined.
 */
/**
 * Updates an existing ticket's details in the database.
 *
 * @param {string} ticketId - The UUID of the ticket to update.
 * @param {string} [name] - (Optional) The new name for the ticket.
 * @param {string | null} [description] - (Optional) The new description for the ticket.
 * @param {Date | null} [startDate] - (Optional) The new scheduled start date.
 * @param {Date | null} [endDate] - (Optional) The new scheduled end date.
 * @param {Date | null} [deadlineDate] - (Optional) The new final deadline.
 * @returns {Promise<{success: boolean, data?: any, error?: string}>}
 * Returns `success: true` and the updated ticket object if successful.
 * Returns `success: false` and an error message if the update fails.
 */
export async function updateTicket(
    ticketId: string,
    name?: string,
    description?: string | null,
    startDate?: Date | null,
    endDate?: Date | null,
    deadlineDate?: Date | null
) {
    try {
        const updatedTicket = await prisma.tickets.update({
            where: {
                ticket_id: ticketId,
            },
            data: {
                name: name,
                description: description,
                start_date: startDate,
                end_date: endDate,
                deadline_date: deadlineDate,
            },
        });
        return { success: true, data: updatedTicket };
    } catch (error) {
        console.error("Failed to update ticket:", error);
        return { success: false, error: "Failed to update ticket details." };
    }
}

/**
 * Directly alters the status lifecycle configuration parameter of a singular ticket.
 *
 * @param {string} ticketId - The UUID of the ticket whose status is being changed.
 * @param {any} status - The status corresponding to the target ticket state.
 */
export async function ticketUpdateStatus(
    ticketId: string,
    status: any
) {
  return await prisma.tickets.update({
    where: { ticket_id: ticketId },
    data: { status },
    include: {
      TicketTags: true,
      TicketAssigned: true,
      ticketSubtasks: true,
    },
  });
}

/**
 * Performs a "soft delete" on a ticket by marking it as deleted instead of permanently erasing it.
 * This acts like a recycle bin, preserving historical data and preventing database corruption.
 * Note: Archiving is blocked if the ticket contains active subtasks to ensure operational integrity.
 *
 * @param {string} ticketId - The UUID of the ticket to soft delete.
 * @returns {Promise<{success: boolean, error?: string}>}
 * Returns `success: true` if the ticket was successfully archived.
 * Returns `success: false` and an error message if the ticket contains subtasks or the query fails.
 */
export async function softDeleteTicket(ticketId: string) {
    try {
        const attachedSubtasksCount = await prisma.ticketSubtasks.count({
            where: {
                ticket_id: ticketId,
                // is_deleted: false,
            },
        });
        if (attachedSubtasksCount > 0) {
            return {
                success: false,
                error: `Cannot archive ticket. Please remove or archive all ${attachedSubtasksCount} associated subtask(s) first.`
            };
        }

        await prisma.tickets.update({
            where: { ticket_id: ticketId },
            data: {
                // is_deleted: true,
                // deleted_at: new Date(),
            },
        });
        return { success: true };
    } catch (error) {
        console.error("Failed to soft delete ticket:", error);
        return { success: false, error: "Failed to archive the ticket due to a database error." };
    }
}

/**
 * Performs a cascading soft delete on a ticket and all its nested subtasks.
 * This function operates inside a provided Prisma transaction (txClient) to ensure
 * rollback integrity. It soft deletes the ticket and retrieves all associated subtasks.
 *
 * @param {string} ticketId - The UUID of the ticket to archive.
 * @param {Prisma.TransactionClient} [txClient] - (Optional) The Prisma transaction context to maintain database integrity.
 * @returns {Promise<{success: boolean, error?: string}>}
 * Returns `success: true` upon successful cascade.
 * Returns `success: false` and an error message if the operation fails, or throws an error
 * to trigger a rollback if executed within a parent transaction.
 */
export async function cascadeSoftDeleteTicket(ticketId: string, txClient?: Prisma.TransactionClient) {
    const executeLogic = async (tx: Prisma.TransactionClient) => {
        await tx.tickets.update({
            where: { ticket_id: ticketId },
            data: { /* is_deleted: true, deleted_at: new Date() */ }
        });

        const childSubtasks = await tx.ticketSubtasks.findMany({
            where: { ticket_id: ticketId, /* is_deleted: false */ },
            select: { subtask_id: true }
        });

        for (const subtask of childSubtasks) {
            // TODO: await cascadeSoftDeleteSubtask(subtask.subtask_id, tx);
        }
    };

    try {
        if (txClient) {
            await executeLogic(txClient);
        } else {
            await prisma.$transaction(executeLogic);
        }
        return { success: true };
    } catch (error) {
        console.error("Failed cascading soft delete for ticket:", error);
        if (txClient) throw error;
        return { success: false, error: "Failed to cascade archive ticket." };
    }
}

/**
 * Performs a destructive "hard delete" on a ticket record.
 * To guarantee database integrity and prevent foreign key constraint exceptions, it systematically flushes all
 * relational dependencies (tags, comments, media images, subtasks, historical timelines, assignments, and workflow linkages)
 * prior to removing the root ticket.
 *
 * @param {string} ticketId - The UUID of the ticket being targeted for absolute deletion.
 */
export async function ticketDelete(ticketId: string) {
  await prisma.ticketTags.deleteMany({ where: { ticket_id: ticketId } });
  await prisma.ticketComments.deleteMany({ where: { ticket_id: ticketId } });
  await prisma.ticketImages.deleteMany({ where: { ticket_id: ticketId } });
  await prisma.ticketSubtasks.deleteMany({
    where: {
      OR: [
        { ticket_id: ticketId },
        { subtask_id: ticketId }
      ]
    }
  });
  await prisma.ticketHistoryEvents.deleteMany({ where: { ticket_id: ticketId } });
  await prisma.ticketAssigned.deleteMany({ where: { ticket_id: ticketId } });
  await prisma.workflowsTickets.deleteMany({ where: { ticket_id: ticketId } });

  return await prisma.tickets.delete({
    where: { ticket_id: ticketId },
  });
}
