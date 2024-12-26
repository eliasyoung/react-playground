import React, { type MouseEvent } from 'react'

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
import { useTranslation } from 'react-i18next'
import { useNodesInteraction } from '@/features/matrix-flow/hooks/use-nodes-interaction'

const FlowContextMenu = React.memo(
  ({ children }: { children?: React.ReactNode }) => {
    const { t } = useTranslation('matrixFlow')

    const { handleNodeAddWithPanelContextClick } = useNodesInteraction()

    const handleAddNodeClick = (e: MouseEvent) => {
      e.stopPropagation()
      handleNodeAddWithPanelContextClick()
    }

    return (
      <ContextMenu>
        <ContextMenuTrigger>{children && children}</ContextMenuTrigger>
        <ContextMenuContent className='w-64'>
          <ContextMenuItem inset onClick={handleAddNodeClick}>
            {t('flow-contextmenu.add-node')}
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
          </ContextMenuItem>
          <ContextMenuSub>
            <ContextMenuSubTrigger inset>More Tools</ContextMenuSubTrigger>
            <ContextMenuSubContent className='w-48'>
              <ContextMenuItem>
                Save Page As...
                <ContextMenuShortcut>⇧⌘S</ContextMenuShortcut>
              </ContextMenuItem>
              <ContextMenuItem>Create Shortcut...</ContextMenuItem>
              <ContextMenuItem>Name Window...</ContextMenuItem>
              <ContextMenuSeparator />
              <ContextMenuItem>Developer Tools</ContextMenuItem>
            </ContextMenuSubContent>
          </ContextMenuSub>
          <ContextMenuSeparator />
          <ContextMenuCheckboxItem checked>
            Show Bookmarks Bar
            <ContextMenuShortcut>⌘⇧B</ContextMenuShortcut>
          </ContextMenuCheckboxItem>
          <ContextMenuCheckboxItem>Show Full URLs</ContextMenuCheckboxItem>
          <ContextMenuSeparator />
          <ContextMenuRadioGroup value='pedro'>
            <ContextMenuLabel inset>People</ContextMenuLabel>
            <ContextMenuSeparator />
            <ContextMenuRadioItem value='pedro'>
              Pedro Duarte
            </ContextMenuRadioItem>
            <ContextMenuRadioItem value='colm'>Colm Tuite</ContextMenuRadioItem>
          </ContextMenuRadioGroup> */}
        </ContextMenuContent>
      </ContextMenu>
    )
  },
)

FlowContextMenu.displayName = 'FlowContextMenu'

export default FlowContextMenu
