import React from 'react'

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

const NodeContextMenu = React.memo(
  ({ children, id }: { children?: React.ReactNode; id: string }) => {
    const { t } = useTranslation('matrixFlow')

    const { handleNodeDelete } = useNodesInteraction()

    return (
      <ContextMenu>
        <ContextMenuTrigger>{children && children}</ContextMenuTrigger>
        <ContextMenuContent className='w-64'>
          <ContextMenuItem inset onClick={() => handleNodeDelete(id)}>
            {t('node-contextmenu.delete-node')}
          </ContextMenuItem>
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
