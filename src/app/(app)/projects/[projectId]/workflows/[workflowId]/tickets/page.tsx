import TicketBoard from '@/components/tickets/TicketBoard';
import Sidebar from '@/components/layout/sidebar';

interface TicketsPageProps {
  params: Promise<{ projectId: string; workflowId: string }>;
}

export default async function TicketsPage({ params }: TicketsPageProps) {
  const { projectId, workflowId } = await params;

  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar>
      <main className="flex-1 overflow-hidden">
        <TicketBoard projectId={projectId} workflowId={workflowId} />
      </main>
      </Sidebar>
    </div>
  );
}
