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
  type OnConnect,
  type OnNodesChange,
  type OnEdgesChange,
  type OnNodeDrag,
  useReactFlow,
  Panel,
  type OnNodesDelete,
  type NodeTypes,
} from '@xyflow/react'
import '@xyflow/react/dist/style.css'

import { useTranslation } from 'react-i18next'
import { useEventListener } from 'usehooks-ts'
import useMatrixFlowStore from '@/features/matrix-flow/store'
import { useShallow } from 'zustand/react/shallow'
import { useMatrixFlow } from '@/features/matrix-flow/hooks/use-matrix-flow'
import { useShortcuts } from '@/features/matrix-flow/hooks/use-shortcuts'
import { useNodesInteraction } from '@/features/matrix-flow/hooks/use-nodes-interaction'
import { useTheme } from '@/features/theme-toggle/hooks'

import { isEnumMember } from '@/lib/utils'

import MatrixNode from '@/features/matrix-flow/components/node/node'
import NewArrivalNode from '@/features/matrix-flow/components/node/new-arrival-node'
import FlowRightDetailPanel from '@/features/matrix-flow/components/matrix-flow-container/flow-right-detail-panel'
import AddNodeMenu from '@/features/matrix-flow/components/matrix-flow-container/add-node-menu'
import NodeContextMenu from '@/features/matrix-flow/components/node/node-context-menu'
import FlowPaneContextMenu from '@/features/matrix-flow/components/matrix-flow-container/flow-pane-context-menu'
import { Button } from '@/components/ui/button'

import {
  type MatrixFlowItem,
  MatrixFlowNodeType,
} from '@/features/matrix-flow/types'
import { AnimatePresence } from 'motion/react'

type MatrixFlowContainerProps = {
  initFlowData: MatrixFlowItem
}

const MatrixFlowContainer = React.memo<MatrixFlowContainerProps>(
  ({ initFlowData }) => {
    const matrixflowContainerRef = useRef<HTMLDivElement>(null)

    const { theme } = useTheme()

    const {
      isAddingNode,
      setMousePosition,
      newArrivalNodeData,
      onSelectNodeId,
      setOnSelectNodeId,
      nodeContextMenu,
      setNodeContextMenu,
      paneContextMenu,
      setPaneContextMenu,
      addNodeMenu,
      setAddNodeMenu,
    } = useMatrixFlowStore(
      useShallow((state) => ({
        isAddingNode: state.isAddingNode,
        setIsAddingNode: state.setIsAddingNode,
        setMousePosition: state.setMousePosition,
        newArrivalNodeData: state.newArrivalNodeData,
        onSelectNodeId: state.onSelectNodeId,
        setOnSelectNodeId: state.setOnSelectNodeId,
        nodeContextMenu: state.nodeContextMenu,
        setNodeContextMenu: state.setNodeContextMenu,
        paneContextMenu: state.paneContextMenu,
        setPaneContextMenu: state.setPaneContextMenu,
        addNodeMenu: state.addNodeMenu,
        setAddNodeMenu: state.setAddNodeMenu,
      })),
    )

    const { handleSaveMatrixFlow, handleRunMatrixFlow } = useMatrixFlow()

    const flow = useReactFlow()

    const { t } = useTranslation('matrixFlow')

    const { handleNodeDelete } = useNodesInteraction()
    useShortcuts()

    const [nodes, setNodes] = useState(initFlowData.graph.nodes)
    const [edges, setEdges] = useState(initFlowData.graph.edges)

    const nodeTypes = useMemo(() => {
      const nodeTypeObject = Object.values(MatrixFlowNodeType).reduce(
        (acc, nodeType) => {
          acc[nodeType] = MatrixNode
          return acc
        },
        {} as NodeTypes,
      )

      return nodeTypeObject
    }, [])

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

    const onNodeDeleted = useCallback<OnNodesDelete>(
      (nodes) => {
        onSelectNodeId &&
          nodes.some((node) => node.id === onSelectNodeId) &&
          setOnSelectNodeId(null)
      },
      [onSelectNodeId],
    )

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
      <div
        className='size-full overflow-hidden relative'
        ref={matrixflowContainerRef}
      >
        {newArrivalNodeData && <NewArrivalNode />}
        <AddNodeMenu />
        <NodeContextMenu />
        <FlowPaneContextMenu />
        <ReactFlow
          nodeTypes={nodeTypes}
          nodes={nodes}
          edges={edges}
          onNodesDelete={onNodeDeleted}
          onNodesChange={onNodesChange}
          onNodeClick={(_e, node) => {
            if (nodeContextMenu) {
              setNodeContextMenu(null)
            }
            if (paneContextMenu) {
              setPaneContextMenu(null)
            }
            if (addNodeMenu) {
              setAddNodeMenu(null)
            }
            if (onSelectNodeId && onSelectNodeId === node.id) return
            if (onSelectNodeId) {
              setOnSelectNodeId(null)
              setTimeout(() => {
                setOnSelectNodeId(node.id)
              }, 150)
            } else {
              setOnSelectNodeId(node.id)
            }
          }}
          onPaneClick={(e) => {
            if (onSelectNodeId) {
              setOnSelectNodeId(null)
            }
            if (nodeContextMenu) {
              setNodeContextMenu(null)
            }
            if (paneContextMenu) {
              setPaneContextMenu(null)
            }
            if (addNodeMenu) {
              setAddNodeMenu(null)
            }
          }}
          onEdgeContextMenu={(e) => {
            if (nodeContextMenu) {
              setNodeContextMenu(null)
            }
            if (paneContextMenu) {
              setPaneContextMenu(null)
            }
          }}
          onEdgesChange={onEdgesChange}
          onNodeDragStop={onNodesDragEnd}
          onConnect={onConnect}
          colorMode={theme}
          deleteKeyCode={null}
          defaultViewport={initFlowData.graph.viewport}
          onPaneContextMenu={(e) => {
            e.preventDefault()

            setPaneContextMenu(
              paneContextMenu
                ? null
                : {
                    top: e.clientY,
                    left: e.clientX,
                  },
            )
          }}
          onNodeContextMenu={(e, node) => {
            e.preventDefault()

            const nodeType = node.type

            if (nodeType && isEnumMember(nodeType, MatrixFlowNodeType)) {
              const contextedNode = {
                node_id: node.id,
                node_type: nodeType,
                top: e.clientY,
                left: e.clientX,
              }

              if (nodeContextMenu) {
                setNodeContextMenu(null)
                setTimeout(() => {
                  setNodeContextMenu(contextedNode)
                }, 150)
              } else setNodeContextMenu(contextedNode)
            }
          }}
        >
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
              <Button
                variant={'outline'}
                onClick={() => console.log(onSelectNodeId)}
              >
                {t('control-panel.publish')}
              </Button>
            </div>
          </Panel>
          <Controls />
          <MiniMap />
          <FlowRightDetailPanel />
          <Background variant={BackgroundVariant.Dots} gap={12} size={1} />
        </ReactFlow>
      </div>
    )
  },
)

MatrixFlowContainer.displayName = 'MatrixFlowContainer'

export default MatrixFlowContainer
