import { PipeLine, Task, remote, logError } from './src/airport'
import { name, version } from './package.json'

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
        const ssh = remote('gavin@192.168.5.121')
        try {
          await ssh.run('mkdir -p /home/gavin/test')
          await ssh.scp(`.cache/${file}`, '/home/gavin/test')
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
