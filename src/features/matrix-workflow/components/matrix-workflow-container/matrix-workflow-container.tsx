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
import useMatrixWorkflowStore from '@/features/matrix-workflow/store'
import { useShallow } from 'zustand/react/shallow'
import { useMatrixWorkflow } from '@/features/matrix-workflow/hooks/use-matrix-workflow'
import { useShortcuts } from '@/features/matrix-workflow/hooks/use-shortcuts'
import { useNodesInteraction } from '@/features/matrix-workflow/hooks/use-nodes-interaction'
import { useTheme } from '@/features/theme-toggle/hooks'

import { isEnumMember } from '@/lib/utils'

import MatrixNode from '@/features/matrix-workflow/components/node/node'
import NewArrivalNode from '@/features/matrix-workflow/components/node/new-arrival-node'
import WorkflowRightDetailPanel from '@/features/matrix-workflow/components/matrix-workflow-container/workflow-right-detail-panel'
import AddNodeMenu from '@/features/matrix-workflow/components/matrix-workflow-container/add-node-menu'
import NodeContextMenu from '@/features/matrix-workflow/components/node/node-context-menu'
import WorkflowPaneContextMenu from '@/features/matrix-workflow/components/matrix-workflow-container/workflow-pane-context-menu'
import { Button } from '@/components/ui/button'

import {
  type MatrixWorkflowItem,
  MatrixWorkflowNodeType,
} from '@/features/matrix-workflow/types'

type MatrixWorkflowContainerProps = {
  initWorkflowData: MatrixWorkflowItem
}

const MatrixWorkflowContainer = React.memo<MatrixWorkflowContainerProps>(
  ({ initWorkflowData }) => {
    const matrixWorkflowContainerRef = useRef<HTMLDivElement>(null)

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
    } = useMatrixWorkflowStore(
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

    const { handleSaveMatrixWorkflow, handleRunMatrixWorkflow } =
      useMatrixWorkflow()

    const flow = useReactFlow()

    const { t } = useTranslation('matrix_workflow')

    const { handleNodeDelete } = useNodesInteraction()
    useShortcuts()

    const [nodes, setNodes] = useState(initWorkflowData.graph.nodes)
    const [edges, setEdges] = useState(initWorkflowData.graph.edges)

    const nodeTypes = useMemo(() => {
      const nodeTypeObject = Object.values(MatrixWorkflowNodeType).reduce(
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
          matrixWorkflowContainerRef.current?.getBoundingClientRect()

        if (containerClientRect) {
          setMousePosition({
            pageX: e.clientX,
            pageY: e.clientY,
            elementX: e.clientX - containerClientRect.left,
            elementY: e.clientY - containerClientRect.top,
          })
        }
      },
      matrixWorkflowContainerRef,
    )

    return (
      <div
        className='size-full overflow-hidden relative'
        ref={matrixWorkflowContainerRef}
      >
        {newArrivalNodeData && <NewArrivalNode />}
        <AddNodeMenu />
        <NodeContextMenu />
        <WorkflowPaneContextMenu />
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
          defaultViewport={initWorkflowData.graph.viewport}
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

            if (nodeType && isEnumMember(nodeType, MatrixWorkflowNodeType)) {
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
                {initWorkflowData.name}
              </h1>
            </div>
          </Panel>
          <Panel position='top-right'>
            <div className='flex flex-row gap-2'>
              <Button
                variant={'outline'}
                onClick={() => handleRunMatrixWorkflow(initWorkflowData.id)}
              >
                {t('control-panel.run')}
              </Button>
              <Button
                variant={'outline'}
                onClick={() => handleSaveMatrixWorkflow(initWorkflowData.id)}
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
          <WorkflowRightDetailPanel />
          <Background variant={BackgroundVariant.Dots} gap={12} size={1} />
        </ReactFlow>
      </div>
    )
  },
)

MatrixWorkflowContainer.displayName = 'MatrixWorkflowContainer'

export default MatrixWorkflowContainer
