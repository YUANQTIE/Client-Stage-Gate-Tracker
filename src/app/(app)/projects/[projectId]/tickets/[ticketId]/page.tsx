import { TicketCreate } from "@/actions/ticketActions";

export default function TicketPage({
  params,
}: {
  params: { projectId: string; ticketId: string };
}) {
	TicketCreate({
		name: "Very very very urgent!",
		description: "Very very very urgent!",
		assigner_id: "Very very very urgent!", 
		watcher_id: "Very very very urgent!",
		
		assignment_date: new Date(), 
		creation_date: new Date(),   
		deadline_date: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
	});
  	return <div>Ticket {params.ticketId}</div>;
}
