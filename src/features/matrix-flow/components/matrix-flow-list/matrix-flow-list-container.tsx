import React from 'react'
import { useQuery } from '@tanstack/react-query'
import { getFlowList } from '@/features/matrix-flow/api'

import MatrixFlowListCard from './matrix-flow-list-card'
import Loading from '@/components/ui/loading'

export const MatrixFLowListContainer = React.memo(() => {
  const { isFetching, data, isRefetching } = useQuery({
    queryKey: ['/matrix_flow/flow_list'],
    queryFn: getFlowList,
  })

  return (
    <div className='size-full p-8'>
      {isFetching && <Loading />}
      {!isRefetching && data && (
        <div className='size-full grid place-items-center gap-4 grid-cols-1 lg:grid-cols-3 xl:grid-cols-4'>
          {data.map((flow) => (
            <MatrixFlowListCard key={flow.id} data={flow} />
          ))}
        </div>
      )}
    </div>
  )
})

MatrixFLowListContainer.displayName = 'MatrixFLowListContainer'

export default MatrixFLowListContainer
