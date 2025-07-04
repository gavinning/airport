import { logStart } from './log'
import { run, spawn } from './run'
import { green, gray } from './color'

export interface RemoteConfig {
  ssh: string
}

export function remote(ssh: string) {
  return new Remote({ ssh })
}

class Remote {
  constructor(private opt: RemoteConfig) {}

  /**
   * ssh远程执行命令
   * @description 多个参数会自动`join`成一条命令：cmd.join(' ')
   * @param cmd command to run
   * @returns Promise<void>
   */
  async run(...cmd: string[]): Promise<void> {
    await this.sshRun(cmd.join(' '))
  }

  /**
   * scp远程复制文件
   * @param src 本地路径 e.g. `.cache/app-0.0.1.tgz`
   * @param dist 远程服务器绝对路径，支持文件夹和文件，e.g. `/tmp/test.txt` or `/tmp`
   * @returns Promise<void>
   */
  async scp(src: string, dist: string) {
    await run(`scp ${src} ${this.opt.ssh}:${dist}`)
  }

  // 执行ssh命令
  private sshRun(command: string) {
    const cmd = `ssh ${this.opt.ssh} "${command}"`
    logStart(gray(this.opt.ssh), green(command))
    return spawn(cmd)
  }
}
