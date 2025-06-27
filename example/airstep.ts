import { Step } from '../src/airport'

// 创建部署任务
const step = new Step({
  name: '构建项目',
  run: [
    'mkdir -p .cache',
    'mv `npm pack` .cache/',
  ],
})

step.run()
