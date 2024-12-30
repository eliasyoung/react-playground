import { useCallback } from 'react'
import { postCreateWorkflow } from '@/features/matrix-workflow/api'
import { generateWorkflowTemplate } from '@/features/matrix-workflow/utils'

export const UseMatrixWorkflowList = () => {
  const handleCreateMatrixWorkflow = useCallback(
    async (data: { name: string; description: string }) => {
      const { name, description } = data
      const graph = generateWorkflowTemplate()

      const res = await postCreateWorkflow({
        name,
        description,
        graph,
      })
      return res
    },
    [],
  )

  return { handleCreateMatrixWorkflow }
}
