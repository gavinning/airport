import { Step } from './step'
import { log } from '../lib/log'
import type { TaskOptions, StepRaw } from '../types'

export class Task {
  public name: string
  public opt: TaskOptions
  private steps: StepRaw[]

  constructor(opt: TaskOptions) {
    this.opt = opt
    this.name = opt.name
    this.steps = opt.steps
  }

  /**
   * 执行任务中的所有步骤
   */
  async execute(test: boolean = false) {
    const steps = this.steps.map((step) => new Step(step, test))

    log(`Start Task:`, this.name)

    for (const step of steps) {
      log(`Start Task.Step:`, step.name)

      await step.execute()

      log(`End Task.Step:`, step.name)
    }

    log(`End Task:`, this.name)
  }
}
