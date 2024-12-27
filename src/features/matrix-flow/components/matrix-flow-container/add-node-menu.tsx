import React, { useCallback, useMemo, useRef } from 'react'
import MatrixFlowBaseContextMenu from '@/features/matrix-flow/components/base/base-context-menu'
import { useShallow } from 'zustand/react/shallow'
import useMatrixFlowStore from '@features/matrix-flow/store'
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
import { useNodesInteraction } from '@/features/matrix-flow/hooks/use-nodes-interaction'
import { MatrixFlowNodeType } from '../../types'
import { useTranslation } from 'react-i18next'
import { isEnumMember } from '@/lib/utils'

type NodeOptionListItem = {
  label: string
  value: MatrixFlowNodeType
}

const AddNodeMenu = React.memo(() => {
  const addNodeMenuRef = useRef<HTMLDivElement>(null)

  const { t } = useTranslation('matrixFlow')

  const { handleNodeAddWithPanelContextClick } = useNodesInteraction()

  const { addNodeMenu, setAddNodeMenu } = useMatrixFlowStore(
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
    const nodeList = Object.values(MatrixFlowNodeType).reduce(
      (acc, nodeType) => {
        if (
          nodeType !== MatrixFlowNodeType.Start &&
          nodeType !== MatrixFlowNodeType.End
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
    <MatrixFlowBaseContextMenu
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
                  if (isEnumMember(value, MatrixFlowNodeType)) {
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
    </MatrixFlowBaseContextMenu>
  )
})

AddNodeMenu.displayName = 'AddNodeMenu'

export default AddNodeMenu
