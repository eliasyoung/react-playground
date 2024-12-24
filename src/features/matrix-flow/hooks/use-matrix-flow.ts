import { useReactFlow } from '@xyflow/react'
import { useCallback } from 'react'
import { toast } from 'sonner'
import { useTranslation } from 'react-i18next'
import { postRunFlow, patchSaveFlow } from '../api'

export const useMatrixFlow = () => {
  const flow = useReactFlow()
  const { t } = useTranslation('matrixFlow')

  const handleSaveMatrixFlow = useCallback(
    async (flow_id: string) => {
      const flowData = {
        graph: flow.toObject(),
      }

      try {
        const res = await patchSaveFlow(flow_id, flowData)
        console.log(res)
        toast.success(t('toast-message.save-success'))
      } catch (err) {
        console.log(err)
      }
    },
    [flow],
  )

  const handleRunMatrixFlow = useCallback(async (flow_id: string) => {
    try {
      const res = await postRunFlow(flow_id)
      console.log(res)
    } catch (err) {
      console.log(err)
    }
  }, [])

  return {
    handleSaveMatrixFlow,
    handleRunMatrixFlow,
  }
}
