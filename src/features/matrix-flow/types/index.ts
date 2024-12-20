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
