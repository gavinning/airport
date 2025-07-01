import { Writable } from 'stream'
import { gray } from './color'
import { formatTimestamp } from './date'
import { PIPE_PREFIX } from '../conf'

export const log = (...args: any[]) => {
  console.log(gray(`[${formatTimestamp()}]`), ...args)
}

export const logError = (...args: any[]) => {
  console.error(`[${formatTimestamp()}]`, ...args)
}

export const logStart = (...args: any[]) => {
  log(PIPE_PREFIX, ...args)
}

export const logErrorStart = (...args: any[]) => {
  logError(PIPE_PREFIX, ...args)
}

export const createLogStream = (prefix?: string) =>
  new Writable({
    write(chunk: Buffer, _encoding, callback) {
      const lines = chunk.toString().split('\n')

      lines.forEach((line) => {
        if (line.trim() === '') return

        // 添加前缀标识
        prefix ? log(prefix, line) : log(line)
      })

      callback()
    },

    final(callback) {
      // 确保所有输出都已处理
      callback()
    },
  })
