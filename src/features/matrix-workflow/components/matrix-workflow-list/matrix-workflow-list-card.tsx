import React, { useCallback, useRef } from 'react'
import { cn } from '@/lib/utils'
import type { MatrixWorkflowListItem } from '@/features/matrix-workflow/types'
import { useNavigate } from '@tanstack/react-router'
import { Trash2 } from 'lucide-react'
import BaseConfirmDialog, {
  type BaseConfirmDialogRefType,
} from '@/components/base/confirm-dialog'
import { useTranslation } from 'react-i18next'

type MatrixWorkflowListItemProps = {
  className?: string
  data: MatrixWorkflowListItem
  onDeleteConfirm: (workflow_id: string) => Promise<void>
}

const MatrixWorkflowListCard = React.memo<MatrixWorkflowListItemProps>(
  ({ className, data, onDeleteConfirm }) => {
    const navigate = useNavigate()

    const { t } = useTranslation('matrix_workflow')

    const onWorkflowCardClick = useCallback(() => {
      navigate({ to: `/matrix-workflow/${data.id}` })
    }, [data])

    const deleteWorkflowConfirmDialogRef =
      useRef<BaseConfirmDialogRefType>(null)

    const onDeleteClickHandler = async () => {
      if (!deleteWorkflowConfirmDialogRef.current) return
      const success = await deleteWorkflowConfirmDialogRef.current.show()
      if (success) {
      }
    }

    const onDeleteConfirmHandler = useCallback(async () => {
      await onDeleteConfirm(data.id)
    }, [data])

    return (
      <>
        <div
          className={cn(
            'flex flex-col group relative p-4 border rounded-lg shadow-lg shadow-black/5 border-border bg-background dark:bg-neutral-700 hover:border-ring w-full cursor-pointer h-[150px]',
            className,
          )}
          onClick={(e) => onWorkflowCardClick()}
        >
          <div className='flex-1'>
            <div className='flex justify-between items-center'>
              <h1 className='flex-1 font-medium font-display'>{data.name}</h1>
              <div>
                <div
                  className='size-7 grid place-items-center rounded-md hover:bg-gray-100 dark:hover:bg-neutral-500 transition opacity-0 group-hover:opacity-100 group/trash'
                  onClick={(e) => {
                    e.stopPropagation()
                    onDeleteClickHandler()
                  }}
                >
                  <Trash2 className='size-4 text-primary/60 group-hover/trash:text-primary/80 transition' />
                </div>
              </div>
            </div>
            <div className=''>
              <span className='font-text text-primary/80 text-sm'>
                {data.description && data.description}
              </span>
            </div>
          </div>
          <div className='flex justify-between'>
            <div />
          </div>
        </div>
        <BaseConfirmDialog
          ref={deleteWorkflowConfirmDialogRef}
          onConfirmHandler={onDeleteConfirmHandler}
          title={t('matrix-workflow-list.delete-matrix-dialog.dialog-title')}
          description={t(
            'matrix-workflow-list.delete-matrix-dialog.dialog-description',
            { workflow_name: data.name },
          )}
          confirmText={t(
            'matrix-workflow-list.delete-matrix-dialog.confirm-button',
          )}
        />
      </>
    )
  },
)

MatrixWorkflowListCard.displayName = 'MatrixWorkflowListCard'

export default MatrixWorkflowListCard
