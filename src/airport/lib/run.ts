import { log } from './log'
import { green, gray } from './color'
import { spawn, execSync } from 'child_process'

/**
 * 异步执行，控制台直接输出，`child_process.spawn`
 * @param command Shell命令
 * @returns Promise<any>
 * @example await run('npm install')
 * @example await run('npm run build')
 */
export const run = (command: string) =>
  new Promise((resolve, reject) => {
    log(gray('Running:'), green(command))
    const child = spawn(command, {
      shell: true,
      stdio: 'inherit',
      env: process.env,
      cwd: process.cwd(),
      timeout: 30_000  // 30秒超时
    })
    child.on('exit', resolve)
    child.on('error', reject)
  })

/**
 * 同步执行，`child_process.execSync`
 * @param print 是否打印日志
 * @param command Shell命令
 * @returns Shell命令执行结果
 * @example exec('ls -la')
 * @example exec(true, 'ls -la')
 */
export function exec(command: string): string
export function exec(print: boolean, command: string): string
export function exec(print: boolean | string, command?: string): string {
  if (typeof print === 'string') {
    command = print
    print = false
  }
  let output = execSync(command ?? 'echo').toString()
  if (print) {
    log(gray('Running:'), green(command))
    log(output)
  }
  return output
}
