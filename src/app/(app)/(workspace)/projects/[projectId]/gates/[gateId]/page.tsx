export default function GatePage({
  params,
}: {
  params: { projectId: string; gateId: string };
}) {
  return <div>Gate {params.gateId}</div>;
}
