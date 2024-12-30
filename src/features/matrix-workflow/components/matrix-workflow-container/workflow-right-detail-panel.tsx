import React from 'react'
import useMatrixWorkflowStore from '@/features/matrix-workflow/store'
import { useShallow } from 'zustand/react/shallow'
import { AnimatePresence, motion } from 'motion/react'
import { useNodesData } from '@xyflow/react'
import { useTranslation } from 'react-i18next'
import { X } from 'lucide-react'
import type { MatrixWorkflowNodeType } from '@/features/matrix-workflow/types'

const WorkflowRightDetailPanel = React.memo(() => {
  const { t } = useTranslation('matrix_workflow')

  const { onSelectNodeId, setOnSelectNodeId } = useMatrixWorkflowStore(
    useShallow((state) => ({
      onSelectNodeId: state.onSelectNodeId,
      setOnSelectNodeId: state.setOnSelectNodeId,
    })),
  )
  const nodeData = useNodesData(onSelectNodeId ?? '')

  return (
    <AnimatePresence>
      {onSelectNodeId && nodeData && (
        <motion.div
          className='absolute right-0 top-[80px] h-[calc(100%-80px)] bg-gray-50 dark:bg-stone-900 border border-r-0 border-gray-200 dark:border-stone-600 shadow-xs bg-opacity-95 w-[400px] z-50 rounded-l-xl'
          initial={{
            opacity: 0,
            translateX: '100%',
          }}
          animate={{
            opacity: 1,
            translateX: '0%',
          }}
          exit={{
            opacity: 0,
            translateX: '100%',
          }}
          transition={{
            duration: 0.15,
          }}
        >
          <div className='flex flex-row flex-nowrap justify-between items-center truncate p-4 border-b border-b-gray-200 dark:border-b-stone-600'>
            <h1 className='text-xl font-semibold font-display flex-1 truncate mr-2'>
              {t(`node.node-type.${nodeData.type as MatrixWorkflowNodeType}`)}
            </h1>
            <X
              className='size-5 stroke-1 cursor-pointer'
              onClick={() => {
                setOnSelectNodeId(null)
              }}
            />
          </div>
          <h1 className='text-2xl font-semibold font-display'>
            {onSelectNodeId}
          </h1>

          <span className='text-sm font-text font-light'>
            {JSON.stringify(nodeData.data)}
          </span>
        </motion.div>
      )}
    </AnimatePresence>
  )
})

WorkflowRightDetailPanel.displayName = 'WorkflowRightDetailPanel'

export default WorkflowRightDetailPanel
