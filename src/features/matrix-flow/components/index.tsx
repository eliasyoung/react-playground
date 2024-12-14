import React, { useCallback } from 'react'
import {
  ReactFlow,
  MiniMap,
  Controls,
  Background,
  useNodesState,
  useEdgesState,
  addEdge,
  type Node,
  type Edge,
  type OnConnect,
  BackgroundVariant,
} from '@xyflow/react'
import '@xyflow/react/dist/style.css'
import { useTheme } from '@/features/theme-toggle/hooks'

const initialNodes: Node[] = [
  { id: '1', position: { x: 0, y: 0 }, data: { label: '1' } },
  { id: '2', position: { x: 0, y: 100 }, data: { label: '2' } },
]
const initialEdges: Edge[] = [{ id: 'e1-2', source: '1', target: '2' }]

const MatrixFlowContainer = React.memo(() => {
  const { theme } = useTheme()

  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes)
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges)

  const onConnect: OnConnect = useCallback(
    (params) => setEdges((eds) => addEdge(params, eds)),
    [setEdges],
  )

  return (
    <div className='w-full pt-4 flex flex-col items-center gap-y-8'>
      <h1 className='font-display text-3xl font-semibold'>
        Matrix Flow Container
      </h1>
      <div className='w-full h-screen border border-dashed border-gray-300 dark:border-zinc-700'>
        <ReactFlow
          nodes={initialNodes}
          edges={initialEdges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          colorMode={theme}
        >
          <Controls />
          <MiniMap />
          <Background variant={BackgroundVariant.Dots} gap={12} size={1} />
        </ReactFlow>
      </div>
    </div>
  )
})

MatrixFlowContainer.displayName = 'MatrixFlowContainer'

export default MatrixFlowContainer
