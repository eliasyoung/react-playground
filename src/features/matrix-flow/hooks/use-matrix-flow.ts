import { useReactFlow } from '@xyflow/react'
import { useCallback } from 'react'
import { toast } from 'sonner'
import { useTranslation } from 'react-i18next'
import { postSaveFlow } from '../servies'

export const useMatrixFlow = () => {
  const flow = useReactFlow()
  const { t } = useTranslation('matrixFlow')

  const handleSaveMatrixFlow = useCallback(() => {
    const flowObj = flow.toObject()

    postSaveFlow(Date.now().toString(), flowObj)
      .then((res) => console.log(res))
      .catch((rej) => console.log(rej))

    toast.success(t('toast-message.save-success'))
    // TODO: SEND TO API AND STORE IT
  }, [flow])

  return {
    handleSaveMatrixFlow,
  }
}
