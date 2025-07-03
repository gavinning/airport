import { Task } from './task'
import { logPipeStart, logPipeEnd } from '../lib'
import type { TaskRaw } from '../types'

export class PipeLine {
  public name?: string
  // public log: boolean = true // 决定是否打印日志
  private tasks: Task[]

  static run(tasks: Task[] | TaskRaw[]) {
    return new PipeLine(tasks).run()
  }

  static test(tasks: Task[] | TaskRaw[]) {
    return new PipeLine(tasks).test()
  }

  constructor(tasks: Task[] | TaskRaw[]) {
    if (tasks.length > 0 && tasks[0] instanceof Task) {
      this.tasks = tasks as Task[]
    } else {
      this.tasks = (tasks as TaskRaw[]).map((task) => new Task(task))
    }
  }

  /**
   * 执行任务中的所有步骤
   */
  async run() {
    this.beforeRun()
    for (const [index, task] of this.tasks.entries()) {
      if (!task.skip) {
        task.index = index + 1
        await task._runPipeLine()
      }
    }
    this.afterRun()
  }

  test() {
    this.beforeRun()
    for (const [index, task] of this.tasks.entries()) {
      if (!task.skip) {
        task.index = index + 1
        task.test()
      }
    }
    this.afterRun()
  }

  private beforeRun() {
    logPipeStart()
  }

  private afterRun() {
    logPipeEnd()
  }
}
