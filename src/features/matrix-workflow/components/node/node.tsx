import React from 'react'

import { Handle, Position, type NodeProps } from '@xyflow/react'

import NodeContextMenu from './node-context-menu'
import BaseNode from '../base/base-node'
import { MatrixWorkflowNodeType } from '../../types'

const MatrixNode = React.memo<NodeProps>(({ id, data, selected, type }) => {
  return (
    <>
      <BaseNode
        id={id}
        data={data}
        selected={selected}
        type={type as MatrixWorkflowNodeType}
      />
      {type !== MatrixWorkflowNodeType.Start && (
        <Handle type='target' position={Position.Left} className='p-1' />
      )}
      {type !== MatrixWorkflowNodeType.End && (
        <Handle type='source' position={Position.Right} className='p-1' />
      )}
    </>
  )
})

MatrixNode.displayName = 'MatrixNode'

export default MatrixNode
