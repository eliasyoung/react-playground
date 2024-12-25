import React, { useMemo, useRef, useState, useCallback } from 'react'
import { useQuery } from '@tanstack/react-query'
import { getFlowList, deleteFlowById } from '@/features/matrix-flow/api'

import MatrixFlowListCard from './matrix-flow-list-card'
import CreateMatrixFlowDialog, {
  type CreateMatrixFlowDialogRefType,
} from './create-matrix-flow-dialog'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import Loading from '@/components/ui/loading'
import { Plus, Search, Squirrel } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { useNavigate } from '@tanstack/react-router'
import { toast } from 'sonner'

export const MatrixFLowListContainer = React.memo(() => {
  const { t } = useTranslation('matrixFlow')
  const navigate = useNavigate()

  const { isFetching, data, isRefetching, refetch } = useQuery({
    queryKey: ['/matrix_flow/flow_list'],
    queryFn: getFlowList,
  })

  const [filterText, setFilterText] = useState('')

  const createMatrixFlowDialogRef = useRef<CreateMatrixFlowDialogRefType>(null)

  const filteredItemList = useMemo(() => {
    if (!data) return []
    return data.data.filter((flow) => {
      return flow.name.includes(filterText.trim())
    })
  }, [data, filterText])

  const onCreateClickHandler = async () => {
    if (!createMatrixFlowDialogRef.current) return
    const id = await createMatrixFlowDialogRef.current.show()
    if (id) {
      await refetch()
      navigate({ to: `/matrix-flow/${id}` })
    }
  }

  const onFlowConfirmDelete = useCallback(async (flow_id: string) => {
    try {
      await deleteFlowById(flow_id)
      toast.success('Delete Successfully!')
      refetch()
    } catch (err) {
      console.log(err)
    } finally {
    }
  }, [])

  return (
    <>
      <div className='size-full p-8'>
        {isFetching && <Loading />}
        {!isRefetching && data && (
          <div className='flex flex-col size-full gap-y-4'>
            <div className='flex justify-between items-center'>
              <div>
                <Button
                  variant='outline'
                  className='aspect-square max-sm:p-0'
                  onClick={onCreateClickHandler}
                >
                  <Plus
                    className='opacity-60 sm:-ms-1 sm:me-2'
                    size={16}
                    strokeWidth={2}
                    aria-hidden='true'
                  />
                  <span className='max-sm:sr-only'>
                    {t('matrix-flow-list.create-matrix-dialog.trigger-button')}
                  </span>
                </Button>
              </div>
              <div>
                <div className='relative'>
                  <Input
                    className='peer ps-9'
                    placeholder={t(
                      'matrix-flow-list.list-container.placeholder-search-input',
                    )}
                    value={filterText}
                    onChange={(e) => setFilterText(e.target.value)}
                    type='search'
                  />
                  <div className='pointer-events-none absolute inset-y-0 start-0 flex items-center justify-center ps-3 text-muted-foreground/80 peer-disabled:opacity-50'>
                    <Search size={16} strokeWidth={2} />
                  </div>
                </div>
              </div>
            </div>
            {filteredItemList.length > 0 ? (
              <div className='grid gap-4 grid-cols-1 lg:grid-cols-3 xl:grid-cols-4'>
                {filteredItemList.map((flow) => (
                  <MatrixFlowListCard
                    key={flow.id}
                    data={flow}
                    onDeleteConfirm={onFlowConfirmDelete}
                  />
                ))}
              </div>
            ) : (
              <div className='flex-1 size-full flex flex-col items-center justify-center gap-y-2'>
                <Squirrel className='size-16 stroke-1 opacity-80' />
                <h1 className='font-display text-lg'>
                  {t('matrix-flow-list.list-container.no-record-text')}
                </h1>
              </div>
            )}
          </div>
        )}
      </div>
      <CreateMatrixFlowDialog ref={createMatrixFlowDialogRef} />
    </>
  )
})

MatrixFLowListContainer.displayName = 'MatrixFLowListContainer'

export default MatrixFLowListContainer
