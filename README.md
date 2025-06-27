# Airport

使用`ts`编写流水线

```bash
bun add airport2
```

## 核心架构

```
Airport
├── Pipeline: 管理多个Task的执行流程
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


## Usage
在项目根据目录下创建`airport.ts`文件

```sh
bun airport.ts // 也可以将命令添加到package.json中
```

## Example

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
        'mkdir -p .cache',
        'mv `npm pack` .cache/',
      ],
    },
    {
      name: '发布到远程服务器',
      async run() {
        const ssh = remote('user@192.168.1.1')
        const dir = (path?: string) => join('/home/user/test', path ?? '')

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
