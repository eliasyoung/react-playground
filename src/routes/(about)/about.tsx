import { createFileRoute, Outlet } from '@tanstack/react-router'

export const Route = createFileRoute('/(about)/about')({
  component: () => (
    <div>
      Hello /about/!
      <Outlet />
    </div>
  ),
})
