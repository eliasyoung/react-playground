import { createFileRoute, redirect } from '@tanstack/react-router'
import MatrixFlowContainer from '@/features/matrix-flow/components/matrix-flow-container'
import { ReactFlowProvider } from '@xyflow/react'
import { getMatrixFlowDetail } from '@/features/matrix-flow/api'
import Loading from '@/components/ui/loading'

export const Route = createFileRoute('/matrix-flow/$flowId')({
  loader: async ({ params: { flowId } }) => {
    const flow = await getMatrixFlowDetail(flowId)
    if (!flow.data) {
      throw redirect({ to: '/matrix-flow' })
    }
    return flow
  },
  component: RouteComponent,
  pendingComponent: () => <Loading />,
  shouldReload: true,
  gcTime: 0,
})

function RouteComponent() {
  const flowData = Route.useLoaderData()

  return (
    <div className='w-full relative h-[calc(100vh-72px)]'>
      <ReactFlowProvider>
        <MatrixFlowContainer initFlowData={flowData.data} />
      </ReactFlowProvider>
    </div>
  )
}
