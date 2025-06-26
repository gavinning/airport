import { join } from 'path'
import { name, version } from './package.json'
import { PipeLine, Task, remote, exec, logError } from './src/airport'

const file = [name, version].join('-') + '.tgz'

// 创建部署任务
const deployTask = new Task({
  name: '部署应用',
  steps: [
    {
      name: '构建项目',
      run: [
        'mkdir -p .cache',
        'mv `npm pack` .cache/',
      ],
    },
    {
      name: '发布到远程服务器',
      async run() {
        exec(true, 'ls -al .cache')
        const ssh = remote('gavin@192.168.5.121')
        const dir = (path?: string) => join('/home/gavin/test', path ?? '')

        try {
          await ssh.run('rm -f', dir('latest'))
          await ssh.run('mkdir -p', dir(version))
          await ssh.scp(`.cache/${file}`, dir())
          await ssh.run('tar -zxvf', dir(file), '-C', dir(version))
          await ssh.run('ln -s', dir(version), dir('latest'))
        }
        catch (e) {
          logError(e)
        }
      },
    },
  ],
})

// 执行流水线
PipeLine.run([deployTask])
