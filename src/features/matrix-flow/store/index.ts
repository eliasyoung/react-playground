import { create } from 'zustand'

import type { MousePosition, NewArrivalNodeData } from '../types'

interface MatrixFlowState {
  mousePosition: MousePosition
  setMousePosition: (position: MousePosition) => void
  newArrivalNodeData: NewArrivalNodeData | null
  setNewArrivalNodeData: (node: NewArrivalNodeData | null) => void
  isAddingNode: boolean
  setIsAddingNode: (isAdding: boolean) => void
}

const useMatrixFlowStore = create<MatrixFlowState>()((set) => ({
  mousePosition: { pageX: 0, pageY: 0, elementX: 0, elementY: 0 },
  setMousePosition: (position) =>
    set((_state) => ({ mousePosition: position })),
  newArrivalNodeData: null,
  setNewArrivalNodeData: (node) =>
    set((_state) => ({ newArrivalNodeData: node })),
  isAddingNode: false,
  setIsAddingNode: (isAdding) => set((_state) => ({ isAddingNode: isAdding })),
}))

export default useMatrixFlowStore
