import { name, version } from './package.json'
import { PipeLine, Task } from './src/airport'

// 创建部署任务
const deployTask = new Task({
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

// 执行流水线
PipeLine.run([deployTask])
