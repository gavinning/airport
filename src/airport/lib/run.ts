import { spawn } from 'child_process'
import { log } from './log'

export const run = (command: string) =>
  new Promise((resolve, reject) => {
    log('Running:', command)
    const child = spawn(command, {
      shell: true,
      stdio: 'inherit',
      timeout: 30_000  // 30秒超时
    })
    child.on('exit', resolve)
    child.on('error', reject)
  })
