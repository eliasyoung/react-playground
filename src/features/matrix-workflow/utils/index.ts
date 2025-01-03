import type { Node, Edge, Viewport, ReactFlowJsonObject } from '@xyflow/react'
import { MatrixWorkflowNodeType } from '../types'

export const generateNode = (
  node_type: MatrixWorkflowNodeType,
  node_id?: string,
) => {
  const id = node_id ?? `${Date.now()}`

  const node: Node = {
    id,
    position: { x: 0, y: 0 },
    type: node_type,
    data: { id },
  }

  return node
}

export const generateWorkflowTemplate = () => {
  const now = Date.now()
  const startNodeId = `${now}`
  const endNodeId = `${now + 1}`

  const nodes: Node[] = [
    {
      id: startNodeId,
      type: MatrixWorkflowNodeType.Start,
      position: { x: 200, y: 200 },
      data: { id: startNodeId },
    },
    {
      id: endNodeId,
      type: MatrixWorkflowNodeType.End,
      position: { x: 600, y: 200 },
      data: { id: endNodeId },
    },
  ]
  const edges: Edge[] = [
    {
      id: `xy-edge_${startNodeId}-${endNodeId}`,
      source: startNodeId,
      target: endNodeId,
    },
  ]
  const viewport: Viewport = {
    x: 0,
    y: 0,
    zoom: 1,
  }
  return {
    nodes,
    edges,
    viewport,
  }
}

export const isEventTargetInputArea = (target: HTMLElement) => {
  if (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA') return true

  if (target.contentEditable === 'true') return true
}
