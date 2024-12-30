import React from 'react'

import { cn } from '@/lib/utils'
import { useTranslation } from 'react-i18next'
import type { MatrixWorkflowNodeType } from '@/features/matrix-workflow/types'

type BaseNodeProps = {
  id: string
  data: Record<string, unknown>
  selected?: boolean
  className?: string
  type: MatrixWorkflowNodeType
  children?: React.ReactNode
}

const BaseNode = React.memo<BaseNodeProps>(
  ({ id, data, selected, className, children, type }) => {
    const { t } = useTranslation('matrix_workflow')

    return (
      <div
        className={cn(
          'p-4 border rounded-lg shadow-lg shadow-black/5 border-border bg-background w-[300px]',
          selected && 'border-ring',
          className,
        )}
      >
        <h1 className='font-display font-semibold'>
          {t(`node.node-type.${type}`)}
        </h1>
        <p className='font-text text-xs text-gray-500 dark:text-gray-400 font-light'>
          This is a test node for future matrix workflow use.
        </p>
        {children}
      </div>
    )
  },
)

BaseNode.displayName = 'BaseNode'

export default BaseNode
