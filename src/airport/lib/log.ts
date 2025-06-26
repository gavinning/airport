import { formatTimestamp } from './date'

export const log = (...args: any[]) => {
  console.log(`[${formatTimestamp()}]`, ...args)
}

export const logError = (...args: any[]) => {
  console.error(`[${formatTimestamp()}]`, ...args)
}
