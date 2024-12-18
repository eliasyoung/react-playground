import type { Node } from '@xyflow/react'

export const generateNode = () => {
  const id = Date.now().toString()

  const node: Node = {
    id,
    position: { x: 0, y: 0 },
    type: 'testNode',
    data: { label: id, myData: 'something' },
  }

  return node
}
