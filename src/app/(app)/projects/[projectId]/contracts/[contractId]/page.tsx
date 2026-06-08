export default function ContractPage({
  params,
}: {
  params: { projectId: string; contractId: string };
}) {
  return <div>Contract {params.contractId}</div>;
}
