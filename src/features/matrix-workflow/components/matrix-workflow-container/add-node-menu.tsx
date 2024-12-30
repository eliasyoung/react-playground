import React, { useCallback, useMemo, useRef } from 'react'
import MatrixWorkflowBaseContextMenu from '@/features/matrix-workflow/components/base/base-context-menu'
import { useShallow } from 'zustand/react/shallow'
import useMatrixWorkflowStore from '@features/matrix-workflow/store'
import { useOnClickOutside } from 'usehooks-ts'
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from '@/components/ui/command'
import { useNodesInteraction } from '@/features/matrix-workflow/hooks/use-nodes-interaction'
import { MatrixWorkflowNodeType } from '@/features/matrix-workflow/types'
import { useTranslation } from 'react-i18next'
import { isEnumMember } from '@/lib/utils'

type NodeOptionListItem = {
  label: string
  value: MatrixWorkflowNodeType
}

const AddNodeMenu = React.memo(() => {
  const addNodeMenuRef = useRef<HTMLDivElement>(null)

  const { t } = useTranslation('matrix_workflow')

  const { handleNodeAddWithPanelContextClick } = useNodesInteraction()

  const { addNodeMenu, setAddNodeMenu } = useMatrixWorkflowStore(
    useShallow((state) => ({
      addNodeMenu: state.addNodeMenu,
      setAddNodeMenu: state.setAddNodeMenu,
    })),
  )

  const handleClickOutsidePaneContextMenu = useCallback(
    (e: MouseEvent | TouchEvent | FocusEvent) => {
      if (addNodeMenu) {
        setAddNodeMenu(null)
      }
    },
    [addNodeMenu],
  )

  useOnClickOutside(addNodeMenuRef, handleClickOutsidePaneContextMenu)

  const nodeOptionsList = useMemo(() => {
    const nodeList = Object.values(MatrixWorkflowNodeType).reduce(
      (acc, nodeType) => {
        if (
          nodeType !== MatrixWorkflowNodeType.Start &&
          nodeType !== MatrixWorkflowNodeType.End
        ) {
          acc.push({
            label: t(`node.node-type.${nodeType}`),
            value: nodeType,
          })
        }
        return acc
      },
      [] as NodeOptionListItem[],
    )

    return nodeList
  }, [t])

  return (
    <MatrixWorkflowBaseContextMenu
      top={addNodeMenu?.top}
      left={addNodeMenu?.left}
      open={!!addNodeMenu}
      ref={addNodeMenuRef}
      className='p-0 w-[250px]'
    >
      <Command>
        <CommandInput
          placeholder={t('add-node-menu.search-input-placeholder')}
        />
        <CommandList>
          <CommandEmpty>{t('add-node-menu.search-no-result')}</CommandEmpty>
          <CommandGroup>
            {nodeOptionsList.map((nodeOption) => (
              <CommandItem
                key={nodeOption.value}
                value={nodeOption.value}
                keywords={[nodeOption.label]}
                onSelect={(value) => {
                  if (isEnumMember(value, MatrixWorkflowNodeType)) {
                    handleNodeAddWithPanelContextClick(value)
                    setAddNodeMenu(null)
                  }
                }}
              >
                {nodeOption.label}
              </CommandItem>
            ))}
          </CommandGroup>
        </CommandList>
      </Command>
    </MatrixWorkflowBaseContextMenu>
  )
})

AddNodeMenu.displayName = 'AddNodeMenu'

export default AddNodeMenu
