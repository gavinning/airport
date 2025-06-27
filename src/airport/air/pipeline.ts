import { Task } from './task'
import { log, purple, gray } from '../lib'

export class PipeLine {
  public name?: string
  private tasks: Task[]

  static run(tasks: Task[]) {
    return new PipeLine(tasks).run()
  }

  constructor(tasks: Task[]) {
    this.tasks = tasks
  }

  /**
   * 执行任务中的所有步骤
   */
  async run() {
    log(purple('Pipe'), gray('Start'), '-------------------------')

    for (const task of this.tasks) {
      await task.run()
    }

    log(`------------- ${purple("Pipe")} ${gray('End')} -------------`)
  }
}
