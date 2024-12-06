export type GoApiResponseWrapper<T> = {
  code: number
  data: T
}

export type post = {
  id: number
  title: string
  user_id: number
  content: string
  tags: string[]
  created_at: string
}

export type GetAllPostsRes = (post & {
  username: string
  comments_count: number
})[]

export type GetAllUsersRes = {
  id: number
  username: string
  email: string
  created_at: string
}[]
