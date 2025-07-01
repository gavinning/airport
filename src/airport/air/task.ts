import { Step } from './step'
import { logStart, purple, blue } from '../lib'
import { START, END } from '../conf'
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
  async run(test: boolean = false) {
    const steps = this.steps.map((step) => new Step(step, test))

    logStart(purple('T'), START, blue(this.name))

    for (const step of steps) {
      if (!step.skip) {
        logStart(purple('S'), START, blue(step.name))
        step.skip || (await step.run())
        logStart(purple('S'), END, blue(step.name))
      }
    }

    logStart(purple('T'), END, blue(this.name))
  }
}
