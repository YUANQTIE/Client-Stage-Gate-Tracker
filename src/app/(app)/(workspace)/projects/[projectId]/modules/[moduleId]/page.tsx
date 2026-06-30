export default function ModulePage({
  params,
}: {
  params: { projectId: string; phaseId: string; moduleId: string };
}) {
  return <div>Module {params.moduleId}</div>;
}
