import React, { useCallback, useEffect, useMemo, useRef } from 'react'

import { useNodesInteraction } from '../../hooks/use-nodes-interaction'
import { useTranslation } from 'react-i18next'
import { MatrixFlowNodeType } from '../../types'
import useMatrixFlowStore from '@features/matrix-flow/store'
import { useShallow } from 'zustand/react/shallow'
import { useOnClickOutside } from 'usehooks-ts'
import MatrixFlowBaseContextMenu from '@/features/matrix-flow/components/base/base-context-menu'

const NodeContextMenu = React.memo(() => {
  const nodeContextMenuRef = useRef<HTMLDivElement>(null)
  const { t } = useTranslation('matrixFlow')

  const { handleNodeDelete } = useNodesInteraction()

  const { nodeContextMenu, setNodeContextMenu, setPaneContextMenu } =
    useMatrixFlowStore(
      useShallow((state) => ({
        nodeContextMenu: state.nodeContextMenu,
        setNodeContextMenu: state.setNodeContextMenu,
        paneContextMenu: state.paneContextMenu,
        setPaneContextMenu: state.setPaneContextMenu,
      })),
    )

  const canDeleteNode = useMemo(() => {
    return nodeContextMenu
      ? nodeContextMenu.node_type !== MatrixFlowNodeType.Start &&
          nodeContextMenu.node_type !== MatrixFlowNodeType.End
      : false
  }, [nodeContextMenu])

  const handleDeleteClickHandler = useCallback(
    (e: MouseEvent) => {
      if (!nodeContextMenu) return
      handleNodeDelete(nodeContextMenu.node_id)
      setNodeContextMenu(null)
    },
    [handleNodeDelete, nodeContextMenu],
  )

  const handleClickOutsideNodeContextMenu = useCallback(
    (e: MouseEvent | TouchEvent | FocusEvent) => {
      if (e instanceof MouseEvent && e.button === 2) return
      if (nodeContextMenu) {
        setNodeContextMenu(null)
      }
    },
    [nodeContextMenu],
  )

  useOnClickOutside(nodeContextMenuRef, handleClickOutsideNodeContextMenu)

  useEffect(() => {
    if (nodeContextMenu) setPaneContextMenu(null)
  }, [nodeContextMenu])

  return (
    <>
      <MatrixFlowBaseContextMenu
        top={nodeContextMenu?.top}
        left={nodeContextMenu?.left}
        open={!!nodeContextMenu}
        ref={nodeContextMenuRef}
      >
        {canDeleteNode && (
          <div
            className='hover:bg-gray-100 dark:hover:bg-zinc-700 font-display px-2 py-1.5 rounded-lg cursor-pointer transition'
            onClick={handleDeleteClickHandler}
          >
            {t('node-contextmenu.delete-node')}
          </div>
        )}
      </MatrixFlowBaseContextMenu>
    </>
  )
})

NodeContextMenu.displayName = 'NodeContextMenu'

export default NodeContextMenu
