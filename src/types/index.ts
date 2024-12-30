export type JSONResponse<T> = {
  code: number
  data: T
}

export type KyResponseWrapper<T> = {
  code: number
  data: T
}
