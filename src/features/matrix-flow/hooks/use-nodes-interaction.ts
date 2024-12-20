import { useReactFlow } from '@xyflow/react'
import { useCallback } from 'react'
import { useTranslation } from 'react-i18next'
import { useShallow } from 'zustand/react/shallow'
import useMatrixFlowStore from '../store'
import { generateNode } from '../utils'

export const useNodesInteraction = () => {
  const flow = useReactFlow()

  const {
    isAddingNode,
    setIsAddingNode,
    newArrivalNodeData,
    setNewArrivalNodeData,
  } = useMatrixFlowStore(
    useShallow((state) => ({
      isAddingNode: state.isAddingNode,
      setIsAddingNode: state.setIsAddingNode,
      newArrivalNodeData: state.newArrivalNodeData,
      setNewArrivalNodeData: state.setNewArrivalNodeData,
    })),
  )

  const handleNodeAddWithPanelContextClick = useCallback(() => {
    if (isAddingNode || newArrivalNodeData) return

    setIsAddingNode(true)

    const newNode = generateNode()

    setNewArrivalNodeData({
      id: newNode.id,
      data: newNode.data,
      type: 'testNode',
    })
  }, [isAddingNode, flow])

  const handleNodeDelete = useCallback(
    (node_id: string) => {
      const selectedNode = flow.getNode(node_id)
      if (selectedNode) flow.deleteElements({ nodes: [selectedNode] })
    },
    [flow],
  )

  const getCurrentNodes = useCallback(() => {
    const nodes = flow.getNodes()
    console.log(nodes)
    return nodes
  }, [flow])

  return {
    handleNodeAddWithPanelContextClick,
    handleNodeDelete,
    getCurrentNodes,
  }
}
