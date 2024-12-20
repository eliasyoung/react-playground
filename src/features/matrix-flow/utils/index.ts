import type { Node } from '@xyflow/react'

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
