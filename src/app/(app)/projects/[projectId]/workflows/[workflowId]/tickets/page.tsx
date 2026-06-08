import TicketBoard from '@/components/tickets/TicketBoard';

interface TicketsPageProps {
  params: Promise<{ projectId: string; workflowId: string }>;
}

export default async function TicketsPage({ params }: TicketsPageProps) {
  const { projectId, workflowId } = await params;

  return (
    <div className="flex h-screen overflow-hidden">
      {/* Sidebar goes here */}
      <main className="flex-1 overflow-hidden">
        <TicketBoard projectId={projectId} workflowId={workflowId} />
      </main>
    </div>
  );
}
