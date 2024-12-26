import { useCallback, useEffect } from 'react'
import { isEventTargetInputArea } from '@/features/matrix-flow/utils'
import { useReactFlow } from '@xyflow/react'
import { MatrixFlowNodeType } from '@/features/matrix-flow/types'

export const useShortcuts = () => {
  const flow = useReactFlow()

  const handleKeyPressNodeDelete = useCallback(() => {
    const edges = flow.getEdges()
    const nodes = flow.getNodes()

    if (edges.some((e) => e.selected)) {
      return
    }

    const selectedNode = nodes.find((n) => n.selected)
    if (
      selectedNode &&
      selectedNode.type !== MatrixFlowNodeType.Start &&
      selectedNode.type !== MatrixFlowNodeType.End
    ) {
      flow.deleteElements({ nodes: [selectedNode] })
    }
  }, [flow])

  const handleKeyPressEdgeDelete = useCallback(() => {
    const edges = flow.getEdges()
    const nodes = flow.getNodes()

    if (nodes.some((n) => n.selected)) {
      return
    }

    const selectedEdge = edges.find((n) => n.selected)
    if (selectedEdge) {
      flow.deleteElements({ edges: [selectedEdge] })
    }
  }, [flow])

  /* Handle keypress 'delete' and 'backspace' for node | edge deletion */
  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      if (!isEventTargetInputArea(event.target as HTMLElement)) {
        event.preventDefault()
        if (event.key === 'Backspace' || event.key === 'Delete') {
          handleKeyPressNodeDelete()
          handleKeyPressEdgeDelete()
        }
      }
    }
    window.addEventListener('keydown', handleKeyPress)

    return () => {
      window.removeEventListener('keydown', handleKeyPress)
    }
  }, [handleKeyPressNodeDelete, handleKeyPressEdgeDelete])
}
