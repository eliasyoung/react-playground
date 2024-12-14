import { SectionContainer } from '@/components/ui/section-container'
import MatrixFlowContainer from '@/features/matrix-flow/components'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/matrix-flow/')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <div className='w-full relative'>
      <SectionContainer>
        <MatrixFlowContainer />
      </SectionContainer>
    </div>
  )
}
