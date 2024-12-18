import React from 'react'
import BaseNode from './base/node'
import { useTranslation } from 'react-i18next'
import { cn } from '@/lib/utils'
import useMatrixFlowStore from '../store'
import { useShallow } from 'zustand/react/shallow'

const node = {
  id: '114514',
  position: { x: 0, y: 0 },
  type: 'testNode',
  data: { label: '114514', myData: 'something' },
}

const NewNode = React.memo(() => {
  const { t } = useTranslation('matrixFlow')
  const { mousePosition, isAddingNode } = useMatrixFlowStore(
    useShallow((state) => ({
      mousePosition: state.mousePosition,
      isAddingNode: state.isAddingNode,
    })),
  )

  if (!isAddingNode) return null

  return (
    <div
      className='absolute z-10'
      style={{
        left: mousePosition.elementX,
        top: mousePosition.elementY,
      }}
    >
      <div
        className={cn(
          'p-4 border rounded-lg shadow-lg shadow-black/5 border-border bg-background max-w-[300px]',
        )}
      >
        <h1 className='font-display font-semibold'>
          {t('node.title', { id: '114514' })}
        </h1>
        <p className='font-text text-xs text-gray-500 dark:text-gray-400 font-light'>
          This is a test node for future matrix flow use.
        </p>
      </div>
    </div>
  )
})

NewNode.displayName = 'NewNode'

export default NewNode
