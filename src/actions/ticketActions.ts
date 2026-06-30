"use server";

import { prisma } from "@/lib/prisma";
import {Prisma, status, CommentParentType, ImageParentType } from "@/lib/generated/prisma";
import {cascadeSoftDeleteWorkflow} from "@/actions/workflowActions";

export type EntityFilterStatus = 'active' | 'deleted' | 'all';


export type EntityFilterStatus = 'active' | 'deleted' | 'all';

export async function selectTicket() {
    try {
        return await prisma.tickets.findMany({
            where: { is_deleted: false },
            include: {
                TicketTags: true,
                TicketAssigned: true,
                TicketSubtasks_TicketSubtasks_ticket_idToTickets: true,
                Users_Tickets_assigner_idToUsers: true,
                Users_Tickets_watcher_idToUsers: true,
            },
        });
    } catch (error) {
        console.error("Error fetching tickets:", error);
        return [];
    }
}

// deadlineDate is required, so it MUST go before description, startDate, and endDate
export async function createTicket(
    workflowId: string,
    name: string,
    deadlineDate: Date,
    description?: string | null,
    startDate?: Date | null,
    endDate?: Date | null
) {
    try {
        const newTicket = await prisma.tickets.create({
            data: {
                name,
                description,
                start_date: startDate,
                end_date: endDate,
                deadline_date: deadlineDate,
                workflow_id: workflowId,
            },
            include: {
                TicketTags: true,
                TicketAssigned: true,
                TicketSubtasks_TicketSubtasks_ticket_idToTickets: true,
                Users_Tickets_assigner_idToUsers: true,
                Users_Tickets_watcher_idToUsers: true,
            }
        });
        return { success: true, data: newTicket };
    } catch (error) {
        console.error("Create ticket error:", error);
        return { success: false, error: "Failed to create ticket" };
    }
}

export async function ticketUpdateStatus(ticketId: string, status: status) {
    return prisma.tickets.update({
        where: { ticket_id: ticketId },
        data: { status },
        include: {
            TicketTags: true,
            TicketAssigned: true,
            TicketSubtasks_TicketSubtasks_ticket_idToTickets: true,
            Users_Tickets_assigner_idToUsers: true,
            Users_Tickets_watcher_idToUsers: true,
        },
    });
}

export async function getSubtasksByTicketId(ticketId: string, status: string = 'active') {
    try {
        const subtasks = await prisma.ticketSubtasks.findMany({
            where: {
                ticket_id: ticketId,
            },
            orderBy: {
                subtask_id: 'asc', // Safe creation-fallback sort field
            },
        });
        return { success: true, data: subtasks };
    } catch (error) {
        console.error(error);
        return { success: false, error: "Failed to fetch subtasks" };
    }
}

/**
 * Performs a "soft delete" on a ticket by flagging it as deleted.
 * This removes it from active board views while preserving historical audit data.
 *
 * @param {string} ticketId - The UUID of the ticket to soft delete.
 * @returns {Promise<{success: boolean, error?: string}>}
 */
export async function cascadeSoftDeleteTicket(ticketId: string, txClient?: Prisma.TransactionClient) {

    // Delete related entries in other tables
    const executeLogic = async (tx: Prisma.TransactionClient) => {

        // Update ticket status
        await tx.tickets.update({
            where: { ticket_id: ticketId },
            data: { is_deleted: true, deleted_at: new Date() }
        });

        // Delete comments, images, and other related entries
        await tx.comments.deleteMany({
            where: { parent_id: ticketId, parent_type: CommentParentType.TICKET },
        });

        await tx.images.deleteMany({
            where: { parent_id: ticketId, parent_type: ImageParentType.TICKET },
        });

        await tx.historyEvent.deleteMany({
            where: { ticket_id: ticketId },
        });

        await tx.ticketAssigned.deleteMany({
            where: { ticket_id: ticketId },
        });

        await tx.ticketTags.deleteMany({
            where: { ticket_id: ticketId },
        });

        const subtasks = await tx.ticketSubtasks.findMany({
            where: { ticket_id: ticketId },
            select: { subtask_id: true }
        })

        for (const s of subtasks) {
            await cascadeSoftDeleteTicket(s.subtask_id, tx);
        }

    };

    try {
        await prisma.tickets.update({
            where: {
                ticket_id: ticketId
            },
            data: {
                is_deleted: true,
                deleted_at: new Date(),
            },
    });
        return { success: true };
    } catch (error) {
        console.error("Failed to soft delete ticket:", error);
        return { success: false, error: "Failed to delete the ticket due to a database error." };
    }
}
