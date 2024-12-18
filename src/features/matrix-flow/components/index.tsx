import React, { useCallback, useMemo, useRef, useState } from 'react'
import {
  ReactFlow,
  MiniMap,
  Controls,
  Background,
  addEdge,
  applyEdgeChanges,
  applyNodeChanges,
  BackgroundVariant,
  type Node,
  type Edge,
  type OnConnect,
  type OnNodesChange,
  type OnEdgesChange,
  type OnNodeDrag,
  useReactFlow,
  Panel,
  getConnectedEdges,
  type OnNodesDelete,
} from '@xyflow/react'
import '@xyflow/react/dist/style.css'
import { useEventListener, useDebounceCallback } from 'usehooks-ts'
import { useTheme } from '@/features/theme-toggle/hooks'
import BaseNode from './base/node'
import FlowContextMenu from './base/flow-context-menu'
import { Button } from '@/components/ui/button'
import { useNodeInteraction } from '../hooks/use-node-interaction'
import useMatrixFlowStore from '../store'
import { useShallow } from 'zustand/react/shallow'
import { useMatrixFlow } from '../hooks/use-matrix-flow'
import NewNode from './new-node'

const initialNodes: Node[] = [
  { id: '1', type: 'testNode', position: { x: 0, y: 0 }, data: { label: '1' } },
  {
    id: '2',
    position: { x: 0, y: 100 },
    type: 'testNode',
    data: { label: '2', myData: 'something' },
  },
  {
    id: '3',
    position: { x: 0, y: 200 },
    type: 'testNode',
    data: { label: '3', myData: 'something' },
  },
  {
    id: '4',
    position: { x: 0, y: 300 },
    type: 'testNode',
    data: { label: '4', myData: 'something' },
  },
]
const initialEdges: Edge[] = [{ id: 'e1-2', source: '1', target: '2' }]

const MatrixFlowContainer = React.memo(() => {
  const matrixflowContainerRef = useRef<HTMLDivElement>(null)

  const { theme } = useTheme()

  const { isAddingNode, setIsAddingNode, setMousePosition } =
    useMatrixFlowStore(
      useShallow((state) => ({
        isAddingNode: state.isAddingNode,
        setIsAddingNode: state.setIsAddingNode,
        setMousePosition: state.setMousePosition,
      })),
    )

  const { handleNodeAdd } = useMatrixFlow()

  const flow = useReactFlow()

  const { handleNodeDelete, getCurrentNodes } = useNodeInteraction()

  const [nodes, setNodes] = useState(initialNodes)
  const [edges, setEdges] = useState(initialEdges)

  const nodeTypes = useMemo(() => ({ testNode: BaseNode }), [])

  const onNodesChange: OnNodesChange = useCallback(
    (changes) => setNodes((nds) => applyNodeChanges(changes, nds)),
    [],
  )
  const onEdgesChange: OnEdgesChange = useCallback(
    (changes) => setEdges((eds) => applyEdgeChanges(changes, eds)),
    [],
  )

  const onConnect: OnConnect = useCallback(
    (params) => setEdges((eds) => addEdge(params, eds)),
    [],
  )

  const onNodesDragEnd = useCallback<OnNodeDrag>(
    (e, node) => {
      console.log(flow.toObject())
    },
    [flow],
  )

  const onNodeDeleted = useCallback<OnNodesDelete>((nodes) => {
    console.log(nodes)
    handleNodeDelete('123')
  }, [])

  const onAddNode = useCallback(() => {
    handleNodeAdd()
  }, [handleNodeAdd])

  // Nodes interaction
  const handleNodesDelete = useCallback(() => {
    const { getNodes, getEdges } = flow
    const nodes = getNodes()
    const edges = getEdges()

    if (edges.some((e) => e.selected)) {
      console.log('edges selected')
      return
    }

    const selectedNode = nodes.find((n) => n.selected)
    if (selectedNode) {
      const connectedEdges = getConnectedEdges([selectedNode], edges)
      setEdges((prev) =>
        [...prev].filter(
          (edge) => !connectedEdges.find((e) => e.id === edge.id),
        ),
      )
      setNodes((prev) =>
        [...prev].filter((node) => node.id !== selectedNode.id),
      )
    }
  }, [flow])

  useEventListener(
    'mousemove',
    (e) => {
      const containerClientRect =
        matrixflowContainerRef.current?.getBoundingClientRect()

      if (containerClientRect) {
        setMousePosition({
          pageX: e.clientX,
          pageY: e.clientY,
          elementX: e.clientX - containerClientRect.left,
          elementY: e.clientY - containerClientRect.top,
        })
      }
    },
    matrixflowContainerRef,
  )

  return (
    <div className='size-full' ref={matrixflowContainerRef}>
      <NewNode />
      <FlowContextMenu>
        <ReactFlow
          nodeTypes={nodeTypes}
          nodes={nodes}
          edges={edges}
          onNodesDelete={onNodeDeleted}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onNodeDragStop={onNodesDragEnd}
          onConnect={onConnect}
          colorMode={theme}
          onContextMenu={(e) => {
            if (
              e.target instanceof Element &&
              !e.target.closest('div.react-flow__pane.draggable')
            ) {
              e.preventDefault()
            }
          }}
        >
          <Panel position='top-left'>
            <div className='flex flex-row gap-2'>
              <Button variant={'outline'} onClick={handleNodesDelete}>
                Publish
              </Button>
              <Button
                variant={'outline'}
                onClick={() => setIsAddingNode(!isAddingNode)}
              >
                Save
              </Button>
              <Button
                variant={'outline'}
                disabled={isAddingNode}
                onClick={() => getCurrentNodes()}
              >
                Back
              </Button>
            </div>
          </Panel>
          <Panel position='top-right'>
            <div className='flex flex-row gap-2'>
              <Button variant={'outline'} onClick={() => onAddNode()}>
                Add Node
              </Button>
            </div>
          </Panel>
          <Controls />
          <MiniMap />
          <Background variant={BackgroundVariant.Dots} gap={12} size={1} />
        </ReactFlow>
      </FlowContextMenu>
    </div>
  )
})

MatrixFlowContainer.displayName = 'MatrixFlowContainer'

export default MatrixFlowContainer
