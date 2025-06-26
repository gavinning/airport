import { run } from '../lib/run'
import type { StepRaw } from '../types'

/**
 * 步骤类，代表流水线中的单个执行步骤
 */
export class Step {
  public name: string
  private test: boolean
  private step: StepRaw

  constructor(step: StepRaw, test: boolean = false) {
    this.test = test
    this.step = step
    this.name = step.name
  }

  /**
   * 执行步骤
   */
  async execute(): Promise<any> {
    if (typeof this.step.run === 'string') {
      return this.runString()
    } else if (Array.isArray(this.step.run)) {
      return this.runArray()
    } else {
      // 函数类型的步骤
      if (this.test) {
        console.log(`[TEST MODE] Would execute function: ${this.step.run.name}`)
      } else {
        // 实际执行函数
        return await this.step.run()
      }
    }
  }

  /**
   * 处理字符串类型的命令执行
   */
  private async runString() {
    const runString = this.step.run as string
    if (this.test) {
      console.log(`[TEST MODE] Would execute: ${runString}`)
    } else {
      return await run(runString)
    }
  }

  /**
   * 处理字符串数组类型的命令执行
   */
  private async runArray() {
    const runArray = this.step.run as string[]
    if (this.test) {
      console.log(`[TEST MODE] Would execute array: ${runArray}`)
    } else {
      for (const cmd of runArray) {
        await run(cmd)
      }
    }
  }
}

