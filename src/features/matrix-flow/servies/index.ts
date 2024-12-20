import { type ReactFlowJsonObject } from '@xyflow/react'

export const getHelloWorld = async () => {
  return fetch('http://127.0.0.1:8000/').then((res) => res.json())
}

export const postSaveFlow = async (id: string, flow: ReactFlowJsonObject) => {
  return fetch(`http://127.0.0.1:8000/matrix_flow/${id}/save`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      id,
      ...flow,
    }),
  }).then((res) => res.json())
}
