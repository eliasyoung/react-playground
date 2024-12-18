import { create } from 'zustand'

type MousePosition = {
  pageX: number
  pageY: number
  elementX: number
  elementY: number
}

interface MatrixFlowState {
  mousePosition: MousePosition
  setMousePosition: (position: MousePosition) => void
  isAddingNode: boolean
  setIsAddingNode: (isAdding: boolean) => void
}

const useMatrixFlowStore = create<MatrixFlowState>()((set) => ({
  mousePosition: { pageX: 0, pageY: 0, elementX: 0, elementY: 0 },
  setMousePosition: (position) =>
    set((_state) => ({ mousePosition: position })),
  isAddingNode: false,
  setIsAddingNode: (isAdding) => set((_state) => ({ isAddingNode: isAdding })),
}))

export default useMatrixFlowStore
