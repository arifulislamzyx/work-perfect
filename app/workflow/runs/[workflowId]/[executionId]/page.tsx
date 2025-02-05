export default function ExecutionViewerPage({
  params,
}: {
  params: {
    executionId: string;
    workflowId: string;
  };
}) {
  return <div>Run Viewer {params.workflowId}</div>;
}
