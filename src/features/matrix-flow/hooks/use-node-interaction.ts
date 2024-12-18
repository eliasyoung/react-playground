import { useReactFlow } from '@xyflow/react'
import { useCallback } from 'react'

export const useNodeInteraction = () => {
  const flow = useReactFlow()

  const handleNodeDelete = useCallback((node_id: string) => {
    console.log(node_id)
  }, [])

  const getCurrentNodes = useCallback(() => {
    const nodes = flow.getNodes()
    console.log(nodes)
    return nodes
  }, [flow])

  return {
    handleNodeDelete,
    getCurrentNodes,
  }
}
