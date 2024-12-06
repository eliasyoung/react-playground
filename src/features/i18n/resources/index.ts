import en from './en'
import zh from './zh'

const resources = {
  en,
  zh,
} as const

const defaultNS = 'common'

export { resources, defaultNS }
