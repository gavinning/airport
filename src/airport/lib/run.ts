import { green, gray } from './color'
import { logStart, createLogStream } from './log'
import { spawn as child_spawn, execSync } from 'child_process'

/**
 * 异步执行，控制台直接输出，`child_process.spawn`
 * @param command Shell命令
 * @returns Promise<any>
 * @example await run('npm install')
 * @example await run('npm run build')
 */
export const run = (command: string) => {
  logStart(gray('Running'), green(command))
  return spawn(command)
}


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
    logStart(gray('Running'), green(command))
    logStart(output)
  }
  return output
}


export const spawn = (command: string) =>
  new Promise<void>((resolve, reject) => {
    const child = child_spawn(command, {
      shell: true,
      cwd: process.cwd(),
      env: process.env,
      timeout: 30_000,
      stdio: ['ignore', 'pipe', 'pipe'], // 捕获输出流
    })

    // 创建日志流实例
    const stdoutLog = createLogStream(gray('├─'))
    const stderrLog = createLogStream(gray('├─'))

    // 连接输出流
    child.stdout.pipe(stdoutLog)
    child.stderr.pipe(stderrLog)

    child.on('exit', (code) => {
      code === 0 ? resolve() :
        reject(new Error(`Command exited with code ${code}`))
    })

    child.on('error', reject)
  })
