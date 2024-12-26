import React, { useMemo } from 'react'

import {
  ContextMenu,
  ContextMenuCheckboxItem,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuLabel,
  ContextMenuRadioGroup,
  ContextMenuRadioItem,
  ContextMenuSeparator,
  ContextMenuShortcut,
  ContextMenuSub,
  ContextMenuSubContent,
  ContextMenuSubTrigger,
  ContextMenuTrigger,
} from '@/components/ui/context-menu'
import { useNodesInteraction } from '../../hooks/use-nodes-interaction'
import { useTranslation } from 'react-i18next'
import { MatrixFlowNodeType } from '../../types'

const NodeContextMenu = React.memo(
  ({
    children,
    id,
    type,
  }: { children?: React.ReactNode; id: string; type: string }) => {
    const { t } = useTranslation('matrixFlow')

    const { handleNodeDelete } = useNodesInteraction()

    const canDeleteNode = useMemo(() => {
      return (
        type !== MatrixFlowNodeType.Start && type !== MatrixFlowNodeType.End
      )
    }, [type])

    return (
      <ContextMenu>
        <ContextMenuTrigger>{children && children}</ContextMenuTrigger>
        <ContextMenuContent className='w-64'>
          {canDeleteNode && (
            <ContextMenuItem
              inset
              onClick={(e) => {
                e.stopPropagation()
                handleNodeDelete(id)
              }}
            >
              {t('node-contextmenu.delete-node')}
            </ContextMenuItem>
          )}
          {/* <ContextMenuItem inset>
            Back
            <ContextMenuShortcut>⌘[</ContextMenuShortcut>
          </ContextMenuItem>
          <ContextMenuItem inset disabled>
            Forward
            <ContextMenuShortcut>⌘]</ContextMenuShortcut>
          </ContextMenuItem>
          <ContextMenuItem inset>
            Reload
            <ContextMenuShortcut>⌘R</ContextMenuShortcut>
          </ContextMenuItem> */}
        </ContextMenuContent>
      </ContextMenu>
    )
  },
)

NodeContextMenu.displayName = 'NodeContextMenu'

export default NodeContextMenu
