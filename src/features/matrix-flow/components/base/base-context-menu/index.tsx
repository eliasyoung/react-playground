import { cn } from '@/lib/utils'
import { AnimatePresence, motion } from 'motion/react'
import React from 'react'

type MatrixFlowBaseContextMenuProps = {
  top?: number
  left?: number
  children?: React.ReactNode
  open: boolean
  className?: string
}

const MatrixFlowBaseContextMenu = React.forwardRef<
  HTMLDivElement,
  MatrixFlowBaseContextMenuProps
>(({ top, left, children, open, className }, ref) => {
  // const baseContextMenuRef = useRef<HTMLDivElement>(null)

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className={cn(
            'fixed w-[300px] p-1 bg-background z-40 rounded-lg border border-gray-200 dark:border-stone-700 shadow-lg shadow-black/5 dark:shadow-stone-700/45',
            className,
          )}
          style={{
            top: top ?? 0,
            left: left ?? 0,
          }}
          initial={{
            opacity: 0,
            y: '5%',
          }}
          animate={{
            opacity: 1,
            y: '0%',
          }}
          exit={{
            opacity: 0,
            y: '5%',
          }}
          transition={{
            duration: 0.15,
          }}
          ref={ref}
        >
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  )
})

MatrixFlowBaseContextMenu.displayName = 'MatrixFlowBaseContextMenu'

export default MatrixFlowBaseContextMenu
