import { Step } from './step'
import { log, purple, gray, blue } from '../lib'
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

    log(purple('Task'), gray('Start'), blue(this.name))

    for (const step of steps) {
      if (!step.skip) {
        log(purple('Step'), gray('Start'), blue(step.name))
        step.skip || (await step.run())
        log(purple('Step'), gray('End'), blue(step.name))
      }
    }

    log(purple('Task'), gray('End'), blue(this.name))
  }
}
