import React from 'react'
import { useQuery } from '@tanstack/react-query'
import { getFlowList } from '@/features/matrix-flow/api'

import MatrixFlowListCard from './matrix-flow-list-card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import Loading from '@/components/ui/loading'
import { Plus, Search } from 'lucide-react'

export const MatrixFLowListContainer = React.memo(() => {
  const { isFetching, data, isRefetching } = useQuery({
    queryKey: ['/matrix_flow/flow_list'],
    queryFn: getFlowList,
  })

  return (
    <div className='size-full p-8'>
      {isFetching && <Loading />}
      {!isRefetching && data && (
        <div className='flex flex-col size-full gap-y-4'>
          <div className='flex justify-between items-center'>
            <div>
              <Button variant='outline' className='aspect-square max-sm:p-0'>
                <Plus
                  className='opacity-60 sm:-ms-1 sm:me-2'
                  size={16}
                  strokeWidth={2}
                  aria-hidden='true'
                />
                <span className='max-sm:sr-only'>Create New</span>
              </Button>
            </div>
            <div>
              <div className='relative'>
                <Input
                  className='peer ps-9'
                  placeholder='Search...'
                  type='search'
                />
                <div className='pointer-events-none absolute inset-y-0 start-0 flex items-center justify-center ps-3 text-muted-foreground/80 peer-disabled:opacity-50'>
                  <Search size={16} strokeWidth={2} />
                </div>
              </div>
            </div>
          </div>
          <div className='size-full grid place-items-center gap-4 grid-cols-1 lg:grid-cols-3 xl:grid-cols-4'>
            {data.map((flow) => (
              <MatrixFlowListCard key={flow.id} data={flow} />
            ))}
          </div>
        </div>
      )}
    </div>
  )
})

MatrixFLowListContainer.displayName = 'MatrixFLowListContainer'

export default MatrixFLowListContainer
