import React, { useCallback } from 'react'
import { cn } from '@/lib/utils'
import type { MatrixFlowListItem } from '@/features/matrix-flow/types'
import { useNavigate } from '@tanstack/react-router'

type MatrixFlowListItemProps = {
  className?: string
  data: MatrixFlowListItem
}

const MatrixFlowListCard = React.memo<MatrixFlowListItemProps>(
  ({ className, data }) => {
    const navigate = useNavigate()

    const onFlowCardClick = useCallback(() => {
      navigate({ to: `/matrix-flow/${data.id}` })
    }, [data])

    return (
      <div
        className={cn(
          'p-4 border rounded-lg shadow-lg shadow-black/5 border-border bg-background hover:border-ring w-full cursor-pointer',
          className,
        )}
        onClick={(e) => onFlowCardClick()}
      >
        {data.id}
      </div>
    )
  },
)

MatrixFlowListCard.displayName = 'MatrixFlowListCard'

export default MatrixFlowListCard
