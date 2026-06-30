export default function WorkflowPage({
  params,
}: {
  params: {
    projectId: string;
    phaseId: string;
    moduleId: string;
    workflowId: string;
  };
}) {
  return <div>Workflow {params.workflowId}</div>;
}
