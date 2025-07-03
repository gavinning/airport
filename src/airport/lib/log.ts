import { Writable } from 'stream'
import { blue, gray, purple } from './color'
import { formatTimestamp } from './date'
import {
  START,
  END,
  PIPE_PREFIX,
  PIPE_TOP_LEFT,
  PIPE_TOP_RIGHT,
  PIPE_BOTTOM_LEFT,
  PIPE_BOTTOM_RIGHT,
} from '../conf'

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

export const logTesting = (...args: any[]) => {
  logStart(gray('Testing'), ...args)
}

// 日志流、用于子进程直接输出日志到控制台
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


// 流水线开始时日志
export const logPipeStart = () => {
  log(PIPE_TOP_LEFT, purple('Airport PipeLine'), START, PIPE_TOP_RIGHT)
}

// 流水线结束时日志
export const logPipeEnd = () => {
  log(PIPE_BOTTOM_LEFT, purple('Airport PipeLine'), END, PIPE_BOTTOM_RIGHT)
}


// 任务开始时日志
export const logTaskStart = ({ name, index, inPipeLine }) => {
  if (!inPipeLine) {
    logPipeStart()
  }
  logStart(purple('T' + index), START, blue(name))
}

// 任务结束时日志
export const logTaskEnd = ({ name, index, inPipeLine }) => {
  logStart(purple('T' + index), END, blue(name))
  if (!inPipeLine) {
    logPipeEnd()
  }
}


// 步骤开始时日志
export const logStepStart = ({ name, index }) => {
  logStart(purple('S'+ index), START, blue(name))
}

// 步骤结束时日志
export const logStepEnd = ({ name, index }) => {
  logStart(purple('S'+ index), END, blue(name))
}
