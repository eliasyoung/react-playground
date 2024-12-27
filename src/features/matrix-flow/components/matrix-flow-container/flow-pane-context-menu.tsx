import React, { type MouseEvent, useCallback, useRef, useEffect } from 'react'

import { useTranslation } from 'react-i18next'
import { useShallow } from 'zustand/react/shallow'
import useMatrixFlowStore from '@features/matrix-flow/store'
import { useOnClickOutside } from 'usehooks-ts'
import MatrixFlowBaseContextMenu from '../base/base-context-menu'
import { Button } from '@/components/ui/button'

const FlowPaneContextMenu = React.memo(() => {
  const { t } = useTranslation('matrixFlow')

  const paneContextMenuRef = useRef<HTMLDivElement>(null)

  const {
    paneContextMenu,
    setPaneContextMenu,
    setNodeContextMenu,
    setAddNodeMenu,
  } = useMatrixFlowStore(
    useShallow((state) => ({
      setNodeContextMenu: state.setNodeContextMenu,
      paneContextMenu: state.paneContextMenu,
      setPaneContextMenu: state.setPaneContextMenu,
      setAddNodeMenu: state.setAddNodeMenu,
    })),
  )

  const handleAddNodeClick = (e: MouseEvent) => {
    if (!paneContextMenu) return
    e.stopPropagation()
    e.preventDefault()
    setAddNodeMenu({
      top: paneContextMenu.top,
      left: paneContextMenu.left,
    })
    setPaneContextMenu(null)
  }

  const handleClickOutsidePaneContextMenu = useCallback(
    (e: MouseEvent | TouchEvent | FocusEvent) => {
      if (e instanceof MouseEvent && e.button === 2) return
      if (paneContextMenu) {
        setPaneContextMenu(null)
      }
    },
    [paneContextMenu],
  )

  useOnClickOutside(paneContextMenuRef, handleClickOutsidePaneContextMenu)

  useEffect(() => {
    if (paneContextMenu) setNodeContextMenu(null)
  }, [paneContextMenu])

  return (
    <>
      <MatrixFlowBaseContextMenu
        top={paneContextMenu?.top}
        left={paneContextMenu?.left}
        open={!!paneContextMenu}
        ref={paneContextMenuRef}
      >
        {/* <div
            className='hover:bg-gray-100 dark:hover:bg-zinc-700 font-display px-2 py-1.5 rounded-lg cursor-pointer transition'
            onClick={handleAddNodeClick}
          >
            {t('flow-contextmenu.add-node')}
          </div> */}
        <Button
          variant={'ghost'}
          className='w-full justify-start'
          onClick={handleAddNodeClick}
        >
          {t('flow-contextmenu.add-node')}
        </Button>
      </MatrixFlowBaseContextMenu>
    </>
  )
})

FlowPaneContextMenu.displayName = 'FlowPaneContextMenu'

export default FlowPaneContextMenu
