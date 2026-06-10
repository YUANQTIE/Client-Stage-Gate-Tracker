"use server";
import { prisma } from "@/lib/prisma";
import { Prisma } from "@/lib/generated/prisma";

// ── Ticket Type ───────────────────────────────────────────────────────────────

const ticketInclude = {
  Users_Tickets_assigner_idToUsers: true,
  Users_Tickets_watcher_idToUsers: true,
  TicketSubtasks_TicketSubtasks_ticket_idToTickets: true,
  TicketTags: { include: { Tags: true } },
  TicketAssigned: { include: { Users: true } },
} satisfies Prisma.TicketsInclude;

export type Ticket = Prisma.TicketsGetPayload<{
  include: typeof ticketInclude;
}>;

// ── Tags ──────────────────────────────────────────────────────────────────────

/**
 * Retrieves all tag records from the database.
 * Typically used for cross-ticket categorization management or initializing global filtering options.
 *
 * @returns {Promise<any[]>}
 * Returns a promise that resolves to an array of all available tag objects.
 */
export async function tagSelect() {
  return prisma.tags.findMany();
}

// ── Tickets ───────────────────────────────────────────────────────────────────

/**
 * Retrieves all ticket records from the database, eagerly loading nested relational data
 * including assigners, watchers, subtasks, tags, and assigned team members.
 *
 * @returns {Promise<Ticket[]>}
 * Returns a promise that resolves to an array of fully populated Ticket objects.
 */
export async function ticketSelect(): Promise<Ticket[]> {
  return prisma.tickets.findMany({ include: ticketInclude });
}

/**
 * Creates a new ticket record and establishes its structural connections to tags and
 * assigned team members within a single transactional pipeline.
 *
 * @param {Prisma.TicketsUncheckedCreateInput} data - The primary properties for creating the ticket (e.g., title, content, priorities).
 * @param {string[]} [tagIds=[]] - (Optional) An array of tag UUIDs to hook up to this ticket.
 * @param {string[]} [assignedIds=[]] - (Optional) An array of user UUIDs to assign to this ticket.
 * @returns {Promise<Ticket>}
 * Returns a promise that resolves to the newly created and fully populated Ticket object.
 */
export async function ticketCreate(
    data: Prisma.TicketsUncheckedCreateInput,
    tagIds: string[] = [],
    assignedIds: string[] = []
): Promise<Ticket> {
  return prisma.tickets.create({
    data: {
      ...data,
      TicketTags: {
        create: tagIds.map(tag_id => ({ tag_id })),
      },
      TicketAssigned: {
        create: assignedIds.map(user_id => ({ user_id })),
      },
    },
    include: ticketInclude,
  });
}

/**
 * Updates an existing ticket's fields. If modern lists of tag IDs or assigned user IDs are provided,
 * it completely flushes the previous relations and remaps them to maintain clean data records.
 *
 * @param {string} ticketId - The UUID of the specific ticket to modify.
 * @param {Prisma.TicketsUncheckedUpdateInput} data - The updated payload properties for the ticket entity.
 * @param {string[]} [tagIds] - (Optional) A complete replacement array of tag UUIDs. Overwrites existing associations if defined.
 * @param {string[]} [assignedIds] - (Optional) A complete replacement array of assigned user UUIDs. Overwrites existing assignments if defined.
 * @returns {Promise<Ticket>}
 * Returns a promise that resolves to the modified, fully re-hydrated Ticket object.
 */
export async function ticketUpdate(
    ticketId: string,
    data: Prisma.TicketsUncheckedUpdateInput,
    tagIds?: string[],
    assignedIds?: string[]
): Promise<Ticket> {
  if (tagIds !== undefined) {
    await prisma.ticketTags.deleteMany({ where: { ticket_id: ticketId } });
  }
  if (assignedIds !== undefined) {
    await prisma.ticketAssigned.deleteMany({ where: { ticket_id: ticketId } });
  }

  return prisma.tickets.update({
    where: { ticket_id: ticketId },
    data: {
      ...data,
      ...(tagIds !== undefined && {
        TicketTags: {
          create: tagIds.map(tag_id => ({ tag_id })),
        },
      }),
      ...(assignedIds !== undefined && {
        TicketAssigned: {
          create: assignedIds.map(user_id => ({ user_id })),
        },
      }),
    },
    include: ticketInclude,
  });
}

/**
 * Directly alters the status lifecycle configuration parameter of a singular ticket.
 *
 * @param {string} ticketId - The UUID of the ticket whose status is being changed.
 * @param {Ticket['status']} status - The strict typed string corresponding to the target ticket state.
 * @returns {Promise<Ticket>}
 * Returns a promise that resolves to the updated Ticket object with the new status state applied.
 */
export async function ticketUpdateStatus(
    ticketId: string,
    status: Ticket['status']
): Promise<Ticket> {
  return prisma.tickets.update({
    where: { ticket_id: ticketId },
    data: { status },
    include: ticketInclude,
  });
}

/**
 * Performs a destructive "hard delete" on a ticket record.
 * To guarantee database integrity and prevent foreign key constraint exceptions, it systematically flushes all
 * relational dependencies (tags, comments, media images, subtasks, historical timelines, assignments, and workflow linkages)
 * prior to removing the root ticket.
 *
 * @param {string} ticketId - The UUID of the ticket being targeted for absolute deletion.
 * @returns {Promise<any>}
 * Returns a promise that resolves to the core unpopulated base record that was deleted.
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

  return prisma.tickets.delete({
    where: { ticket_id: ticketId },
  });
}