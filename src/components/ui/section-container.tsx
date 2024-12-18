import { cn } from '@/lib/utils'

interface SectionContainerProps {
  maxWidth?: number
  className?: string
  children?: React.ReactNode
}
export const SectionContainer = ({
  className,
  maxWidth,
  children,
}: SectionContainerProps) => {
  return (
    <div
      className={cn(
        'mx-auto',
        maxWidth ? `max-w-[${maxWidth}px]` : 'max-w-[1440px]',
        className,
      )}
    >
      {children}
    </div>
  )
}
