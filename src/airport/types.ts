/**
 * 步骤执行结果
 */
export interface StepResult {
  success: boolean
  output: string
}

/**
 * 步骤配置选项
 */
export interface StepRaw {
  name: string
  run: string | string[] | ((...args: any[]) => Promise<any>)
}


/**
 * 任务执行结果
 */
export interface TaskResult {
  success: boolean
  stepResults: StepResult[]
  name: string
}

/**
 * 任务配置选项
 */
export interface TaskOptions {
  name: string
  steps: StepRaw[]
  test?: boolean
}
