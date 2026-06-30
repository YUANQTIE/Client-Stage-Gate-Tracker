export default async function ProjectPage({
  params,
}: {
  params: Promise<{ projectId: string }>;
}) {
  const resolvedParams = await params;
  const projectId = resolvedParams.projectId;
  return <div>Project {projectId}</div>;
}