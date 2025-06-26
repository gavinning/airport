# 需求文档：Airport任务调度系统

## 项目概述
Airport是一个基于TypeScript的现代化任务调度系统，支持本地和远程任务执行，采用Pipeline-Task-Step三级架构，可用于自动化部署、构建和运维流程。

## 开发计划

### 阶段一：核心架构设计与实现（已完成）
- ✅ 设计并实现Step类，支持命令执行和函数调用
- ✅ 设计并实现Task类，管理多个Step的串行执行
- ✅ 设计并实现Pipeline类，管理多个Task的串行执行
- ✅ 实现远程SSH连接功能，支持远程命令执行和文件传输
- ✅ 添加单元测试，确保核心功能的正确性

### 阶段二：功能完善与文档（进行中）
- ✅ 实现测试模式（test()方法）
- ✅ 添加详细的代码注释和文档
- ☐ 创建使用示例和教程文档
- ☐ 完善错误处理和日志系统

### 阶段三：系统集成与优化
- ☐ 实现配置文件支持
- ☐ 添加任务并行执行功能
- ☐ 实现任务重试机制
- ☐ 添加任务依赖管理

## 技术栈
- TypeScript
- bun（运行时和依赖管理）
- vitest（单元测试）
- zx（命令执行）
- ssh2（SSH远程连接）
- TypeScript类型系统

## 核心功能
1. **Pipeline流水线**：管理多个任务的串行执行
2. **Task任务**：包含多个步骤的执行单元
3. **Step步骤**：执行单个命令或函数
4. **远程操作**：通过SSH连接远程服务器执行命令和传输文件
5. **测试模式**：支持仅输出命令而不实际执行

## 补充说明：

### Step类
 * Step.run有三种类型：`string | string[] | AnyFunction`，应该有两个私有函数来处理前两种情况，例如：
```ts
class Step {
  private _runString()
  private _runArray()
}
```
* `_runString`用于处理run值是字符串的情况
* `_runArray`用于处理run值是字符串数组的情况
* `AnyFunction`的情况，直接执行即可

## 使用示例
```typescript
import { Pipeline, Task, Step, remote } from './src/airport';
import { $ } from 'zx';

// 创建部署任务
const deployTask = new Task({
  name: '部署应用',
  steps: [
    {
      name: '构建项目',
      run: [
        'bun run build',
        'bun run test'
      ]
    },
    {
      name: '远程部署',
      run: async () => {
        const ssh = remote({
          ssh: 'root@192.168.1.1',
          port: 22,
          private: '$HOME/.ssh/id_rsa'
        });
        await ssh.connect();
        await ssh.run('mkdir -p /data/app');
        await ssh.scp('dist/*', '/data/app/');
        await ssh.close();
      }
    }
  ]
});

// 执行流水线
const pipeline = new Pipeline([deployTask]);
await pipeline.run();
```

## 单元测试
已实现核心功能的单元测试，可通过以下命令执行：
```bash
bun test
```

## 下一步计划
1. 完善测试覆盖率，添加更多边界情况测试
2. 实现dev.md文档，详细记录开发过程和架构设计
3. 添加CHANGELOG.md文件记录版本更新历史
4. 优化错误处理和日志系统
