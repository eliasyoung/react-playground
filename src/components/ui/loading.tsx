import type { FC } from 'react'
import { Loader2 } from 'lucide-react'

const Loading: FC = () => {
  return (
    <div className='size-full grid place-items-center absolute top-0 text-primary'>
      <div className='flex flex-col items-center justify-center gap-2'>
        <Loader2 className='animate-spin stroke-1 size-12' />
        <h1 className='font-display text-xl'>Loading...</h1>
      </div>
    </div>
  )
}

Loading.displayName = 'Loading'

export default Loading
