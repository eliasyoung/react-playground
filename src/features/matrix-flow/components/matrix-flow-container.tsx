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
  type OnConnect,
  type OnNodesChange,
  type OnEdgesChange,
  type OnNodeDrag,
  useReactFlow,
  Panel,
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
import type { MatrixFlowItem } from '../types'

type MatrixFlowContainerProps = {
  initFlowData: MatrixFlowItem
}

const MatrixFlowContainer = React.memo<MatrixFlowContainerProps>(
  ({ initFlowData }) => {
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

    const { handleSaveMatrixFlow, handleRunMatrixFlow } = useMatrixFlow()

    const flow = useReactFlow()

    const { t } = useTranslation('matrixFlow')

    const { handleNodeDelete } = useNodesInteraction()

    const [nodes, setNodes] = useState(initFlowData.graph.nodes)
    const [edges, setEdges] = useState(initFlowData.graph.edges)

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
            defaultViewport={initFlowData.graph.viewport}
            onContextMenu={(e) => {
              if (
                e.target instanceof Element &&
                !e.target.closest('div.react-flow__pane.draggable')
              ) {
                e.preventDefault()
              }
            }}
          >
            {' '}
            ``
            <Panel position='top-left'>
              <div>
                <h1 className='text-xl text-primary font-display font-semibold'>
                  {initFlowData.name}
                </h1>
              </div>
            </Panel>
            <Panel position='top-right'>
              <div className='flex flex-row gap-2'>
                <Button
                  variant={'outline'}
                  onClick={() => handleRunMatrixFlow(initFlowData.id)}
                >
                  {t('control-panel.run')}
                </Button>
                <Button
                  variant={'outline'}
                  onClick={() => handleSaveMatrixFlow(initFlowData.id)}
                  disabled={isAddingNode}
                >
                  {t('control-panel.save')}
                </Button>
                <Button variant={'outline'}>
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
  },
)

MatrixFlowContainer.displayName = 'MatrixFlowContainer'

export default MatrixFlowContainer
