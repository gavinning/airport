import { gray } from './color'
import { formatTimestamp } from './date'

export const log = (...args: any[]) => {
  console.log(gray(`[${formatTimestamp()}]`), ...args)
}

export const logError = (...args: any[]) => {
  console.error(`[${formatTimestamp()}]`, ...args)
}
