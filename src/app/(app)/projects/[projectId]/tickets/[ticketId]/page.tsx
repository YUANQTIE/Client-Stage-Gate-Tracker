export default function TicketPage({
  params,
}: {
  params: { projectId: string; ticketId: string };
}) {
  return <div>Ticket {params.ticketId}</div>;
}
