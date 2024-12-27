import React, { useCallback, useMemo, useRef } from 'react'

import { useShallow } from 'zustand/react/shallow'
import { useEventListener, useResizeObserver, useWindowSize } from 'usehooks-ts'
import { useReactFlow } from '@xyflow/react'
import { produce } from 'immer'

import useMatrixFlowStore from '@/features/matrix-flow/store'

import BaseNode from '@/features/matrix-flow/components/base/base-node'

const NewArrivalNode = React.memo(() => {
  const flow = useReactFlow()

  const { width: windowWidth = 0, height: windowHeight = 0 } = useWindowSize()

  const newArrivalNodeRef = useRef<HTMLDivElement>(null)

  const { width = 0, height = 0 } = useResizeObserver({
    ref: newArrivalNodeRef,
    box: 'content-box',
  })

  const {
    mousePosition,
    setIsAddingNode,
    newArrivalNodeData,
    setNewArrivalNodeData,
  } = useMatrixFlowStore(
    useShallow((state) => ({
      mousePosition: state.mousePosition,
      isAddingNode: state.isAddingNode,
      setIsAddingNode: state.setIsAddingNode,
      newArrivalNodeData: state.newArrivalNodeData,
      setNewArrivalNodeData: state.setNewArrivalNodeData,
    })),
  )

  const style = useMemo(() => {
    const zoom = flow.getViewport().zoom

    const top =
      mousePosition.elementY + height * zoom > windowHeight - 72
        ? windowHeight - 72 - height * zoom
        : mousePosition.elementY

    const left =
      mousePosition.elementX + width * zoom > windowWidth
        ? windowWidth - width * zoom
        : mousePosition.elementX

    return {
      top,
      left,
      transform: `scale(${zoom})`,
      transformOrigin: '0 0',
    }
  }, [flow, width, windowWidth, height, windowHeight, mousePosition])

  const onClickHandler = useCallback(
    (e: MouseEvent) => {
      if (newArrivalNodeData) {
        const nodes = flow.getNodes()
        const { x, y } = flow.screenToFlowPosition({
          x: mousePosition.pageX,
          y: mousePosition.pageY,
        })
        const { id, data, type } = newArrivalNodeData
        const newNodes = produce(nodes, (draft) => {
          draft.push({
            id,
            data: { ...data },
            type,
            position: {
              x,
              y,
            },
          })
        })
        flow.setNodes(newNodes)
        setIsAddingNode(false)
        setNewArrivalNodeData(null)
      }
    },
    [flow, mousePosition, newArrivalNodeData],
  )

  const onContextMenuHandler = useCallback(
    (e: MouseEvent) => {
      if (newArrivalNodeData) {
        e.preventDefault()
        setNewArrivalNodeData(null)
        setIsAddingNode(false)
      }
    },
    [newArrivalNodeData],
  )

  useEventListener('click', onClickHandler, undefined, {
    capture: true,
  })

  useEventListener('contextmenu', onContextMenuHandler)

  if (!newArrivalNodeData) return null

  return (
    <div className='absolute z-10' style={style} ref={newArrivalNodeRef}>
      <BaseNode {...newArrivalNodeData} />
    </div>
  )
})

NewArrivalNode.displayName = 'NewArrivalNode'

export default NewArrivalNode
