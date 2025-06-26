import { Task } from './task'
import { log } from '../lib/log'

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
    log('Start PipeLine: --------------------')

    for (const task of this.tasks) {
      await task.execute()
    }

    log('----------- End PipeLine -----------')
  }
}
