import { run } from './run'

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
    await run(`ssh ${this.opt.ssh} "${cmd.join(' ')}"`)
  }

  async scp(src: string, dist: string) {
    await run(`scp ${src} ${this.opt.ssh}:${dist}`)
  }
}
