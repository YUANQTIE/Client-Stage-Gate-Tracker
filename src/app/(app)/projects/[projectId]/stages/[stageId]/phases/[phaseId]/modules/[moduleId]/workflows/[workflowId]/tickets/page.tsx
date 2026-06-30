import TicketBoard from '@/components/tickets/TicketBoard';
import Sidebar from '@/components/layout/sidebar';

interface TicketsPageProps {
  params: Promise<{ projectId: string; workflowId: string }>;
}

export default async function TicketsPage({ params }: TicketsPageProps) {
  const { projectId, workflowId } = await params;

  return (
    <Sidebar>
      <main className="flex-1 h-full overflow-hidden">
        <TicketBoard projectId={projectId} workflowId={workflowId} />
      </main>
    </Sidebar>
  );
}
