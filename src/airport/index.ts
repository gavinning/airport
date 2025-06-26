export * from './air/step'
export * from './air/task'
export * from './air/pipeline'
export * from './lib/run'
export * from './lib/remote'
export * from './lib/log'

// 导出默认的核心API
import { PipeLine } from './air/pipeline'
import { Task } from './air/task'
import { Step } from './air/step'
import { run } from './lib/run'
import { log, logError } from './lib/log'
import { remote } from './lib/remote'

export default {
  PipeLine,
  Task,
  Step,
  run,
  remote,
  log, logError,
}
