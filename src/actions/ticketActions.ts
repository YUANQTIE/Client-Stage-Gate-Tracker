import { prisma } from "@/lib/prisma";
import { Prisma } from "@/lib/generated/prisma"; 

export async function TicketCreate(ticketInput: Prisma.TicketsUncheckedCreateInput) {
    const newTicket = await prisma.Tickets.create({
        data: {
            name: ticketInput.name,
            description: ticketInput.description,
            
            assigner_id: ticketInput.assigner_id, 
            watcher_id: ticketInput.watcher_id ?? undefined, 

            deadline_date: ticketInput.deadline_date,
            creation_date: ticketInput.creation_date ?? undefined,
            assignment_date: ticketInput.assignment_date ?? undefined,
            start_date: ticketInput.start_date ?? undefined,
            end_date: ticketInput.end_date ?? undefined,
            status: ticketInput.status ?? undefined
        },
    });

    return newTicket;
}

export async function TicketEdit(ticketId:string,ticketInput:Prisma.TicketsUncheckedUpdateInput) {
    const editedTicket = await prisma.Tickets.update({
        where: {
            ticket_id: ticketId,
        },
		data:{
            name: ticketInput.name,
            description: ticketInput.description,
            
            assigner_id: ticketInput.assigner_id, 
            watcher_id: ticketInput.watcher_id, 

            deadline_date: ticketInput.deadline_date,
            creation_date: ticketInput.creation_date,
            assignment_date: ticketInput.assignment_date,
            start_date: ticketInput.start_date,
            end_date: ticketInput.end_date,
            status: ticketInput.status
		}

    });

    return editedTicket;
}

export async function TicketDelete(ticketId:string) {
    const deletedTicket = await prisma.Tickets.delete({
        where: {
            ticket_id: ticketId,
        },
    });

    return deletedTicket;
}
