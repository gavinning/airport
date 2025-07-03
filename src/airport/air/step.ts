import type { StepRaw } from '../types'
import { log, run, logStepStart, logStepEnd, logTesting } from '../lib'

export class Step {
  public name: string
  public skip: boolean = false
  public index: number = 1 // 当前索引
  private step: StepRaw
  private testing: boolean = false

  constructor(step: StepRaw) {
    this.step = step
    this.name = step.name
    this.skip = step.skip ?? false
  }

  async run() {
    this.beforeRun()
    await this.exec()
    this.afterRun()
  }

  async test() {
    this.testing = true
    this.beforeRun()
    if (typeof this.step.run === 'string') {
      this.runStringTesting()
    } else if (Array.isArray(this.step.run)) {
      this.runArrayTesting()
    } else {
      logTesting('[async function run]')
    }
    this.afterRun()
  }

  /**
   * 执行步骤
   */
  private async exec(): Promise<any> {
    if (typeof this.step.run === 'string') {
      return this.runString()
    } else if (Array.isArray(this.step.run)) {
      return this.runArray()
    } else {
      return await this.step.run()
    }
  }

  /**
   * 处理字符串类型的命令执行
   */
  private async runString() {
    const runString = this.step.run as string
    return await run(runString)
  }

  /**
   * 处理字符串数组类型的命令执行
   */
  private async runArray() {
    const runArray = this.step.run as string[]
    for (const cmd of runArray) {
      await run(cmd)
    }
  }

  private runStringTesting() {
    const runString = this.step.run as string
    logTesting(runString)
  }

  private runArrayTesting() {
    const runArray = this.step.run as string[]
    for (const cmd of runArray) {
      logTesting(cmd)
    }
  }

  private beforeRun() {
    logStepStart(this)
  }

  private afterRun() {
    logStepEnd(this)
  }
}
