# Airport任务调度系统开发文档

## 项目架构设计

Airport采用三级架构设计：Pipeline-Task-Step，形成清晰的层次结构，便于扩展和维护。

### 核心架构

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
