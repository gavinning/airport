import { Step } from './step'
import { logTaskStart, logTaskEnd } from '../lib'
import type { TaskRaw, StepRaw } from '../types'

export class Task {
  // 任务名称
  public name: string

  /** Task元数据 */
  public opt: TaskRaw

  /** 在流水线中的任务索引 */
  public index: number = 1 // 当前索引

  /** 流水线中是否跳过当前任务 */
  public skip: boolean = false

  // 是否无头模式，是否自调用
  // true: PipeLine模式，Task由PipeLine.run调用
  // false: 自调用，独立任务模式，外部直接调用Task.run
  public inPipeLine: boolean = false

  // 任务步骤
  private steps: StepRaw[]

  constructor(opt: TaskRaw) {
    this.opt = opt
    this.name = opt.name
    this.steps = opt.steps
    this.skip = opt.skip ?? false
  }

  /**
   * 执行任务中的所有步骤
   */
  async run() {
    this.beforeRun()
    const steps = this.steps.map((step) => new Step(step))

    for (const [index, step] of steps.entries()) {
      if (!step.skip) {
        step.index = index + 1
        step.skip || (await step.run())
      }
    }
    this.afterRun()
  }

  test() {
    this.inPipeLine = true
    this.beforeRun()
    const steps = this.steps.map((step) => new Step(step))
    for (const [index, step] of steps.entries()) {
      if (!step.skip) {
        step.index = index + 1
        step.skip || (step.test())
      }
    }
    this.afterRun()
  }

  async _runPipeLine() {
    this.inPipeLine = true
    await this.run()
  }

  private beforeRun() {
    logTaskStart(this)
  }

  private afterRun() {
    logTaskEnd(this)
  }
}
