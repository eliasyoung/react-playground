import type { ReactFlowJsonObject } from '@xyflow/react'
import type { MatrixFlowItem, MatrixFlowListItem } from '../types'

export const getHelloWorld = async () => {
  return fetch('http://127.0.0.1:8000/').then((res) => res.json())
}

export const patchSaveFlow = async (
  id: string,
  flow: Partial<MatrixFlowItem>,
) => {
  return fetch(`http://127.0.0.1:8000/matrix_flow/${id}/save`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      ...flow,
    }),
  }).then((res) => res.json())
}

export const postCreateFlow = async (flow: ReactFlowJsonObject) => {
  return fetch('http://127.0.0.1:8000/matrix_flow/create', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(flow),
  }).then((res) => res.json())
}

export const getFlowList = async () => {
  return fetch('http://127.0.0.1:8000/matrix_flow/flow_list').then((res) =>
    res.json(),
  ) as Promise<MatrixFlowListItem[]>
}

export const getMatrixFlowDetail = async (flow_id: string) => {
  return fetch(`http://127.0.0.1:8000/matrix_flow/${flow_id}/detail`).then(
    (res) => res.json(),
  ) as Promise<MatrixFlowItem>
}
