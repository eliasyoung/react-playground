import MatrixWorkfLowListContainer from '@/features/matrix-workflow/components/matrix-workflow-list/matrix-workflow-list-container'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/matrix-workflow/')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <div className='w-full relative min-h-[calc(100vh-72px)] grid'>
      <MatrixWorkfLowListContainer />
    </div>
  )
}
