import { createFileRoute } from '@tanstack/react-router'
import MatrixFlowContainer from '@/features/matrix-flow/components/matrix-flow-container'
import { ReactFlowProvider } from '@xyflow/react'
import { getMatrixFlowDetail } from '@/features/matrix-flow/api'
import Loading from '@/components/ui/loading'

export const Route = createFileRoute('/matrix-flow/$flowId')({
  loader: async ({ params: { flowId } }) => await getMatrixFlowDetail(flowId),
  component: RouteComponent,
  pendingComponent: () => <Loading />,
  shouldReload: true,
  gcTime: 0,
})

function RouteComponent() {
  const { flowId } = Route.useParams()
  const flowData = Route.useLoaderData()

  return (
    <div className='w-full relative h-[calc(100vh-72px)]'>
      <ReactFlowProvider>
        <MatrixFlowContainer initFlowData={flowData} />
      </ReactFlowProvider>
    </div>
  )
}
