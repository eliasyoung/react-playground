import React from 'react'

import { Handle, Position, type NodeProps } from '@xyflow/react'

import NodeContextMenu from './node-context-menu'
import BaseNode from '../base/base-node'

const MatrixNode = React.memo<NodeProps>(({ id, data, selected }) => {
  return (
    <>
      <NodeContextMenu id={id}>
        <BaseNode id={id} data={data} selected={selected} />
      </NodeContextMenu>
      <Handle type='target' position={Position.Left} className='p-1' />
      <Handle type='source' position={Position.Right} className='p-1' />
    </>
  )
})

MatrixNode.displayName = 'MatrixNode'

export default MatrixNode
