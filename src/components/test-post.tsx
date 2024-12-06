import { getRouteApi } from '@tanstack/react-router'

const route = getRouteApi('/posts/$postId')

export const TestPost = () => {
  const params = route.useParams()
  const loader = route.useLoaderData()

  console.log(params)
  console.log(loader)

  return <div>This is Post {params.postId}</div>
}
