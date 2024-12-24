import { useCallback } from 'react'
import { postCreateFlow } from '@/features/matrix-flow/api'
import { generateFlowTemplate } from '@/features/matrix-flow/utils'

export const UseMatrixFlowList = () => {
  const handleCreateMatrixFlow = useCallback(
    async (data: { name: string; description: string }) => {
      const { name, description } = data
      const graph = generateFlowTemplate()

      const res = await postCreateFlow({
        name,
        description,
        graph,
      })
      return res
    },
    [],
  )

  return { handleCreateMatrixFlow }
}
