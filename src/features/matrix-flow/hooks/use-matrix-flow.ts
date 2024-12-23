import { useReactFlow } from '@xyflow/react'
import { useCallback } from 'react'
import { toast } from 'sonner'
import { useTranslation } from 'react-i18next'
import { postCreateFlow, patchSaveFlow } from '../api'

export const useMatrixFlow = () => {
  const flow = useReactFlow()
  const { t } = useTranslation('matrixFlow')

  const handleSaveMatrixFlow = useCallback(
    (flow_id: string) => {
      const flowData = {
        graph: flow.toObject(),
      }

      patchSaveFlow(flow_id, flowData)
        .then((res) => console.log(res))
        .catch((rej) => console.log(rej))

      toast.success(t('toast-message.save-success'))
      // TODO: SEND TO API AND STORE IT
    },
    [flow],
  )

  const handleCreateMatrixFlow = useCallback(() => {
    const flowObj = flow.toObject()

    postCreateFlow(flowObj)
      .then((res) => console.log(res))
      .catch((rej) => console.log(rej))
  }, [flow])

  return {
    handleSaveMatrixFlow,
    handleCreateMatrixFlow,
  }
}
