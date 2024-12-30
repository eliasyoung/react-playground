import { useReactFlow } from '@xyflow/react'
import { useCallback } from 'react'
import { useShallow } from 'zustand/react/shallow'
import useMatrixWorkflowStore from '@/features/matrix-workflow/store'
import { generateNode } from '@/features/matrix-workflow/utils'
import type { MatrixWorkflowNodeType } from '@/features/matrix-workflow/types'

export const useNodesInteraction = () => {
  const flow = useReactFlow()

  const {
    isAddingNode,
    setIsAddingNode,
    newArrivalNodeData,
    setNewArrivalNodeData,
  } = useMatrixWorkflowStore(
    useShallow((state) => ({
      isAddingNode: state.isAddingNode,
      setIsAddingNode: state.setIsAddingNode,
      newArrivalNodeData: state.newArrivalNodeData,
      setNewArrivalNodeData: state.setNewArrivalNodeData,
    })),
  )

  const handleNodeAddWithPanelContextClick = useCallback(
    (node_type: MatrixWorkflowNodeType) => {
      if (isAddingNode || newArrivalNodeData) return

      setIsAddingNode(true)

      const newNode = generateNode(node_type)

      setNewArrivalNodeData({
        id: newNode.id,
        data: newNode.data,
        type: newNode.type as MatrixWorkflowNodeType,
      })
    },
    [isAddingNode, flow],
  )

  const handleNodeDelete = useCallback(
    (node_id: string) => {
      const selectedNode = flow.getNode(node_id)
      if (selectedNode) {
        flow.deleteElements({ nodes: [selectedNode] })
      }
    },
    [flow],
  )

  const handleEdgeDelete = useCallback(
    (edge_id: string) => {
      const selectedEdge = flow.getEdge(edge_id)
      if (selectedEdge) flow.deleteElements({ edges: [selectedEdge] })
    },
    [flow],
  )

  const getCurrentNodes = useCallback(() => {
    const nodes = flow.getNodes()
    console.log(nodes)
    return nodes
  }, [flow])

  // // Nodes interaction
  // const handleNodesDelete = useCallback(() => {
  //   const edges = flow.getEdges()

  //   if (edges.some((e) => e.selected)) {
  //     return
  //   }

  //   const selectedNode = nodes.find((n) => n.selected)
  //   if (
  //     selectedNode &&
  //     selectedNode.type !== MatrixFlowNodeType.Start &&
  //     selectedNode.type !== MatrixFlowNodeType.End
  //   ) {
  //     flow.deleteElements({ nodes: [selectedNode] })
  //   }
  // }, [flow])

  return {
    handleNodeAddWithPanelContextClick,
    handleNodeDelete,
    handleEdgeDelete,
    getCurrentNodes,
  }
}
