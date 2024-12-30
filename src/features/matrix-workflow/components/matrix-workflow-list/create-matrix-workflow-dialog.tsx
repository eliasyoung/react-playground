import React, { useRef, useImperativeHandle, useState } from 'react'

import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'

import { Plus, LoaderCircle } from 'lucide-react'

import { useTranslation } from 'react-i18next'
import { toast } from 'sonner'
import { UseMatrixWorkflowList } from '@/features/matrix-workflow/hooks/use-matrix-workflow-list'

type CreateWorkflowForm = {
  name: string
  description: string
}

export type CreateMatrixWorkflowDialogType = string

export type CreateMatrixWorkflowDialogRefType = {
  show: () => Promise<CreateMatrixWorkflowDialogType | false>
}

const CreateMatrixWorkflowDialog =
  React.forwardRef<CreateMatrixWorkflowDialogRefType>((_props, ref) => {
    const [visible, setVisible] = useState(false)
    const [isCreating, setIsCreating] = useState(false)
    const [formValue, setFormValue] = useState<CreateWorkflowForm>({
      name: '',
      description: '',
    })

    const { t } = useTranslation('matrix_workflow')

    const promiseRef = useRef<{
      resolve: (value: CreateMatrixWorkflowDialogType | false) => void
    }>()

    useImperativeHandle(ref, () => ({
      show: () => {
        setVisible(true)

        return new Promise((resolve) => {
          promiseRef.current = { resolve }
        })
      },
    }))

    const { handleCreateMatrixWorkflow } = UseMatrixWorkflowList()

    const handleCancel = () => {
      if (isCreating) return
      promiseRef.current?.resolve(false)
      setFormValue({
        name: '',
        description: '',
      })
      setVisible(false)
    }

    const handleCreate = async () => {
      if (isCreating) return

      const name = formValue.name.trim()
      const description = formValue.description.trim()

      if (!name) {
        toast.warning('Name must not be empty!')
        return false
      }

      try {
        setIsCreating(true)
        const res = await handleCreateMatrixWorkflow({
          name,
          description,
        })
        toast.success('create workflow successfully!')
        promiseRef.current?.resolve(res.data.id)
        setFormValue({
          name: '',
          description: '',
        })
        setVisible(false)
      } catch (err) {
        toast.error('something went wrong when trying to create a new workflow')
      } finally {
        setIsCreating(false)
      }
    }

    return (
      <Dialog open={visible}>
        <DialogContent
          onOpenAutoFocus={(e) => {
            e.preventDefault()
          }}
          onCloseClick={handleCancel}
        >
          <div className='flex flex-col gap-2'>
            <div
              className='flex size-11 shrink-0 items-center justify-center rounded-full border border-border'
              aria-hidden='true'
            >
              <Plus className='opacity-80' size={16} strokeWidth={2} />
            </div>
            <DialogHeader>
              <DialogTitle className='text-left'>
                {t('matrix-workflow-list.create-matrix-dialog.dialog-title')}
              </DialogTitle>
              <DialogDescription className='text-left'>
                {t(
                  'matrix-workflow-list.create-matrix-dialog.dialog-description',
                )}
              </DialogDescription>
            </DialogHeader>
          </div>

          <form className='space-y-5'>
            <div className='space-y-4'>
              <div className='space-y-2'>
                <Label htmlFor='workflow-name-input'>
                  {t(
                    'matrix-workflow-list.create-matrix-dialog.label-name-input',
                  )}
                </Label>
                <div className='space-y-3'>
                  <Input
                    id='workflow-name-input'
                    value={formValue.name}
                    onChange={(e) =>
                      setFormValue((prev) => ({
                        ...prev,
                        name: e.target.value,
                      }))
                    }
                    placeholder={t(
                      'matrix-workflow-list.create-matrix-dialog.placeholder-name-input',
                    )}
                  />
                </div>
              </div>
              <div className='space-y-2'>
                <Label htmlFor='workflow-description-input'>
                  {t(
                    'matrix-workflow-list.create-matrix-dialog.label-description-input',
                  )}
                </Label>
                <div className='space-y-3'>
                  <Textarea
                    id='workflow-description-input'
                    value={formValue.description}
                    placeholder={t(
                      'matrix-workflow-list.create-matrix-dialog.placeholder-description-input',
                    )}
                    onChange={(e) =>
                      setFormValue((prev) => ({
                        ...prev,
                        description: e.target.value,
                      }))
                    }
                  />
                </div>
              </div>
            </div>
            <Button
              type='button'
              className='w-full'
              onClick={handleCreate}
              disabled={isCreating}
            >
              {isCreating && (
                <LoaderCircle
                  className='-ms-1 me-2 animate-spin'
                  size={16}
                  strokeWidth={2}
                  aria-hidden='true'
                />
              )}
              {t('matrix-workflow-list.create-matrix-dialog.confirm-button')}
            </Button>
          </form>
        </DialogContent>
      </Dialog>
    )
  })

CreateMatrixWorkflowDialog.displayName = 'CreateMatrixWorkflowDialog'

export default CreateMatrixWorkflowDialog
