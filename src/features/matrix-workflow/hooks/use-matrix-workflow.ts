import { useReactFlow } from '@xyflow/react'
import { useCallback } from 'react'
import { toast } from 'sonner'
import { useTranslation } from 'react-i18next'
import {
  postRunWorkflow,
  patchSaveWorkflow,
} from '@/features/matrix-workflow/api'

export const useMatrixWorkflow = () => {
  const flow = useReactFlow()
  const { t } = useTranslation('matrix_workflow')

  const handleSaveMatrixWorkflow = useCallback(
    async (workflow_id: string) => {
      const workflowData = {
        graph: flow.toObject(),
      }

      try {
        const res = await patchSaveWorkflow(workflow_id, workflowData)
        console.log(res)
        toast.success(t('toast-message.save-success'))
      } catch (err) {
        console.log(err)
      }
    },
    [flow],
  )

  const handleRunMatrixWorkflow = useCallback(async (workflow_id: string) => {
    try {
      const res = await postRunWorkflow(workflow_id)
      console.log(res)
    } catch (err) {
      console.log(err)
    }
  }, [])

  return {
    handleSaveMatrixWorkflow,
    handleRunMatrixWorkflow,
  }
}
