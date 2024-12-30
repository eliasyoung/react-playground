import React, { useMemo, useRef, useState, useCallback } from 'react'
import { useQuery } from '@tanstack/react-query'
import {
  getWorkflowList,
  deleteWorkflowById,
} from '@/features/matrix-workflow/api'

import MatrixWorkflowListCard from './matrix-workflow-list-card'
import CreateMatrixWorkflowDialog, {
  type CreateMatrixWorkflowDialogRefType,
} from './create-matrix-workflow-dialog'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import Loading from '@/components/ui/loading'
import { Plus, Search, Squirrel } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { useNavigate } from '@tanstack/react-router'
import { toast } from 'sonner'

export const MatrixWorkflowListContainer = React.memo(() => {
  const { t } = useTranslation('matrix_workflow')
  const navigate = useNavigate()

  const { isFetching, data, isRefetching, refetch } = useQuery({
    queryKey: ['/matrix_workflow/workflow_list'],
    queryFn: getWorkflowList,
  })

  const [filterText, setFilterText] = useState('')

  const createMatrixWorkflowDialogRef =
    useRef<CreateMatrixWorkflowDialogRefType>(null)

  const filteredItemList = useMemo(() => {
    if (!data) return []
    return data.data.filter((flow) => {
      return flow.name.includes(filterText.trim())
    })
  }, [data, filterText])

  const onCreateClickHandler = async () => {
    if (!createMatrixWorkflowDialogRef.current) return
    const id = await createMatrixWorkflowDialogRef.current.show()
    if (id) {
      await refetch()
      navigate({ to: `/matrix-workflow/${id}` })
    }
  }

  const onWorkflowConfirmDelete = useCallback(async (workflow_id: string) => {
    try {
      await deleteWorkflowById(workflow_id)
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
                    {t(
                      'matrix-workflow-list.create-matrix-dialog.trigger-button',
                    )}
                  </span>
                </Button>
              </div>
              <div>
                <div className='relative'>
                  <Input
                    className='peer ps-9'
                    placeholder={t(
                      'matrix-workflow-list.list-container.placeholder-search-input',
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
                {filteredItemList.map((workflow) => (
                  <MatrixWorkflowListCard
                    key={workflow.id}
                    data={workflow}
                    onDeleteConfirm={onWorkflowConfirmDelete}
                  />
                ))}
              </div>
            ) : (
              <div className='flex-1 size-full flex flex-col items-center justify-center gap-y-2'>
                <Squirrel className='size-16 stroke-1 opacity-80' />
                <h1 className='font-display text-lg'>
                  {t('matrix-workflow-list.list-container.no-record-text')}
                </h1>
              </div>
            )}
          </div>
        )}
      </div>
      <CreateMatrixWorkflowDialog ref={createMatrixWorkflowDialogRef} />
    </>
  )
})

MatrixWorkflowListContainer.displayName = 'MatrixWorkflowListContainer'

export default MatrixWorkflowListContainer
