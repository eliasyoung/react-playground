import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react'
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
import { useEventListener } from 'usehooks-ts'
import { useTheme } from '@/features/theme-toggle/hooks'
import MatrixNode from './node/node'
import FlowContextMenu from './flow-context-menu'
import { Button } from '@/components/ui/button'
import { useNodesInteraction } from '@/features/matrix-flow/hooks/use-nodes-interaction'
import useMatrixFlowStore from '../store'
import { useShallow } from 'zustand/react/shallow'
import { useMatrixFlow } from '../hooks/use-matrix-flow'
import NewArrivalNode from '@/features/matrix-flow/components/node/new-arrival-node'
import { useTranslation } from 'react-i18next'
import { getHelloWorld } from '../servies'

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

  const { isAddingNode, setMousePosition, newArrivalNodeData } =
    useMatrixFlowStore(
      useShallow((state) => ({
        isAddingNode: state.isAddingNode,
        setIsAddingNode: state.setIsAddingNode,
        setMousePosition: state.setMousePosition,
        newArrivalNodeData: state.newArrivalNodeData,
      })),
    )

  const { handleSaveMatrixFlow } = useMatrixFlow()

  const flow = useReactFlow()

  const { t } = useTranslation('matrixFlow')

  const { handleNodeDelete, getCurrentNodes } = useNodesInteraction()

  const [nodes, setNodes] = useState(initialNodes)
  const [edges, setEdges] = useState(initialEdges)

  const nodeTypes = useMemo(() => ({ testNode: MatrixNode }), [])

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
      console.log('drag end.')
    },
    [flow],
  )

  const onNodeDeleted = useCallback<OnNodesDelete>((nodes) => {
    console.log(nodes)
    handleNodeDelete('123')
  }, [])

  // Nodes interaction
  const handleNodesDelete = useCallback(() => {
    const edges = flow.getEdges()

    if (edges.some((e) => e.selected)) {
      return
    }

    const selectedNode = nodes.find((n) => n.selected)
    if (selectedNode) {
      flow.deleteElements({ nodes: [selectedNode] })
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

  useEffect(() => {
    getHelloWorld().then((res) => console.log(res))
  }, [])

  return (
    <div className='size-full overflow-hidden' ref={matrixflowContainerRef}>
      {newArrivalNodeData && <NewArrivalNode />}
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
          deleteKeyCode={null}
          onContextMenu={(e) => {
            if (
              e.target instanceof Element &&
              !e.target.closest('div.react-flow__pane.draggable')
            ) {
              e.preventDefault()
            }
          }}
        >
          <Panel position='top-right'>
            <div className='flex flex-row gap-2'>
              <Button
                variant={'outline'}
                onClick={handleSaveMatrixFlow}
                disabled={isAddingNode}
              >
                {t('control-panel.save')}
              </Button>
              <Button variant={'outline'} onClick={handleNodesDelete}>
                {t('control-panel.publish')}
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