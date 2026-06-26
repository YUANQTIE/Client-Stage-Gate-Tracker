"use server";

import { prisma } from "@/lib/prisma";
import { Prisma, status as TicketStatus } from "@/lib/generated/prisma";


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

export async function ticketUpdateStatus(ticketId: string, status: TicketStatus) {
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
export async function deleteTicket(ticketId: string) {
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