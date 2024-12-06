import { Link } from '@tanstack/react-router'
import { useTranslation } from 'react-i18next'

export const TopNav = () => {
  const { t } = useTranslation()

  const TOP_ROUTES = [
    {
      id: '/',
      label: t('header.nav-home'),
    },
    {
      id: '/about',
      label: t('header.nav-about'),
    },
    {
      id: '/posts',
      label: t('header.nav-posts'),
    },
  ]

  return (
    <nav className='w-full flex justify-center items-center xl:py-6 relative gradient-border-b'>
      {TOP_ROUTES.map((route) => (
        <Link
          to={route.id}
          className='px-6 hover:text-foreground text-foreground/80 transition-colors duration-300'
          key={route.id}
        >
          {route.label}
        </Link>
      ))}
    </nav>
  )
}
