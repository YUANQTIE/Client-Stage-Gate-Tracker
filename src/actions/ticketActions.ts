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

export async function tagSelect() {
  return prisma.tags.findMany();
}

// ── Tickets ───────────────────────────────────────────────────────────────────

export async function ticketSelect(): Promise<Ticket[]> {
  return prisma.tickets.findMany({ include: ticketInclude });
}

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

export async function ticketUpdate(
  ticketId: string,
  data: Prisma.TicketsUncheckedUpdateInput,
  tagIds?: string[],
  assignedIds?: string[]   // ← add param
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