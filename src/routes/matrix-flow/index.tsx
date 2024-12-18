import MatrixFlowContainer from '@/features/matrix-flow/components'
import { createFileRoute } from '@tanstack/react-router'
import { ReactFlowProvider } from '@xyflow/react'

export const Route = createFileRoute('/matrix-flow/')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <div className='w-full relative h-[calc(100vh-72px)]'>
      <ReactFlowProvider>
        <MatrixFlowContainer />
      </ReactFlowProvider>
    </div>
  )
}
