export type JSONResponse<T> = Promise<{
  code: number
  data: T
}>
