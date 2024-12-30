import { createFileRoute, redirect } from '@tanstack/react-router'
import MatrixWorkflowContainer from '@/features/matrix-workflow/components/matrix-workflow-container/matrix-workflow-container'
import { ReactFlowProvider } from '@xyflow/react'
import { getMatrixWorkflowDetail } from '@/features/matrix-workflow/api'
import Loading from '@/components/ui/loading'

export const Route = createFileRoute('/matrix-workflow/$workflowId')({
  loader: async ({ params: { workflowId } }) => {
    const workflow = await getMatrixWorkflowDetail(workflowId)
    if (!workflow.data) {
      throw redirect({ to: '/matrix-workflow' })
    }
    return workflow
  },
  component: RouteComponent,
  pendingComponent: () => <Loading />,
  shouldReload: true,
  gcTime: 0,
})

function RouteComponent() {
  const workflowData = Route.useLoaderData()

  return (
    <div className='w-full relative h-[calc(100vh-72px)]'>
      <ReactFlowProvider>
        <MatrixWorkflowContainer initWorkflowData={workflowData.data} />
      </ReactFlowProvider>
    </div>
  )
}
