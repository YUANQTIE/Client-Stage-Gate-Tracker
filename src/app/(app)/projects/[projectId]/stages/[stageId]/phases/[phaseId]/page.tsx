export default function PhasePage({
  params,
}: {
  params: { projectId: string; phaseId: string };
}) {
  return <div>Phase {params.phaseId}</div>;
}
