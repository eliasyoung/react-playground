import type { ReactFlowJsonObject } from '@xyflow/react'

export type NodeType = 'testNode'

export type MousePosition = {
  pageX: number
  pageY: number
  elementX: number
  elementY: number
}

export type NewArrivalNodeData = {
  id: string
  data: Record<string, unknown>
  type: NodeType
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
