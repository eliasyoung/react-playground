import type {
  GoApiResponseWrapper,
  GetAllUsersRes,
  GetAllPostsRes,
} from '../types'

const apiAddr = import.meta.env.PUBLIC_GO_BACKEND_API_ADDR

export const getAllUsers = async () => {
  return fetch(`${apiAddr}/users`)
    .then((res) => res.json())
    .catch((err) => err) as Promise<GoApiResponseWrapper<GetAllUsersRes>>
}

export const getAllPosts = async () => {
  return fetch(`${apiAddr}/posts`)
    .then((res) => res.json())
    .catch((err) => err) as Promise<GoApiResponseWrapper<GetAllPostsRes>>
}
