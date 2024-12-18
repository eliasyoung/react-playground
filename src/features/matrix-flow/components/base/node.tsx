import React from 'react'

import { Handle, Position, useConnection, type NodeProps } from '@xyflow/react'

import { cn } from '@/lib/utils'
import { useTranslation } from 'react-i18next'
import NodeContextMenu from './node-context-menu'

const BaseNode = React.memo<NodeProps>(({ id, data, selected }) => {
  const { t } = useTranslation('matrixFlow')

  return (
    <>
      <NodeContextMenu>
        <div
          className={cn(
            'p-4 border rounded-lg shadow-lg shadow-black/5 border-border bg-background max-w-[300px]',
            selected && 'border-ring',
          )}
        >
          <h1 className='font-display font-semibold'>
            {t('node.title', { id: id })}
          </h1>
          <p className='font-text text-xs text-gray-500 dark:text-gray-400 font-light'>
            This is a test node for future matrix flow use.
          </p>
        </div>
      </NodeContextMenu>
      <Handle type='target' position={Position.Left} className='p-1' />
      <Handle type='source' position={Position.Right} className='p-1' />
    </>
  )
})

BaseNode.displayName = 'BaseNode'

export default BaseNode
