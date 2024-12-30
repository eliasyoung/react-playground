import type { ReactFlowJsonObject } from '@xyflow/react'

export type MousePosition = {
  pageX: number
  pageY: number
  elementX: number
  elementY: number
}

export type NewArrivalNodeData = {
  id: string
  data: Record<string, unknown>
  type: MatrixWorkflowNodeType
}

export type MatrixWorkflowListItem = {
  id: string
  name: string
  description: string | null
  created_at: string
  updated_at: string
}

export type MatrixWorkflowGraphData = {
  graph: ReactFlowJsonObject
}

export type MatrixWorkflowItem = MatrixWorkflowListItem &
  MatrixWorkflowGraphData

export enum MatrixWorkflowNodeType {
  Start = 'start',
  /* For test */
  Test = 'test',
  InputField = 'input-field',
  Add = 'add',
  Minus = 'minus',
  Multiply = 'multiply',
  Divide = 'divide',
  /* */
  End = 'end',
}

export type PaneContextMenuData = {
  top: number
  left: number
}

export type NodeContextMenuData = {
  node_id: string
  node_type: MatrixWorkflowNodeType
  top: number
  left: number
}

export type AddNodeMenuData = {
  top: number
  left: number
}
