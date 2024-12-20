import React from 'react'

import { cn } from '@/lib/utils'
import { useTranslation } from 'react-i18next'

type BaseNodeProps = {
  id: string
  data: Record<string, unknown>
  selected?: boolean
  className?: string
}

const BaseNode = React.memo<BaseNodeProps>(
  ({ id, data, selected, className }) => {
    const { t } = useTranslation('matrixFlow')

    return (
      <div
        className={cn(
          'p-4 border rounded-lg shadow-lg shadow-black/5 border-border bg-background w-[300px]',
          selected && 'border-ring',
          className,
        )}
      >
        <h1 className='font-display font-semibold'>
          {t('node.title', { id: id })}
        </h1>
        <p className='font-text text-xs text-gray-500 dark:text-gray-400 font-light'>
          This is a test node for future matrix flow use.
        </p>
      </div>
    )
  },
)

BaseNode.displayName = 'BaseNode'

export default BaseNode
