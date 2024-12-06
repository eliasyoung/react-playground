import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'

import { Moon, Sun } from 'lucide-react'

import { useTheme } from '../hooks'
import type { ThemeOption } from '../@types'
import { useTranslation } from 'react-i18next'

export const ThemeToogle = () => {
  const { theme, setTheme } = useTheme()
  const applyThemeChange = (targetTheme: ThemeOption) => {
    if (targetTheme === theme) return
    localStorage.setItem('theme_key', targetTheme)
    setTheme(targetTheme)
  }

  const { t } = useTranslation()

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant='outline' size='icon'>
          <Sun className='h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0' />
          <Moon className='absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100' />
          <span className='sr-only'>{t('theme.toggle-button-text-sr')}</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align='end'>
        <DropdownMenuItem onClick={() => applyThemeChange('light')}>
          {t('theme.text-light')}
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => applyThemeChange('dark')}>
          {t('theme.text-dark')}
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => applyThemeChange('system')}>
          {t('theme.text-system')}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
