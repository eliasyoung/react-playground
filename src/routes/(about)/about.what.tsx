import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/(about)/about/what')({
  component: () => <div>Hello /about/what/!</div>
})