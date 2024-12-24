import type { Node, Edge, Viewport, ReactFlowJsonObject } from '@xyflow/react'

export const generateNode = (node_id?: string) => {
  const id = node_id ?? `${Date.now()}`

  const node: Node = {
    id,
    position: { x: 0, y: 0 },
    type: 'testNode',
    data: { id, myData: 'something' },
  }

  return node
}

export const generateFlowTemplate = () => {
  const now = Date.now()
  const startNodeId = `${now}`
  const endNodeId = `${now + 1}`

  const nodes: Node[] = [
    {
      id: startNodeId,
      type: 'testNode',
      position: { x: 200, y: 200 },
      data: { label: startNodeId },
    },
    {
      id: endNodeId,
      type: 'testNode',
      position: { x: 600, y: 200 },
      data: { label: endNodeId },
    },
  ]
  const edges: Edge[] = [
    {
      id: `${startNodeId}-${endNodeId}`,
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
