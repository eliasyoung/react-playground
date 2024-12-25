import React, { useRef, useImperativeHandle, useState } from 'react'
import { motion, AnimatePresence } from 'motion/react'

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog'

import { CircleAlert, LoaderCircle } from 'lucide-react'

import { useTranslation } from 'react-i18next'

type BaseConfirmDialogProps = {
  title?: string
  description?: string
  cancelText?: string
  confirmText?: string
  showCancel?: boolean
  showConfirm?: boolean
  onConfirmHandler: () => Promise<void>
}

export type BaseConfirmDialogRefType = {
  show: () => Promise<boolean>
}

const BaseConfirmDialog = React.forwardRef<
  BaseConfirmDialogRefType,
  BaseConfirmDialogProps
>(
  (
    {
      title,
      description,
      cancelText,
      confirmText,
      showCancel = true,
      showConfirm = true,
      onConfirmHandler,
    },
    ref,
  ) => {
    const [visible, setVisible] = useState(false)
    const [isConfirming, setIsConfirming] = useState(false)

    const { t } = useTranslation('common')

    const confirmDialogTitle = title ?? t('base.confirm-dialog.title')
    const confirmDialogDescription =
      description ?? t('base.confirm-dialog.description')
    const confirmDialogCancelText =
      cancelText ?? t('base.confirm-dialog.cancel-button')
    const confirmDialogConfirmText =
      confirmText ?? t('base.confirm-dialog.confirm-button')

    const promiseRef = useRef<{
      resolve: (value: boolean) => void
    }>()

    useImperativeHandle(ref, () => ({
      show: () => {
        setVisible(true)

        return new Promise((resolve) => {
          promiseRef.current = { resolve }
        })
      },
    }))

    const handleCancel = () => {
      if (isConfirming) return
      promiseRef.current?.resolve(false)
      setVisible(false)
    }

    const handleConfirm = async () => {
      if (isConfirming) return

      try {
        setIsConfirming(true)
        await onConfirmHandler()
        promiseRef.current?.resolve(true)
        setVisible(false)
      } catch (err) {
      } finally {
        setIsConfirming(false)
      }
    }

    return (
      <AlertDialog open={visible}>
        <AnimatePresence>
          {visible && (
            <AlertDialogContent>
              <div className='flex flex-col gap-2 max-sm:items-center sm:flex-row sm:gap-4'>
                <div
                  className='flex size-9 shrink-0 items-center justify-center rounded-full border border-border'
                  aria-hidden='true'
                >
                  <CircleAlert
                    className='opacity-80'
                    size={16}
                    strokeWidth={2}
                  />
                </div>
                <AlertDialogHeader>
                  <AlertDialogTitle>{confirmDialogTitle}</AlertDialogTitle>
                  <AlertDialogDescription>
                    {confirmDialogDescription}
                  </AlertDialogDescription>
                </AlertDialogHeader>
              </div>
              <AlertDialogFooter>
                {showCancel && (
                  <AlertDialogCancel onClick={handleCancel}>
                    {confirmDialogCancelText}
                  </AlertDialogCancel>
                )}
                {showConfirm && (
                  <AlertDialogAction
                    onClick={handleConfirm}
                    disabled={isConfirming}
                  >
                    {isConfirming && (
                      <LoaderCircle
                        className='-ms-1 me-2 animate-spin'
                        size={16}
                        strokeWidth={2}
                        aria-hidden='true'
                      />
                    )}
                    {confirmDialogConfirmText}
                  </AlertDialogAction>
                )}
              </AlertDialogFooter>
            </AlertDialogContent>
          )}
        </AnimatePresence>
      </AlertDialog>
    )
  },
)

BaseConfirmDialog.displayName = 'BaseConfirmDialog'

export default BaseConfirmDialog
