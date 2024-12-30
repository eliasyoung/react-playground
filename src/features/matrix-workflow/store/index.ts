import { create } from 'zustand'

import type {
  MousePosition,
  NewArrivalNodeData,
  PaneContextMenuData,
  NodeContextMenuData,
  AddNodeMenuData,
} from '../types'

interface MatrixWorkflowState {
  mousePosition: MousePosition
  setMousePosition: (position: MousePosition) => void
  newArrivalNodeData: NewArrivalNodeData | null
  setNewArrivalNodeData: (node: NewArrivalNodeData | null) => void
  isAddingNode: boolean
  setIsAddingNode: (isAdding: boolean) => void
  onSelectNodeId: string | null
  setOnSelectNodeId: (nodeId: string | null) => void
  paneContextMenu: PaneContextMenuData | null
  setPaneContextMenu: (data: PaneContextMenuData | null) => void
  nodeContextMenu: NodeContextMenuData | null
  setNodeContextMenu: (data: NodeContextMenuData | null) => void
  addNodeMenu: AddNodeMenuData | null
  setAddNodeMenu: (data: AddNodeMenuData | null) => void
}

const useMatrixWorkflowStore = create<MatrixWorkflowState>()((set) => ({
  mousePosition: { pageX: 0, pageY: 0, elementX: 0, elementY: 0 },
  setMousePosition: (position) =>
    set((_state) => ({ mousePosition: position })),
  newArrivalNodeData: null,
  setNewArrivalNodeData: (node) =>
    set((_state) => ({ newArrivalNodeData: node })),
  isAddingNode: false,
  setIsAddingNode: (isAdding) => set((_state) => ({ isAddingNode: isAdding })),
  onSelectNodeId: null,
  setOnSelectNodeId: (nodeId) => set((_state) => ({ onSelectNodeId: nodeId })),
  paneContextMenu: null,
  setPaneContextMenu: (data) => set((_state) => ({ paneContextMenu: data })),
  nodeContextMenu: null,
  setNodeContextMenu: (data) => set((_state) => ({ nodeContextMenu: data })),
  addNodeMenu: null,
  setAddNodeMenu: (data) => set((_state) => ({ addNodeMenu: data })),
}))

export default useMatrixWorkflowStore
