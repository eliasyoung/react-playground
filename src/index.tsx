// react scan must be imported before react
import { scan } from 'react-scan'

import React from 'react'
import ReactDOM from 'react-dom/client'
import { RouterProvider, createRouter } from '@tanstack/react-router'

import { NuqsAdapter } from 'nuqs/adapters/react'

import { routeTree } from './routeTree.gen'

import '@features/i18n'

import './index.css'
import '@xyflow/react/dist/style.css'

// Supports weights 100-900
import '@fontsource-variable/inter'
// Supports weights 100-900
import '@fontsource-variable/inter-tight'
// Supports weights 100-900
import '@fontsource-variable/montserrat'

// tanstack query client
import {
  useQuery,
  useMutation,
  useQueryClient,
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'

// toaster
import { Toaster } from '@/components/ui/sonner'

// react-scan setup
if (typeof window !== 'undefined') {
  scan({
    enabled: true,
    log: true, // logs render info to console (default: false)
  })
}

const router = createRouter({ routeTree })

const queryClient = new QueryClient()

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router
  }
}

const rootEl = document.getElementById('root')
if (rootEl) {
  const root = ReactDOM.createRoot(rootEl)
  root.render(
    <React.StrictMode>
      <NuqsAdapter>
        <QueryClientProvider client={queryClient}>
          <RouterProvider router={router} />
          <Toaster position='top-center' />
        </QueryClientProvider>
      </NuqsAdapter>
    </React.StrictMode>,
  )
}
