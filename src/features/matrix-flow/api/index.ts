import type { JSONResponse } from '@/types'
import type { MatrixFlowItem, MatrixFlowListItem } from '../types'

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
  }).then((res) => res.json()) as JSONResponse<MatrixFlowItem>
}

export const postCreateFlow = async (
  flow: Omit<MatrixFlowItem, 'created_at' | 'updated_at' | 'id'>,
) => {
  return fetch('http://127.0.0.1:8000/matrix_flow/create', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(flow),
  }).then((res) => res.json()) as JSONResponse<MatrixFlowItem>
}

export const getFlowList = async () => {
  return fetch('http://127.0.0.1:8000/matrix_flow/flow_list').then((res) =>
    res.json(),
  ) as JSONResponse<MatrixFlowListItem[]>
}

export const getMatrixFlowDetail = async (flow_id: string) => {
  return fetch(`http://127.0.0.1:8000/matrix_flow/${flow_id}/detail`).then(
    (res) => res.json(),
  ) as JSONResponse<MatrixFlowItem>
}

export const postRunFlow = async (flow_id: string) => {
  return fetch(`http://127.0.0.1:8000/matrix_flow/${flow_id}/run`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
  }).then((res) => res.json())
}
