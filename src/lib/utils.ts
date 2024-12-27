import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const isEnumMember = <T>(
  value: unknown,
  enumArg: Record<string | number | symbol, T>,
): value is T => {
  return (Object.values(enumArg) as unknown[]).includes(value)
}
