# Airport

使用`ts`编写流水线

```bash
bun add airport2
```


## 核心架构

```
Airport
├── Pipeline
│   ├── Task 1
│   │   ├── Step 1
│   │   ├── Step 2
│   │   └── ...
│   ├── Task 2
│   └── ...
├── Run: 异步处理本地命令
├── Exec: 同步处理本地命令
└── Remote: 处理远程服务器连接和操作
```

```ts
export {
  PipeLine, // 管道，串行执行多个Task
  Task,     // 任务，包含多个Step，可独立运行：Task().run()
  Step,     // 步骤，包含一个命令集，可独立运行：Step().run()
  run,      // 异步处理本地命令，基于`child_process.spawn`封装
  exec,     // 同步处理本地命令，基于`child_process.execSync`封装
  remote,   // 使用ssh在远程服务器执行命令，包含scp可以上传文件
  log,      // 日志输出
  logError, // 日志输出，错误日志
  color,    // 日志染色，export = chalk
}
```


## Usage

**范例：在项目根据目录下创建`airport.ts`文件**

```sh
bun run airport.ts # 也可以将命令添加到package.json中
```

**也可根据实际需求创建多个`airport`流水线**
```sh
.airport
├── deploy: 常规发布
├── commit: git-commit
├── docker: docker构建、推送、部署
└── ...

bun run .airport/deploy.ts
bun run .airport/commit.ts
bun run .airport/docker.ts
```


### Example

**常规构建发布范例**

```ts
import { name, version } from './package.json'
import { PipeLine, Task, remote, logError } from 'airport2'

const file = [name, version].join('-') + '.tgz'

const deployTask = new Task({
  name: '部署应用',
  steps: [
    {
      name: '构建项目',
      run: [
        'npm run build',
        'mkdir -p .cache',
        'mv `npm pack` .cache/',
      ],
    },
    {
      name: '发布到远程服务器',
      async run() {
        const ssh = remote('user@192.168.1.1')
        const dir = (path?: string) => join('/apps', name, path ?? '')

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

PipeLine.run([deployTask])
```

**docker构建范例**

```ts
import { name, version } from './package.json'
import { PipeLine, Task } from 'airport2'

const dockerTask = new Task({
  name: '部署docker应用',
  steps: [
    {
      name: '构建docker镜像',
      run: [
        `docker build -t ${name}:latest .`,
        `docker tag ${name}:latest user/${name}:${version}`,
        `docker push user/${name}:${version}`,
      ],
    },
  ],
})

dockerTask.run()
```
