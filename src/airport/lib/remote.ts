import { run } from './run'

export interface RemoteConfig {
  ssh: string
}

export function remote(ssh: string) {
  return new Remote({ ssh })
}

class Remote {
  constructor(private opt: RemoteConfig) {}

  async run(cmd: string) {
    await run(`ssh ${this.opt.ssh} "${cmd}"`)
  }

  async scp(src: string, dist: string) {
    await run(`scp ${src} ${this.opt.ssh}:${dist}`)
  }
}
