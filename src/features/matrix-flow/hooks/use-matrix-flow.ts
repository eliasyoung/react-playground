import { useReactFlow } from '@xyflow/react'
import { useCallback, useEffect } from 'react'
import { useShallow } from 'zustand/react/shallow'
import useMatrixFlowStore from '../store'
import { generateNode } from '../utils'

export const useMatrixFlow = () => {
  const flow = useReactFlow()
  const { isAddingNode, setIsAddingNode } = useMatrixFlowStore(
    useShallow((state) => ({
      isAddingNode: state.isAddingNode,
      setIsAddingNode: state.setIsAddingNode,
    })),
  )

  const handleNodeAdd = useCallback(() => {
    if (isAddingNode) return

    setIsAddingNode(true)

    const newNode = generateNode()
    flow.setNodes((prev) => [...prev, newNode])

    setIsAddingNode(false)
  }, [isAddingNode, flow])

  return {
    handleNodeAdd,
  }
}
