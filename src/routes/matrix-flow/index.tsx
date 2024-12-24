import MatrixFLowListContainer from '@/features/matrix-flow/components/matrix-flow-list/matrix-flow-list-container'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/matrix-flow/')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <div className='w-full relative min-h-[calc(100vh-72px)] grid'>
      <MatrixFLowListContainer />
    </div>
  )
}
