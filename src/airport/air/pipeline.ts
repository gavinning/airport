import { Task } from './task'
import { log, purple } from '../lib'
import {
  START,
  END,
  PIPE_TOP_LEFT,
  PIPE_TOP_RIGHT,
  PIPE_BOTTOM_LEFT,
  PIPE_BOTTOM_RIGHT,
} from '../conf'

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
    log(PIPE_TOP_LEFT, purple('Airport PipeLine'), START, PIPE_TOP_RIGHT)

    for (const task of this.tasks) {
      await task.run()
    }

    log(PIPE_BOTTOM_LEFT, purple('Airport PipeLine'), END, PIPE_BOTTOM_RIGHT)
  }
}
