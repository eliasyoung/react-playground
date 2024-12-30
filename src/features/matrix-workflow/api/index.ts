import type { KyResponseWrapper } from '@/types'
import type { MatrixWorkflowItem, MatrixWorkflowListItem } from '../types'

import http from './http'

export const patchSaveWorkflow = async (
  id: string,
  workflow: Partial<MatrixWorkflowItem>,
) => {
  return http
    .patch<KyResponseWrapper<MatrixWorkflowItem>>(
      `matrix_workflow/${id}/save`,
      {
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...workflow,
        }),
      },
    )
    .json()
}

export const postCreateWorkflow = async (
  workflow: Omit<MatrixWorkflowItem, 'created_at' | 'updated_at' | 'id'>,
) => {
  return http
    .post<KyResponseWrapper<MatrixWorkflowItem>>('matrix_workflow/create', {
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(workflow),
    })
    .json()
}

export const getWorkflowList = async () => {
  return http<KyResponseWrapper<MatrixWorkflowListItem[]>>(
    'matrix_workflow/workflow_list',
  ).json()
}

export const getMatrixWorkflowDetail = async (workflow_id: string) => {
  return http<KyResponseWrapper<MatrixWorkflowItem>>(
    `matrix_workflow/${workflow_id}/detail`,
  ).json()
}

export const postRunWorkflow = async (workflow_id: string) => {
  return http
    .post(`matrix_workflow/${workflow_id}/run`, {
      headers: {
        'Content-Type': 'application/json',
      },
    })
    .json()
}

export const deleteWorkflowById = async (workflow_id: string) => {
  return http.delete(`matrix_workflow/${workflow_id}/delete`, {}).json()
}
