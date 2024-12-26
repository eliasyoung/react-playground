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
  type: MatrixFlowNodeType
}

export type MatrixFlowListItem = {
  id: string
  name: string
  description: string | null
  created_at: string
  updated_at: string
}

export type MatrixFlowGraphData = {
  graph: ReactFlowJsonObject
}

export type MatrixFlowItem = MatrixFlowListItem & MatrixFlowGraphData

export enum MatrixFlowNodeType {
  Start = 'start',
  /* For test */
  Test = 'test',
  Input = 'input',
  Add = 'add',
  Minus = 'minus',
  Multiply = 'multiply',
  Divide = 'divide',
  /* */
  End = 'end',
}
