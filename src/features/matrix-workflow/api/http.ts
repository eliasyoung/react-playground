import ky from 'ky'

const apiAddr = import.meta.env.PUBLIC_MATRIX_WORKFLOW_API

const http = ky.extend({
  prefixUrl: apiAddr ?? 'http://127.0.0.1:8000',
})

export default http
