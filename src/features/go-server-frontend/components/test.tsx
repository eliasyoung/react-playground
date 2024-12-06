import { useQuery } from '@tanstack/react-query'
import React from 'react'
import { getAllUsers, getAllPosts } from '../api'

const TestServer = React.memo(() => {
  const usersQuery = useQuery({
    queryKey: ['users'],
    queryFn: getAllUsers,
  })

  const postsQuery = useQuery({
    queryKey: ['posts'],
    queryFn: getAllPosts,
  })

  return (
    <>
      {(usersQuery.isFetching || postsQuery.isFetching) && (
        <div>Loading...</div>
      )}
      {usersQuery.data && (
        <div>
          <code className='p-4 font-display text-xs'>
            {JSON.stringify(usersQuery.data.data)}
          </code>
        </div>
      )}
      {postsQuery.data && postsQuery.data.data.length > 0 && (
        <div className='flex flex-col gap-4 pb-28'>
          {postsQuery.data.data.map((post) => (
            <div
              className='py-2 px-4 rounded-xl border border-primary/20 shadow-xs flex flex-col gap-1'
              key={post.id}
            >
              <div className='flex flex-row gap-2 items-baseline'>
                <div className='font-display text-xl font-semibold truncate'>
                  {post.title}
                </div>
                <div className='font-display text-sm font-light text-gray-500 dark:text-gray-300'>
                  {post.username}
                </div>
              </div>
              <div className='text-sm text-gray-700 dark:text-gray-200'>
                {post.content}
              </div>
              <div className='flex flex-row justify-between items-center'>
                <div className='flex flex-row gap-1 items-center'>
                  {post.tags &&
                    post.tags.length > 0 &&
                    post.tags.map((tag) => (
                      <span
                        className='text-xs text-gray-300 dark:text-gray-600'
                        key={tag}
                      >
                        {tag}
                      </span>
                    ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </>
  )
})

TestServer.displayName = 'TestServer'

export default TestServer
