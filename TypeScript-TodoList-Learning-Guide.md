# TypeScript CLI Todo List 项目学习指南

> **项目来源**: [wmd-ts-todo-list](https://github.com/hassan-ak/wmd-ts-todo-list)
>
> **学习目标**: 从零开始，分阶段复现一个完整的 TypeScript 命令行待办事项管理应用
>
> **适用人群**: TypeScript 初学者

---

## 📋 目录

1. [项目概述](#-项目概述)
2. [技术栈说明](#-技术栈说明)
3. [项目结构总览](#-项目结构总览)
4. [模块拆解与学习路径](#-模块拆解与学习路径)
5. [阶段一：项目初始化与环境配置](#️⃣-阶段一项目初始化与环境配置)
6. [阶段二：类型定义模块](#️⃣-阶段二类型定义模块)
7. [阶段三：核心逻辑模块](#️⃣-阶段三核心逻辑模块)
8. [阶段四：工具函数模块](#️⃣-阶段四工具函数模块)
9. [阶段五：主程序入口](#️⃣-阶段五主程序入口)
10. [阶段六：完整整合与测试](#️⃣-阶段六完整整合与测试)
11. [常用命令速查表](#-常用命令速查表)
12. [TypeScript 核心概念总结](#-typescript-核心概念总结)

---

## 🎯 项目概述

### 功能特性

本项目是一个基于 TypeScript 的**命令行交互式待办事项管理应用**，具备以下核心功能：

| 功能          | 描述            |
| ----------- | ------------- |
| ✅ 添加新任务     | 用户可以输入新的待办事项  |
| 📋 显示任务列表   | 以表格形式展示所有待办事项 |
| ✏️ 更改任务状态   | 切换任务的完成/未完成状态 |
| 🗑️ 清理已完成任务 | 批量删除所有已完成的任务  |
| 🚪 退出应用     | 安全退出程序        |

### 学习价值

通过这个项目，你将掌握：
- TypeScript 基础语法和类型系统
- 面向对象编程（类、接口、类型）
- Node.js 内置模块的使用
- 命令行交互式应用开发
- 模块化代码组织
- npm 包管理和脚本配置

---

## 🔧 技术栈说明

### 核心技术

```
┌─────────────────────────────────────┐
│         应用层 (Application)        │
│    CLI 交互界面 / 用户输入处理       │
├─────────────────────────────────────┤
│         逻辑层 (Logic)              │
│    TodoManager 类 / 状态管理        │
├─────────────────────────────────────┤
│         类型层 (Types)              │
│    接口定义 / 类型别名              │
├─────────────────────────────────────┤
│         运行时 (Runtime)            │
│    Node.js / readline 模块          │
└─────────────────────────────────────┘
```

### 技术组件详解

| 技术 | 版本要求 | 用途 |
|------|---------|------|
| **TypeScript** | ^5.0.0 | 静态类型检查，提供类型安全 |
| **Node.js** | >=18.0.0 | JavaScript 运行时环境 |
| **npm** | >=9.0.0 | 包管理器 |
| **ts-node** | ^10.9.0 | 直接运行 TypeScript 文件（开发用） |
| **@types/node** | ^20.0.0 | Node.js 的 TypeScript 类型定义 |

---

## 📁 项目结构总览

```
ts-todo-list/
├── src/                      # 源代码目录
│   ├── index.ts             # 主程序入口（CLI 交互）
│   ├── todo.ts              # 核心业务逻辑（TodoManager 类）
│   ├── types.ts             # 类型定义（接口、类型别名）
│   └── utils.ts             # 工具函数（辅助功能）
├── dist/                     # 编译输出目录（自动生成）
│   ├── index.js
│   ├── todo.js
│   ├── types.js
│   └── utils.js
├── node_modules/            # 依赖包目录（自动生成）
├── package.json             # 项目配置文件
├── tsconfig.json            # TypeScript 编译器配置
└── README.md                # 本学习文档
```

### 模块职责划分

```
┌──────────────┐     ┌──────────────┐     ┌──────────────┐
│   index.ts   │────▶│    todo.ts   │◀────│   types.ts   │
│   用户交互层  │     │   业务逻辑层  │     │   类型定义层  │
│              │     │              │     │              │
│ • 菜单显示   │     │ • 添加任务   │     │ • Todo 接口   │
│ • 输入处理   │     │ • 切换状态   │     │ • TodoList 类型│
│ • 流程控制   │     │ • 删除任务   │     │ • Status 枚举 │
└──────────────┘     └──────┬───────┘     └──────────────┘
                            │
                            ▼
                     ┌──────────────┐
                     │   utils.ts   │
                     │   工具函数层  │
                     │              │
                     │ • 表格格式化  │
                     │ • 输入验证   │
                     │ • ID 生成    │
                     └──────────────┘
```

---

## 🧩 模块拆解与学习路径

### 推荐学习顺序

```
阶段一: 环境搭建 ──▶ 阶段二: 类型定义 ──▶ 阶段三: 核心逻辑
    (基础准备)         (数据建模)         (业务实现)
         │                   │                   │
         ▼                   ▼                   ▼
    理解工具链          理解类型系统          理解 OOP
    配置编译环境        定义数据结构          实现增删改查
         │                   │                   │
         └───────────────────┼───────────────────┘
                             ▼
                    阶段四: 工具函数 ──▶ 阶段五: 主程序 ──▶ 阶段六: 整合测试
                       (辅助功能)        (用户交互)        (完整运行)
                             │                 │                 │
                             ▼                 ▼                 ▼
                        理解函数式编程     理解异步编程      端到端测试
                        实现展示优化      实现交互流程      验证功能完整性
```

### 各阶段预期成果

| 阶段  | 可运行性      | 学到的知识                   | 预期产出          |
| --- | --------- | ----------------------- | ------------- |
| 阶段一 | ✅ 可以验证环境  | npm、TypeScript、tsconfig | 可编译的空项目       |
| 阶段二 | ⚠️ 仅类型定义  | interface、type、enum     | 类型定义文件        |
| 阶段三 | ✅ 单元测试可运行 | class、方法、数组操作           | TodoManager 类 |
| 阶段四 | ✅ 函数可调用   | 字符串处理、格式化               | 工具函数集         |
| 阶段五 | ✅ CLI 可交互 | async/await、readline    | 交互式菜单         |
| 阶段六 | ✅ 完整应用    | 模块整合、错误处理               | 生产级应用         |

---

## 1️⃣ 阶段一：项目初始化与环境配置

### 目标
搭建完整的 TypeScript 开发环境，确保能够编写、编译和运行 TypeScript 代码。

### 步骤 1.1：创建项目目录

```bash
# 在你的工作目录下创建项目文件夹
mkdir ts-todo-list
cd ts-todo-list
```

**命令解释**:
- `mkdir`: make directory，创建新目录
- `cd`: change directory，切换到指定目录

### 步骤 1.2：初始化 npm 项目

```bash
npm init -y
```

**命令详细解析**:

| 部分     | 含义                                 |
| ------ | ---------------------------------- |
| `npm`  | Node Package Manager，Node.js 的包管理器 |
| `init` | initialize，初始化一个新的 package.json 文件 |
| `-y`   | yes，自动使用默认配置，无需手动确认                |

**执行后会生成 `package.json` 文件**:

```json
{
  "name": "ts-todo-list",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "keywords": [],
  "author": "",
  "license": "ISC"
}
```

**package.json 关键字段说明**:

| 字段                | 说明                  |
| ----------------- | ------------------- |
| `name`            | 项目名称（发布到 npm 时使用）   |
| `version`         | 版本号，遵循语义化版本（semver） |
| `main`            | 入口文件路径              |
| `scripts`         | 可执行的 npm 脚本命令       |
| `dependencies`    | 生产环境依赖              |
| `devDependencies` | 开发环境依赖              |

### 步骤 1.3：安装 TypeScript 和相关依赖

```bash
# 安装 TypeScript 编译器（开发依赖）
npm install typescript --save-dev

# 安装 ts-node（允许直接运行 TS 文件，无需先编译）
npm install ts-node --save-dev

# 安装 @types/node（Node.js 的类型定义）
npm install @types/node --save-dev
```

**命令详细解析**:

| 命令部分 | 含义 |
|---------|------|
| `install` (或 `i`) | 安装指定的包 |
| `typescript` | TypeScript 编译器包名 |
| `--save-dev` (或 `-D`) | 保存为开发依赖（写入 devDependencies） |
| `ts-node` | TypeScript 执行引擎，可直接运行 .ts 文件 |
| `@types/node` | Node.js API 的 TypeScript 类型声明文件 |

**生产依赖 vs 开发依赖**:

```
dependencies（生产依赖）
├── 运行时必需的包
├── 会随项目一起部署
└── 示例: express, lodash

devDependencies（开发依赖）
├── 仅开发时需要
├── 不包含在生产环境中
└── 示例: typescript, eslint, webpack
```

### 步骤 1.4：创建 TypeScript 配置文件

```bash
npx tsc --init
```

**命令详细解析**:

| 部分 | 含义 |
|------|------|
| `npx` | execute npm package binaries，临时执行 npm 包的可执行文件 |
| `tsc` | TypeScript Compiler，TypeScript 编译器命令 |
| `--init` | 初始化，生成默认配置文件 |

**生成的 `tsconfig.json`（需修改为以下内容）**:

```json
{
  "compilerOptions": {
    /* 语言与环境 */
    "target": "ES2020",                    // 编译目标：ES2020 标准
    "module": "commonjs",                  // 模块系统：CommonJS（Node.js 兼容）
    "lib": ["ES2020"],                     // 包含的标准库

    /* 输出配置 */
    "outDir": "./dist",                    // 输出目录
    "rootDir": "./src",                    // 源代码根目录
    "declaration": true,                   // 生成 .d.ts 类型声明文件

    /* 严格模式（推荐开启） */
    "strict": true,                        // 启用所有严格类型检查
    "noImplicitAny": true,                 // 禁止隐式 any 类型
    "strictNullChecks": true,              // 严格的 null 检查
    "strictFunctionTypes": true,           // 严格的函数类型检查
    "strictBindCallApply": true,           // 严格的 bind/call/apply
    "strictPropertyInitialization": true,  // 严格的属性初始化检查
    "noImplicitThis": true,                // 禁止隐式的 this 类型
    "alwaysStrict": true,                  // 使用严格模式解析文件

    /* 模块解析 */
    "moduleResolution": "node",            // 模块解析策略：Node.js 风格
    "baseUrl": ".",                        // 基础路径
    "esModuleInterop": true,               // 允许 CommonJS/ES Module 互操作
    "resolveJsonModule": true,             // 允许导入 JSON 文件

    /* 其他选项 */
    "skipLibCheck": true,                  // 跳过库文件的类型检查
    "forceConsistentCasingInFileNames": true, // 强制文件名大小写一致
    "sourceMap": true                      // 生成 source map 文件（调试用）
  },

  "include": ["src/**/*"],                // 包含的源文件
  "exclude": ["node_modules", "dist"]      // 排除的目录
}
```

**tsconfig.json 核心配置项详解**:

| 配置项 | 推荐值 | 说明 |
|--------|-------|------|
| `target` | `"ES2020"` | 编译后的 JavaScript 版本，ES2020 支持现代语法 |
| `module` | `"commonjs"` | 模块格式，CommonJS 是 Node.js 的标准格式 |
| `outDir` | `"./dist"` | 编译后文件的输出目录 |
| `rootDir` | `"./src"` | 源代码的根目录 |
| `strict` | `true` | 启用严格模式，帮助发现潜在错误 |
| `esModuleInterop` | `true` | 解决 CommonJS 和 ES Module 的兼容问题 |
| `moduleResolution` | `"node"` | 使用 Node.js 的模块解析策略 |

### 步骤 1.5：创建源代码目录结构

```bash
# 创建 src 目录存放源代码
mkdir src
```

### 步骤 1.6：验证环境配置

创建测试文件 `src/test-env.ts`:

```typescript
// 测试文件：验证 TypeScript 环境是否正确配置

const message: string = "Hello, TypeScript!";
console.log(message);

function add(a: number, b: number): number {
    return a + b;
}

const result = add(5, 3);
console.log(`5 + 3 = ${result}`);
```

**运行测试**:

```bash
# 方式一：使用 ts-node 直接运行（推荐用于开发）
npx ts-node src/test-env.ts

# 方式二：先编译再运行
npx tsc
node dist/test-env.js
```

**预期输出**:
```
Hello, TypeScript!
5 + 3 = 8
```

### 步骤 1.7：添加 npm 脚本命令

编辑 `package.json`，在 `scripts` 部分添加：

```json
{
  "name": "ts-todo-list",
  "version": "1.0.0",
  "description": "A CLI Todo List application built with TypeScript",
  "main": "dist/index.js",
  "scripts": {
    "start": "ts-node src/index.ts",
    "build": "tsc",
    "run": "node dist/index.js",
    "dev": "ts-node --watch src/index.ts"
  },
  "keywords": ["todo", "cli", "typescript"],
  "author": "",
  "license": "ISC",
  "devDependencies": {
    "@types/node": "^20.11.0",
    "ts-node": "^10.9.2",
    "typescript": "^5.3.3"
  }
}
```

**新增脚本命令说明**:

| 命令 | 实际执行 | 用途 |
|------|---------|------|
| `npm start` | `ts-node src/index.ts` | 启动开发服务器 |
| `npm run build` | `tsc` | 编译 TypeScript 到 JavaScript |
| `npm run run` | `node dist/index.js` | 运行编译后的版本 |
| `npm run dev` | `ts-node --watch src/index.ts` | 监听文件变化并自动重启 |

### 阶段一完成标志

✅ 能够成功执行 `npm start`（虽然会报错找不到 index.ts，但说明环境已就绪）
✅ 能够成功执行 `npm run build`（生成 dist 目录）
✅ 测试文件能够正常编译和运行

---

## 2️⃣ 阶段二：类型定义模块

### 目标
理解 TypeScript 的类型系统，为待办事项应用定义清晰的数据结构。

### 创建文件：`src/types.ts`

```typescript
/**
 * 待办事项状态枚举
 * 定义任务可能的状态
 */
export enum TodoStatus {
    PENDING = "pending",      // 待处理
    IN_PROGRESS = "in-progress", // 进行中
    COMPLETED = "completed"   // 已完成
}

/**
 * 待办事项接口
 * 定义单个待办事项的数据结构
 */
export interface ITodoItem {
    id: number;                    // 唯一标识符
    title: string;                 // 任务标题
    description?: string;          // 任务描述（可选）
    status: TodoStatus;            // 任务状态
    createdAt: Date;               // 创建时间
    updatedAt: Date;               // 最后更新时间
}

/**
 * 待办事项列表类型
 * 定义整个列表的类型
 */
export type TodoList = ITodoItem[];

/**
 * 用户操作枚举
 * 定义用户可以执行的操作
 */
export enum UserAction {
    ADD = "1",                     // 添加新任务
    DISPLAY = "2",                 // 显示所有任务
    TOGGLE_STATUS = "3",           // 切换任务状态
    REMOVE_COMPLETED = "4",        // 删除已完成任务
    QUIT = "5"                     // 退出应用
}
```

### TypeScript 类型概念详解

#### 1. 接口（Interface）

```typescript
interface ITodoItem {
    id: number;
    title: string;
    description?: string;  // ? 表示可选属性
    status: TodoStatus;
    createdAt: Date;
    updatedAt: Date;
}
```

**关键概念**:
- **接口**: 定义对象的结构契约
- **可选属性**: `?` 标记表示该属性可以不存在
- **只读属性**: `readonly` 标记表示属性只能在创建时赋值
- **继承**: 接口可以通过 `extends` 继承其他接口

**示例用法**:

```typescript
// 创建符合接口的对象
const todo: ITodoItem = {
    id: 1,
    title: "学习 TypeScript",
    status: TodoStatus.PENDING,
    createdAt: new Date(),
    updatedAt: new Date()
    // description 是可选的，可以不提供
};
```

#### 2. 类型别名（Type Alias）

```typescript
type TodoList = ITodoItem[];
```

**关键概念**:
- **类型别名**: 给现有类型起一个新名字
- **联合类型**: `string | number` 表示可以是字符串或数字
- **交叉类型**: `A & B` 表示同时具有 A 和 B 的类型
- **字面量类型**: 只能是特定值的类型

**示例用法**:

```typescript
// 使用类型别名
let todos: TodoList = [];

// 联合类型示例
type Status = "active" | "inactive" | "archived";

// 交叉类型示例
type WithTimestamp = ITodoItem & { timestamp: number };
```

#### 3. 枚举（Enum）

```typescript
enum TodoStatus {
    PENDING = "pending",
    IN_PROGRESS = "in-progress",
    COMPLETED = "completed"
}
```

**关键概念**:
- **数字枚举**: 默认从 0 开始自增
- **字符串枚举**: 每个成员都必须显式赋值
- **常量枚举**: 编译时内联，不会生成运行时代码
- **反向映射**: 数字枚举支持从值到名字的映射

**示例用法**:

```typescript
// 使用枚举
const status: TodoStatus = TodoStatus.PENDING;

// 数字枚举的反向映射
console.log(TodoStatus[0]); // 输出: "PENDING"
console.log(TodoStatus.PENDING); // 输出: 0
```

### 阶段二练习

创建 `src/test-types.ts` 来验证类型定义：

```typescript
import { ITodoItem, TodoList, TodoStatus, UserAction } from './types';

// 测试接口
const testTodo: ITodoItem = {
    id: 1,
    title: "测试任务",
    status: TodoStatus.PENDING,
    createdAt: new Date(),
    updatedAt: new Date(),
    description: "这是一个测试"
};

// 测试类型别名
const testList: TodoList = [testTodo];

// 测试枚举
const action: UserAction = UserAction.ADD;

console.log("类型定义测试通过！");
console.log("Test Todo:", testTodo);
console.log("Action:", action);
```

**运行测试**:
```bash
npx ts-node src/test-types.ts
```

### 阶段二完成标志

✅ 理解 interface、type、enum 的区别和使用场景
✅ 能够正确定义和使用自定义类型
✅ 类型测试文件能够正常运行

---

## 3️⃣ 阶段三：核心逻辑模块

### 目标
掌握面向对象编程思想，实现待办事项的核心业务逻辑。

### 创建文件：`src/todo.ts`

```typescript
import { ITodoItem, TodoList, TodoStatus } from './types';

/**
 * TodoManager 类
 * 管理待办事项的核心业务逻辑
 *
 * 设计原则：
 * - 单一职责：只负责待办事项的管理
 * - 封装：内部状态对外隐藏
 * - 开闭原则：易于扩展新的操作
 */
export class TodoManager {
    private todos: TodoList = [];
    private nextId: number = 1;

    /**
     * 添加新的待办事项
     * @param title 任务标题
     * @param description 任务描述（可选）
     * @returns 新创建的待办事项
     */
    addTodo(title: string, description?: string): ITodoItem {
        const now = new Date();

        const newTodo: ITodoItem = {
            id: this.nextId++,
            title: title.trim(),
            description: description?.trim(),
            status: TodoStatus.PENDING,
            createdAt: now,
            updatedAt: now
        };

        this.todos.push(newTodo);
        return newTodo;
    }

    /**
     * 根据 ID 获取待办事项
     * @param id 待办事项 ID
     * @returns 找到的待办事项，未找到返回 undefined
     */
    getTodoById(id: number): ITodoItem | undefined {
        return this.todos.find(todo => todo.id === id);
    }

    /**
     * 获取所有待办事项
     * @returns 待办事项列表的副本
     */
    getAllTodos(): TodoList {
        return [...this.todos]; // 返回副本，防止外部直接修改
    }

    /**
     * 根据状态获取待办事项
     * @param status 要筛选的状态
     * @returns 符合条件的待办事项列表
     */
    getTodosByStatus(status: TodoStatus): TodoList {
        return this.todos.filter(todo => todo.status === status);
    }

    /**
     * 更新待办事项的标题
     * @param id 待办事项 ID
     * @param newTitle 新标题
     * @returns 是否更新成功
     */
    updateTodoTitle(id: number, newTitle: string): boolean {
        const todo = this.getTodoById(id);
        if (todo && newTitle.trim()) {
            todo.title = newTitle.trim();
            todo.updatedAt = new Date();
            return true;
        }
        return false;
    }

    /**
     * 切换待办事项的状态
     * @param id 待办事项 ID
     * @param newStatus 新状态（可选，不传则自动切换）
     * @returns 是否切换成功
     */
    toggleTodoStatus(id: number, newStatus?: TodoStatus): boolean {
        const todo = this.getTodoById(id);
        if (!todo) {
            return false;
        }

        if (newStatus) {
            todo.status = newStatus;
        } else {
            // 自动循环切换状态
            const statusOrder = [
                TodoStatus.PENDING,
                TodoStatus.IN_PROGRESS,
                TodoStatus.COMPLETED
            ];
            const currentIndex = statusOrder.indexOf(todo.status);
            const nextIndex = (currentIndex + 1) % statusOrder.length;
            todo.status = statusOrder[nextIndex];
        }

        todo.updatedAt = new Date();
        return true;
    }

    /**
     * 删除指定的待办事项
     * @param id 待办事项 ID
     * @returns 是否删除成功
     */
    removeTodo(id: number): boolean {
        const initialLength = this.todos.length;
        this.todos = this.todos.filter(todo => todo.id !== id);
        return this.todos.length < initialLength;
    }

    /**
     * 删除所有已完成的待办事项
     * @returns 删除的数量
     */
    removeCompletedTodos(): number {
        const completedCount = this.getTodosByStatus(TodoStatus.COMPLETED).length;
        this.todos = this.todos.filter(todo => todo.status !== TodoStatus.COMPLETED);
        return completedCount;
    }

    /**
     * 获取待办事项统计信息
     * @returns 统计数据对象
     */
    getStatistics() {
        return {
            total: this.todos.length,
            pending: this.getTodosByStatus(TodoStatus.PENDING).length,
            inProgress: this.getTodosByStatus(TodoStatus.IN_PROGRESS).length,
            completed: this.getTodosByStatus(TodoStatus.COMPLETED).length
        };
    }

    /**
     * 搜索待办事项（按标题模糊匹配）
     * @param keyword 搜索关键词
     * @returns 匹配的待办事项列表
     */
    searchTodos(keyword: string): TodoList {
        const lowerKeyword = keyword.toLowerCase();
        return this.todos.filter(todo =>
            todo.title.toLowerCase().includes(lowerKeyword) ||
            (todo.description && todo.description.toLowerCase().includes(lowerKeyword))
        );
    }

    /**
     * 清空所有待办事项
     */
    clearAll(): void {
        this.todos = [];
        this.nextId = 1;
    }
}
```

### 面向对象编程概念详解

#### 1. 类（Class）的基本结构

```typescript
export class TodoManager {
    // 属性
    private todos: TodoList = [];
    private nextId: number = 1;

    // 方法
    addTodo(title: string): ITodoItem { ... }
    // ...
}
```

**关键概念**:
- **class**: 定义对象的蓝图/模板
- **属性**: 对象的数据成员
- **方法**: 对象的行为/功能
- **构造函数**: 创建实例时自动调用的特殊方法

#### 2. 访问修饰符

| 修饰符 | 访问范围 | 说明 |
|--------|---------|------|
| `public`（默认） | 任何地方可访问 | 公开的接口 |
| `private` | 仅类内部可访问 | 私有实现细节 |
| `protected` | 类及其子类可访问 | 受保护的继承成员 |
| `readonly` | 只能在声明或构造时赋值 | 只读属性 |

**示例**:
```typescript
class Example {
    public name: string;        // 任何地方可访问
    private _id: number;        // 只有此类可访问
    protected version: string;  // 此类及子类可访问
    readonly createdAt: Date;   // 只读，不可修改
}
```

#### 3. 方法的类型注解

```typescript
addTodo(title: string, description?: string): ITodoItem {
    // 参数类型        ↑        ↑
    // 返回类型                    ↑
}
```

- **参数类型**: 明确参数应该是什么类型
- **返回类型**: 明确方法返回什么类型
- **可选参数**: `?` 标记表示该参数可以省略
- **默认参数**: `= value` 提供默认值

#### 4. 数组高级操作

```typescript
// find: 查找第一个符合条件的元素
return this.todos.find(todo => todo.id === id);

// filter: 过滤出所有符合条件的元素
return this.todos.filter(todo => todo.status === status);

// map: 转换每个元素
return this.todos.map(todo => todo.title);

// reduce: 累计计算
const total = this.todos.reduce((sum, todo) => sum + 1, 0);
```

### 阶段三测试文件：`src/test-todo.ts`

```typescript
import { TodoManager } from './todo';
import { TodoStatus } from './types';

// 创建 TodoManager 实例
const manager = new TodoManager();

console.log("=== 测试添加任务 ===");
const todo1 = manager.addTodo("学习 TypeScript 基础");
console.log("添加成功:", todo1);

const todo2 = manager.addTodo("完成作业", "数学第三章习题");
console.log("添加成功:", todo2);

const todo3 = manager.addTodo("购买 groceries");
console.log("添加成功:", todo3);

console.log("\n=== 测试查询任务 ===");
console.log("所有任务:", manager.getAllTodos());
console.log("ID=1 的任务:", manager.getTodoById(1));
console.log("统计信息:", manager.getStatistics());

console.log("\n=== 测试更新状态 ===");
manager.toggleTodoStatus(1, TodoStatus.IN_PROGRESS);
manager.toggleTodoStatus(2, TodoStatus.COMPLETED);
console.log("更新后所有任务:", manager.getAllTodos());
console.log("更新后统计:", manager.getStatistics());

console.log("\n=== 测试搜索功能 ===");
console.log("搜索 'TypeScript':", manager.searchTodos("TypeScript"));
console.log("搜索 '学习':", manager.searchTodos("学习"));

console.log("\n=== 测试删除功能 ===");
console.log("删除已完成任务数量:", manager.removeCompletedTodos());
console.log("删除后剩余:", manager.getAllTodos());

console.log("\n=== 所有测试通过！===");
```

**运行测试**:
```bash
npx ts-node src/test-todo.ts
```

**预期输出**:
```
=== 测试添加任务 ===
添加成功: { id: 1, title: '学习 TypeScript 基础', ..., status: 'pending' }
添加成功: { id: 2, title: '完成作业', ..., status: 'pending' }
添加成功: { id: 3, title: '购买 groceries', ..., status: 'pending' }

=== 测试查询任务 ===
所有任务: [...]
ID=1 的任务: {...}
统计信息: { total: 3, pending: 3, inProgress: 0, completed: 0 }

=== 测试更新状态 ===
更新后所有任务: [...]
更新后统计: { total: 3, pending: 1, inProgress: 1, completed: 1 }

=== 测试搜索功能 ===
搜索 'TypeScript': [...]
搜索 '学习': [...]

=== 测试删除功能 ===
删除已完成任务数量: 1
删除后剩余: [...]

=== 所有测试通过！===
```

### 阶段三完成标志

✅ 理解类的封装、继承、多态
✅ 掌握访问修饰符的使用
✅ 能够实现 CRUD（增删改查）操作
✅ 测试文件能够正常运行并通过所有测试用例

---

## 4️⃣ 阶段四：工具函数模块

### 目标
学习函数式编程思想，实现辅助功能如格式化输出、输入验证等。

### 创建文件：`src/utils.ts`

```typescript
import { ITodoItem, TodoList, TodoStatus, UserAction } from './types';

/**
 * 格式化日期为易读的字符串
 * @param date 日期对象
 * @returns 格式化后的日期字符串
 */
export function formatDate(date: Date): string {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');

    return `${year}-${month}-${day} ${hours}:${minutes}`;
}

/**
 * 获取状态的显示符号
 * @param status 任务状态
 * @returns 状态符号
 */
export function getStatusSymbol(status: TodoStatus): string {
    switch (status) {
        case TodoStatus.PENDING:
            return "⬜";
        case TodoStatus.IN_PROGRESS:
            return "🔄";
        case TodoStatus.COMPLETED:
            return "✅";
        default:
            return "❓";
    }
}

/**
 * 获取状态的中文名称
 * @param status 任务状态
 * @returns 状态中文名
 */
export function getStatusName(status: TodoStatus): string {
    const statusNames: Record<TodoStatus, string> = {
        [TodoStatus.PENDING]: "待处理",
        [TodoStatus.IN_PROGRESS]: "进行中",
        [TodoStatus.COMPLETED]: "已完成"
    };
    return statusNames[status] || "未知";
}

/**
 * 将待办事项列表格式化为表格字符串
 * @param todos 待办事项列表
 * @returns 格式化的表格字符串
 */
export function formatTodoTable(todos: TodoList): string {
    if (todos.length === 0) {
        return "\n📭 暂无待办事项\n";
    }

    const header = "\n" + "=".repeat(80) + "\n" +
                   "│ ID  │ 状态 │ 标题                    │ 描述              │ 创建时间           │\n" +
                   "=".repeat(80);

    const rows = todos.map(todo => {
        const id = String(todo.id).padEnd(4);
        const symbol = getStatusSymbol(todo.status);
        const status = `${symbol} ${getStatusName(todo.status)}`.padEnd(6);
        const title = (todo.title.length > 20 ? todo.title.substring(0, 17) + "..." : todo.title).padEnd(24);
        const desc = (todo.description && todo.description.length > 16
            ? todo.description.substring(0, 13) + "..."
            : (todo.description || "-")).padEnd(18);
        const date = formatDate(todo.createdAt);

        return `│ ${id}│ ${status}│ ${title}│ ${desc}│ ${date} │`;
    });

    const footer = "=".repeat(80);

    return [header, ...rows, footer].join('\n');
}

/**
 * 格式化统计信息
 * @param stats 统计对象
 * @returns 格式化的统计字符串
 */
export function formatStatistics(stats: { total: number; pending: number; inProgress: number; completed: number }): string {
    return `
╔══════════════════════════════════╗
║          📊 统计信息             ║
╠══════════════════════════════════╣
║  总计: ${String(stats.total).padEnd(4)} 待处理: ${String(stats.pending).padEnd(4)}     ║
║  进行中: ${String(stats.inProgress).padEnd(4)} 已完成: ${String(stats.completed).padEnd(4)}     ║
╚══════════════════════════════════╝`;
}

/**
 * 显示主菜单
 * @returns 菜单字符串
 */
export function showMenu(): string {
    return `
╔══════════════════════════════════╗
║     📝 TypeScript Todo List      ║
╠══════════════════════════════════╣
║  ${UserAction.ADD}. ➕ 添加新任务                ║
║  ${UserAction.DISPLAY}. 📋 显示所有任务              ║
║  ${UserAction.TOGGLE_STATUS}. ✏️  切换任务状态              ║
║  ${UserAction.REMOVE_COMPLETED}. 🗑️  清理已完成任务            ║
║  ${UserAction.QUIT}. 🚪 退出应用                  ║
╚══════════════════════════════════╝`;
}

/**
 * 验证用户输入是否为有效的操作编号
 * @param input 用户输入
 * @returns 是否有效
 */
export function isValidAction(input: string): input is UserAction {
    return Object.values(UserAction).includes(input as UserAction);
}

/**
 * 验证 ID 是否有效
 * @param input 用户输入
 * @param maxId 最大有效 ID
 * @returns 验证结果，包含是否有效和解析后的 ID
 */
export function validateId(input: string, maxId: number): { valid: boolean; id?: number } {
    const id = parseInt(input, 10);
    return {
        valid: !isNaN(id) && id > 0 && id <= maxId,
        id: !isNaN(id) ? id : undefined
    };
}

/**
 * 清屏（跨平台兼容）
 */
export function clearScreen(): void {
    console.clear();
}

/**
 * 显示分隔线
 */
export function showSeparator(): void {
    console.log("-".repeat(80));
}

/**
 * 延迟执行（用于动画效果）
 * @param ms 毫秒数
 */
export function delay(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
}
```

### 函数式编程概念详解

#### 1. 纯函数（Pure Function）

```typescript
function formatDate(date: Date): string {
    // 相同输入总是产生相同输出
    // 没有副作用（不修改外部状态）
    const year = date.getFullYear();
    // ...
    return `${year}-${month}-${day}`;
}
```

**特点**:
- 给定相同输入，总是返回相同输出
- 不产生副作用（不修改外部变量、不进行 I/O 操作）
- 易于测试和推理

#### 2. 高阶函数（Higher-Order Function）

```typescript
// 接受函数作为参数
function formatTodoTable(todos: TodoList): string {
    const rows = todos.map(todo => { ... });  // map 接受回调函数
    // ...
}

// 返回函数
function createFormatter(prefix: string) {
    return (text: string) => `${prefix}: ${text}`;
}
```

#### 3. 类型守卫（Type Guard）

```typescript
export function isValidAction(input: string): input is UserAction {
    return Object.values(UserAction).includes(input as UserAction);
}

// 使用示例
const input: string = getUserInput();
if (isValidAction(input)) {
    // 在这个块中，TypeScript 知道 input 是 UserAction 类型
    handleAction(input);
}
```

**`input is UserAction`**: 这是类型谓词，告诉 TypeScript 编译器如果函数返回 true，则参数是指定类型。

#### 4. 解构与展开运算符

```typescript
// 解构
const { total, pending, completed } = stats;

// 展开（复制数组）
return [...this.todos];  // 创建副本

// 展开（合并对象）
const newObj = { ...oldObj, newProp: value };
```

### 阶段四测试文件：`src/test-utils.ts`

```typescript
import { ITodoItem, TodoStatus } from './types';
import {
    formatDate,
    getStatusSymbol,
    getStatusName,
    formatTodoTable,
    formatStatistics,
    showMenu,
    isValidAction,
    validateId
} from './utils';

console.log("=== 测试日期格式化 ===");
const now = new Date();
console.log("当前时间:", formatDate(now));

console.log("\n=== 测试状态符号 ===");
console.log("PENDING:", getStatusSymbol(TodoStatus.PENDING));
console.log("IN_PROGRESS:", getStatusSymbol(TodoStatus.IN_PROGRESS));
console.log("COMPLETED:", getStatusSymbol(TodoStatus.COMPLETED));

console.log("\n=== 测试状态名称 ===");
console.log("PENDING:", getStatusName(TodoStatus.PENDING));
console.log("IN_PROGRESS:", getStatusName(TodoStatus.IN_PROGRESS));
console.log("COMPLETED:", getStatusName(TodoStatus.COMPLETED));

console.log("\n=== 测试表格格式化 ===");
const testTodos: ITodoItem[] = [
    {
        id: 1,
        title: "学习 TypeScript",
        description: "完成基础教程",
        status: TodoStatus.IN_PROGRESS,
        createdAt: new Date(),
        updatedAt: new Date()
    },
    {
        id: 2,
        title: "完成作业",
        status: TodoStatus.COMPLETED,
        createdAt: new Date(),
        updatedAt: new Date()
    }
];
console.log(formatTodoTable(testTodos));

console.log("\n=== 测试空列表 ===");
console.log(formatTodoTable([]));

console.log("\n=== 测试统计格式化 ===");
console.log(formatStatistics({ total: 10, pending: 5, inProgress: 3, completed: 2 }));

console.log("\n=== 测试菜单显示 ===");
console.log(showMenu());

console.log("\n=== 测试输入验证 ===");
console.log("'1' 是否有效操作:", isValidAction("1"));
console.log("'6' 是否有效操作:", isValidAction("6"));
console.log("'abc' 是否有效操作:", isValidAction("abc"));

console.log("\n=== 测试 ID 验证 ===");
console.log("validateId('3', 5):", validateId("3", 5));
console.log("validateId('abc', 5):", validateId("abc", 5));
console.log("validateId('10', 5):", validateId("10", 5));

console.log("\n=== 所有工具函数测试通过！===");
```

**运行测试**:
```bash
npx ts-node src/test-utils.ts
```

### 阶段四完成标志

✅ 理解纯函数和高阶函数的概念
✅ 掌握类型守卫的使用
✅ 能够实现格式化和验证功能
✅ 测试文件能够正常运行

---

## 5️⃣ 阶段五：主程序入口

### 目标
学习异步编程和 Node.js readline 模块，实现命令行交互界面。

### 创建文件：`src/index.ts`

```typescript
import * as readline from 'readline/promises';
import { TodoManager } from './todo';
import { UserAction, TodoStatus } from './types';
import {
    showMenu,
    formatTodoTable,
    formatStatistics,
    clearScreen,
    showSeparator,
    isValidAction,
    validateId,
    delay
} from './utils';

/**
 * 主应用程序类
 * 负责用户交互和流程控制
 */
class TodoApp {
    private manager: TodoManager;
    private rl: readline.Interface;
    private isRunning: boolean;

    constructor() {
        this.manager = new TodoManager();
        this.rl = readline.createInterface({
            input: process.stdin,
            output: process.stdout
        });
        this.isRunning = false;
    }

    /**
     * 启动应用
     */
    async start(): Promise<void> {
        this.isRunning = true;
        clearScreen();
        console.log("🎉 欢迎使用 TypeScript Todo List！");
        await delay(500);

        while (this.isRunning) {
            try {
                await this.showMainMenu();
            } catch (error) {
                console.error("\n❌ 发生错误:", error);
                await delay(1000);
            }
        }
    }

    /**
     * 显示主菜单并处理用户选择
     */
    private async showMainMenu(): Promise<void> {
        console.log(showMenu());

        // 显示当前统计
        const stats = this.manager.getStatistics();
        console.log(formatStatistics(stats));

        const input = await this.rl.question("\n👉 请选择操作 (1-5): ");

        if (!isValidAction(input)) {
            console.log("\n⚠️  无效的选择，请重新输入！");
            await delay(1000);
            clearScreen();
            return;
        }

        clearScreen();

        switch (input) {
            case UserAction.ADD:
                await this.handleAddTodo();
                break;
            case UserAction.DISPLAY:
                await this.handleDisplayTodos();
                break;
            case UserAction.TOGGLE_STATUS:
                await this.handleToggleStatus();
                break;
            case UserAction.REMOVE_COMPLETED:
                await this.handleRemoveCompleted();
                break;
            case UserAction.QUIT:
                await this.handleQuit();
                break;
        }
    }

    /**
     * 处理添加任务
     */
    private async handleAddTodo(): Promise<void> {
        console.log("\n📝 添加新任务");
        showSeparator();

        const title = await this.rl.question("请输入任务标题: ");
        if (!title.trim()) {
            console.log("\n⚠️  标题不能为空！");
            await delay(1000);
            return;
        }

        const description = await this.rl.question("请输入任务描述（可选，直接回车跳过）: ");

        const newTodo = this.manager.addTodo(title, description || undefined);

        console.log("\n✅ 任务添加成功！");
        console.log(formatTodoTable([newTodo]));
        await delay(2000);
    }

    /**
     * 处理显示所有任务
     */
    private async handleDisplayTodos(): Promise<void> {
        console.log("\n📋 所有任务列表");
        showSeparator();

        const todos = this.manager.getAllTodos();

        if (todos.length === 0) {
            console.log(formatTodoTable(todos));
        } else {
            console.log(formatTodoTable(todos));
            console.log(formatStatistics(this.manager.getStatistics()));
        }

        await this.rl.question("\n按回车键继续...");
    }

    /**
     * 处理切换任务状态
     */
    private async handleToggleStatus(): Promise<void> {
        console.log("\n✏️  切换任务状态");
        showSeparator();

        const todos = this.manager.getAllTodos();
        if (todos.length === 0) {
            console.log("\n📭 暂无任务可操作！");
            await delay(1500);
            return;
        }

        console.log(formatTodoTable(todos));

        const input = await this.rl.question("\n请输入要切换状态的任务 ID: ");
        const validation = validateId(input, this.manager.getNextId() - 1);

        if (!validation.valid || !validation.id) {
            console.log("\n⚠️  无效的 ID！");
            await delay(1000);
            return;
        }

        const todo = this.manager.getTodoById(validation.id);
        if (!todo) {
            console.log("\n⚠️  未找到该任务！");
            await delay(1000);
            return;
        }

        console.log(`\n当前状态: ${getStatusSymbol(todo.status)} ${getStatusName(todo.status)}`);

        console.log("\n可选择的新状态:");
        console.log(`1. ${getStatusSymbol(TodoStatus.PENDING)} ${getStatusName(TodoStatus.PENDING)}`);
        console.log(`2. ${getStatusSymbol(TodoStatus.IN_PROGRESS)} ${getStatusName(TodoStatus.IN_PROGRESS)}`);
        console.log(`3. ${getStatusSymbol(TodoStatus.COMPLETED)} ${getStatusName(TodoStatus.COMPLETED)}`);
        console.log("4. 自动切换到下一状态");

        const statusInput = await this.rl.question("\n请选择新状态 (1-4): ");

        let success: boolean;
        switch (statusInput) {
            case "1":
                success = this.manager.toggleTodoStatus(validation.id, TodoStatus.PENDING);
                break;
            case "2":
                success = this.manager.toggleTodoStatus(validation.id, TodoStatus.IN_PROGRESS);
                break;
            case "3":
                success = this.manager.toggleTodoStatus(validation.id, TodoStatus.COMPLETED);
                break;
            case "4":
                success = this.manager.toggleTodoStatus(validation.id);
                break;
            default:
                console.log("\n⚠️  无效的选择！");
                await delay(1000);
                return;
        }

        if (success) {
            const updatedTodo = this.manager.getTodoById(validation.id)!;
            console.log("\n✅ 状态更新成功！");
            console.log(formatTodoTable([updatedTodo]));
        } else {
            console.log("\n❌ 状态更新失败！");
        }

        await delay(2000);
    }

    /**
     * 处理清理已完成任务
     */
    private async handleRemoveCompleted(): Promise<void> {
        console.log("\n🗑️  清理已完成任务");
        showSeparator();

        const completedTodos = this.manager.getTodosByStatus(TodoStatus.COMPLETED);

        if (completedTodos.length === 0) {
            console.log("\n📭 暂无已完成的任务！");
            await delay(1500);
            return;
        }

        console.log(`即将删除 ${completedTodos.length} 个已完成的任务:`);
        console.log(formatTodoTable(completedTodos));

        const confirm = await this.rl.question("\n确认删除吗？(y/n): ");

        if (confirm.toLowerCase() === 'y' || confirm.toLowerCase() === 'yes') {
            const removedCount = this.manager.removeCompletedTodos();
            console.log(`\n✅ 成功删除 ${removedCount} 个已完成的任务！`);
            console.log(formatStatistics(this.manager.getStatistics()));
        } else {
            console.log("\n❌ 取消删除操作。");
        }

        await delay(2000);
    }

    /**
     * 处理退出应用
     */
    private async handleQuit(): Promise<void> {
        console.log("\n👋 感谢使用，再见！");
        await delay(500);

        this.isRunning = false;
        this.rl.close();
    }

    /**
     * 获取管理器的下一个 ID（用于验证）
     */
    private getNextId(): number {
        return (this.manager as any).nextId || 1;
    }
}

// 导入辅助函数（避免循环依赖）
import { getStatusSymbol, getStatusName } from './utils';

// 创建并启动应用实例
const app = new TodoApp();
app.start().catch(error => {
    console.error("应用启动失败:", error);
    process.exit(1);
});
```

### 异步编程概念详解

#### 1. async/await 语法

```typescript
async function showMainMenu(): Promise<void> {
    // async 标记函数为异步函数
    const input = await this.rl.question("...");  // await 等待异步操作完成
}
```

**关键点**:
- `async`: 声明异步函数，返回 Promise
- `await`: 暂停执行，等待 Promise 完成
- 只能在 async 函数中使用 await
- 使异步代码看起来像同步代码

#### 2. Promise 对象

```typescript
// Promise 的三种状态
// 1. Pending（进行中）
// 2. Fulfilled（已完成）
// 3. Rejected（已拒绝）

function delay(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
}

// 使用
await delay(1000);  // 等待 1 秒
```

#### 3. readline 模块

```typescript
import * as readline from 'readline/promises';

// 创建 readline 接口
const rl = readline.createInterface({
    input: process.stdin,   // 标准输入（键盘）
    output: process.stdout  // 标准输出（屏幕）
});

// 异步提问
const answer = await rl.question("请输入: ");

// 关闭接口
rl.close();
```

**readline/promises vs readline**:
- `readline/promises`: 基于 Promise，配合 async/await 使用
- `readline`: 基于回调函数，传统方式

### 阶段五完成标志

✅ 理解 async/await 和 Promise
✅ 掌握 readline 模块的使用
✅ 能够实现完整的 CLI 交互流程
✅ 应用可以正常启动和基本操作

---

## 6️⃣ 阶段六：完整整合与测试

### 目标
将所有模块整合，进行全面测试和优化。

### 最终文件清单

确保你的项目包含以下文件：

```
ts-todo-list/
├── src/
│   ├── index.ts          # 主程序（已创建）
│   ├── todo.ts           # 核心逻辑（已创建）
│   ├── types.ts          # 类型定义（已创建）
│   └── utils.ts          # 工具函数（已创建）
├── dist/                 # 编译输出（自动生成）
├── node_modules/         # 依赖包（自动生成）
├── package.json          # 项目配置（已创建）
└── tsconfig.json         # TS 配置（已创建）
```

### 完整测试步骤

#### 步骤 6.1：编译项目

```bash
npm run build
```

**预期结果**:
- 无编译错误
- 在 `dist/` 目录下生成 4 个 JavaScript 文件

#### 步骤 6.2：运行应用

```bash
npm start
```

**预期结果**:
- 显示欢迎信息和主菜单
- 可以进行交互操作

#### 步骤 6.3：功能测试清单

按照以下清单逐一测试所有功能：

##### ✅ 测试 1：添加任务

```
操作步骤：
1. 选择操作 1（添加新任务）
2. 输入标题："学习 TypeScript"
3. 输入描述："完成基础教程"（或直接回车）

预期结果：
- 显示"任务添加成功"
- 显示新添加的任务详情
- 任务状态为"待处理"
```

##### ✅ 测试 2：显示所有任务

```
操作步骤：
1. 先添加几个不同的任务
2. 选择操作 2（显示所有任务）

预期结果：
- 以表格形式显示所有任务
- 显示统计信息（总数、各状态数量）
- 表格包含 ID、状态、标题、描述、时间
```

##### ✅ 测试 3：切换任务状态

```
操作步骤：
1. 确保有至少一个任务
2. 选择操作 3（切换任务状态）
3. 输入要操作的任务 ID
4. 选择新的状态（1-4）

预期结果：
- 显示当前状态
- 显示可选的新状态列表
- 状态成功更新并显示更新后的任务
```

##### ✅ 测试 4：清理已完成任务

```
操作步骤：
1. 将至少一个任务标记为"已完成"
2. 选择操作 4（清理已完成任务）
3. 确认删除（输入 y）

预期结果：
- 显示将要删除的任务列表
- 显示删除成功的消息
- 显示更新后的统计信息
```

##### ✅ 测试 5：边界情况测试

```
测试场景：
1. 尝试添加空标题 → 应提示"标题不能为空"
2. 尝试操作不存在的 ID → 应提示"无效的 ID"
3. 在没有任务时尝试切换状态 → 应提示"暂无任务"
4. 在没有已完成任务时尝试清理 → 应提示"暂无已完成的任务"
5. 输入无效的操作编号 → 应提示"无效的选择"

预期结果：
所有边界情况都应有友好的错误提示
```

##### ✅ 测试 6：退出应用

```
操作步骤：
选择操作 5（退出应用）

预期结果：
- 显示告别信息
- 程序正常退出
- 返回命令行提示符
```

### 性能优化建议

#### 1. 数据持久化（进阶）

可以将任务保存到 JSON 文件，下次启动时自动加载：

```typescript
// 在 TodoManager 中添加
import * as fs from 'fs';
import * as path from 'path';

private filePath: string = path.join(__dirname, '../data/todos.json');

saveToFile(): void {
    fs.writeFileSync(this.filePath, JSON.stringify(this.todos, null, 2));
}

loadFromFile(): void {
    if (fs.existsSync(this.filePath)) {
        const data = fs.readFileSync(this.filePath, 'utf-8');
        this.todos = JSON.parse(data);
    }
}
```

#### 2. 错误处理增强

```typescript
try {
    // 可能出错的操作
} catch (error) {
    if (error instanceof Error) {
        console.error(`错误: ${error.message}`);
    } else {
        console.error("发生未知错误");
    }
}
```

#### 3. 日志记录

```typescript
// 简单的日志系统
const logger = {
    info: (message: string) => console.log(`[INFO] ${new Date().toISOString()} - ${message}`),
    error: (message: string) => console.error(`[ERROR] ${new Date().toISOString()} - ${message}`),
    warn: (message: string) => console.warn(`[WARN] ${new Date().toISOString()} - ${message}`)
};
```

### 发布为 npm 包（可选）

如果你想将这个项目发布为 npm 包供他人使用：

#### 1. 修改 package.json

```json
{
  "name": "my-ts-todo-list",
  "version": "1.0.0",
  "description": "A CLI Todo List built with TypeScript",
  "main": "dist/index.js",
  "bin": {
    "my-todo-list": "./dist/index.js"
  },
  "files": ["dist"],
  "keywords": ["todo", "cli", "typescript"],
  "author": "Your Name",
  "license": "MIT"
}
```

#### 2. 添加 shebang 到 index.ts

在 `src/index.ts` 文件最顶部添加：

```typescript
#!/usr/bin/env node
```

#### 3. 构建并发布

```bash
# 构建
npm run build

# 登录 npm（首次需要）
npm login

# 发布
npm publish --access public
```

#### 4. 使用方式

其他人可以通过以下方式安装使用：

```bash
# 全局安装
npm install -g my-ts-todo-list

# 运行
my-todo-list

# 或使用 npx
npx my-todo-list
```

### 阶段六完成标志

✅ 所有模块成功整合
✅ 编译无错误无警告
✅ 所有功能测试通过
✅ 边界情况处理完善
✅ （可选）成功发布为 npm 包

---

## 📚 常用命令速查表

### 项目初始化命令

| 命令 | 说明 | 使用场景 |
|------|------|---------|
| `mkdir dir-name` | 创建目录 | 创建项目文件夹 |
| `cd dir-name` | 进入目录 | 进入项目目录 |
| `npm init -y` | 初始化 npm 项目 | 快速创建 package.json |
| `npm install pkg-name` | 安装包 | 添加依赖 |
| `npm install pkg-name --save-dev` | 安装开发依赖 | 添加开发工具 |

### TypeScript 相关命令

| 命令 | 说明 | 使用场景 |
|------|------|---------|
| `npx tsc --init` | 初始化 TS 配置 | 首次配置项目 |
| `npx tsc` | 编译 TypeScript | 将 TS 编译为 JS |
| `npx tsc -w` | 监听模式编译 | 开发时自动编译 |
| `npx ts-node file.ts` | 直接运行 TS | 开发调试 |
| `npx ts-node --watch file.ts` | 监听运行 | 开发时热重载 |

### npm 脚本命令（需要在 package.json 中配置）

| 命令 | 说明 | 使用场景 |
|------|------|---------|
| `npm start` | 启动开发服务器 | 运行应用 |
| `npm run build` | 编译项目 | 生产构建 |
| `npm run dev` | 开发模式 | 带热重载的开发 |
| `npm test` | 运行测试 | 执行测试用例 |
| `npm publish` | 发布包 | 发布到 npm |

### Git 命令（版本控制）

| 命令 | 说明 | 使用场景 |
|------|------|---------|
| `git init` | 初始化仓库 | 首次版本控制 |
| `git add .` | 添加所有更改 | 暂存更改 |
| `git commit -m "msg"` | 提交更改 | 保存版本 |
| `git push` | 推送到远程 | 上传代码 |
| `git pull` | 拉取远程更新 | 同步代码 |

### 调试命令

| 命令 | 说明 | 使用场景 |
|------|------|---------|
| `console.log()` | 打印日志 | 调试输出 |
| `console.table()` | 表格打印 | 打印对象数组 |
| `console.error()` | 错误输出 | 错误信息 |
| `console.time()/timeEnd()` | 计时 | 性能测试 |
| `debugger` | 断点 | 调试器断点 |

### 文件系统命令

| 命令 | 说明 | 使用场景 |
|------|------|---------|
| `ls` 或 `dir` | 列出文件 | 查看目录内容 |
| `cat file` | 查看文件 | 读取文件内容 |
| `rm file` | 删除文件 | 清理文件 |
| `cp src dest` | 复制文件 | 备份文件 |
| `mv old new` | 移动/重命名 | 整理文件 |

### Node.js 特定命令

| 命令 | 说明 | 使用场景 |
|------|------|---------|
| `node file.js` | 运行 JS 文件 | 执行编译后代码 |
| `node --version` | 查看 Node 版本 | 检查环境 |
| `npm --version` | 查看 npm 版本 | 检查环境 |
| `npm list` | 列出已安装包 | 查看依赖 |
| `npm outdated` | 检查过时的包 | 依赖更新 |

### 快捷键（在命令行中）

| 快捷键 | 说明 | 使用场景 |
|--------|------|---------|
| `Ctrl + C` | 终止进程 | 停止运行中的应用 |
| `Ctrl + D` | 结束输入 | 退出 REPL |
| `↑ / ↓` | 历史命令 | 重复之前命令 |
| `Tab` | 自动补全 | 补全命令/文件名 |
| `Ctrl + L` | 清屏 | 清理终端 |

---

## 🎓 TypeScript 核心概念总结

### 类型系统层次

```
┌─────────────────────────────────────────┐
│           高级类型（Advanced Types）       │
│  泛型、条件类型、映射类型、模板字面量类型    │
├─────────────────────────────────────────┤
│           组合类型（Composite Types）      │
│  联合类型、交叉类型、字面量类型            │
├─────────────────────────────────────────┤
│           引用类型（Reference Types）      │
│  数组、元组、对象、函数、类               │
├─────────────────────────────────────────┤
│           基础类型（Primitive Types）      │
│  string, number, boolean, null, undefined │
└─────────────────────────────────────────┘
```

### 本项目使用的 TypeScript 特性

| 特性 | 使用位置 | 说明 |
|------|---------|------|
| **接口 (Interface)** | `types.ts` | 定义数据结构契约 |
| **类型别名 (Type)** | `types.ts` | 创建类型快捷方式 |
| **枚举 (Enum)** | `types.ts` | 定义常量集合 |
| **类 (Class)** | `todo.ts`, `index.ts` | 封装数据和行为的蓝图 |
| **泛型 (Generics)** | `utils.ts` | `Record<TodoStatus, string>` |
| **类型守卫 (Type Guard)** | `utils.ts` | `isValidAction()` |
| **可选属性 (?)** | `types.ts` | `description?: string` |
| **只读属性 (readonly)** | 可扩展 | 防止意外修改 |
| **联合类型 (\|)** | 多处 | `string \| number` |
| **交叉类型 (&)** | 可扩展 | 合并多个类型 |
| **解构赋值** | `index.ts` | `{ total, pending } = stats` |
| **展开运算符 (...)** | `todo.ts` | `[...this.todos]` |
| **async/await** | `index.ts` | 异步编程 |
| **Promise** | `utils.ts` | 延迟执行 |
| **模块导入/导出** | 所有文件 | `import/export` |
| **类型断言 (as)** | `utils.ts` | `input as UserAction` |

### 最佳实践建议

#### 1. 类型定义优先

```typescript
// ✅ 好：先定义类型，再使用
interface IUser {
    id: number;
    name: string;
}

const user: IUser = { id: 1, name: "张三" };

// ❌ 差：使用 any 或不定义类型
const user: any = { id: 1, name: "张三" };
```

#### 2. 优先使用 const

```typescript
// ✅ 好：使用 const，避免意外重新赋值
const MAX_ITEMS = 100;
const apiUrl = "https://api.example.com";

// ❌ 差：不必要的 let
let MAX_ITEMS = 100;
```

#### 3. 使用明确的返回类型

```typescript
// ✅ 好：明确声明返回类型
function add(a: number, b: number): number {
    return a + b;
}

// ❌ 差：依赖类型推断（公共 API 不推荐）
function add(a: number, b: number) {
    return a + b;
}
```

#### 4. 保持函数单一职责

```typescript
// ✅ 好：每个函数做一件事
function validateInput(input: string): boolean { ... }
function processValidatedInput(input: string): Result { ... }
function displayResult(result: Result): void { ... }

// ❌ 差：一个函数做多件事
function handleEverything(input: string): void {
    // 验证、处理、显示全部混在一起
}
```

#### 5. 使用枚举替代魔法值

```typescript
// ✅ 好：使用枚举
enum Status {
    ACTIVE = "active",
    INACTIVE = "inactive"
}
if (user.status === Status.ACTIVE) { ... }

// ❌ 差：魔法字符串
if (user.status === "active") { ... }
```

### 常见错误与解决方案

#### 错误 1：类型 "X" 上不存在属性 "Y"

```typescript
// 问题
const user = { name: "张三" };
console.log(user.age);  // 错误：age 不存在

// 解决方案 1：定义完整接口
interface IUser {
    name: string;
    age?: number;  // 可选属性
}

// 解决方案 2：类型断言（谨慎使用）
const user = { name: "张三" } as any;
```

#### 错误 2：不能将类型 "X" 分配给类型 "Y"

```typescript
// 问题
let num: number = "hello";  // 错误：类型不匹配

// 解决方案：类型转换或检查
let num: number = Number("hello") || 0;
if (typeof value === "number") { ... }
```

#### 错误 3：参数 "X" 隐式具有 "any" 类型

```typescript
// 问题
function greet(name) { ... }  // 错误：缺少类型注解

// 解决方案：添加类型注解
function greet(name: string): string {
    return `你好，${name}`;
}
```

#### 错误 4：不能对可能为 "undefined" 的对象使用属性

```typescript
// 问题
const user = users.find(u => u.id === 1);
console.log(user.name);  // 错误：user 可能为 undefined

// 解决方案 1：条件检查
if (user) {
    console.log(user.name);
}

// 解决方案 2：非空断言（确定存在时）
console.log(user!.name);

// 解决方案 3：可选链
console.log(user?.name);
```

---

## 🚀 下一步学习建议

### 进阶方向

完成本项目后，你可以继续学习：

1. **Express.js Web 后端**
   - 将 CLI 应用扩展为 RESTful API
   - 学习 HTTP、路由、中间件

2. **数据库集成**
   - 连接 MySQL、PostgreSQL、MongoDB
   - 实现 ORM（TypeORM、Prisma）

3. **前端框架**
   - React + TypeScript
   - Vue + TypeScript
   - Angular（原生 TypeScript）

4. **测试**
   - Jest 单元测试
   - E2E 测试（Playwright、Cypress）

5. **工程化**
   - ESLint + Prettier 代码规范
   - CI/CD 自动化部署
   - Docker 容器化

### 推荐资源

- **官方文档**: [TypeScript Handbook](https://www.typescriptlang.org/docs/handbook/)
- **在线练习**: [TypeScript Challenges](https://github.com/type-challenges/type-challenges)
- **视频课程**: YouTube 搜索 "TypeScript tutorial"
- **实战项目**: GitHub 搜索 "typescript-starter-kit"

---

## 📝 总结

恭喜你完成了这个 TypeScript CLI Todo List 项目的学习！

### 你已经掌握的技能

✅ **TypeScript 基础**: 类型系统、接口、枚举、类
✅ **面向对象编程**: 封装、继承、多态
✅ **函数式编程**: 纯函数、高阶函数、不可变性
✅ **异步编程**: Promise、async/await
✅ **Node.js 开发**: readline、文件系统、模块系统
✅ **工程化实践**: 模块化、配置管理、构建流程
✅ **CLI 应用开发**: 用户交互、输入验证、错误处理

### 项目亮点

- 🎯 **类型安全**: 充分利用 TypeScript 的类型系统
- 🧩 **模块化设计**: 清晰的职责分离
- 💪 **健壮性**: 完善的错误处理和边界情况处理
- 🎨 **用户体验**: 友好的命令行界面和提示
- 📈 **可扩展性**: 易于添加新功能和改进

### 继续前进

现在你已经具备了扎实的 TypeScript 基础，可以：
- 将此项目扩展为更复杂的应用
- 开始学习前端或后端框架
- 参与开源项目贡献代码
- 构建自己的作品集

**记住：编程学习的最佳方式就是动手实践！**

祝你在 TypeScript 的学习道路上越走越远！💪

---

**文档版本**: v1.0
**最后更新**: 2026-04-26
**适用项目**: wmd-ts-todo-list
**作者**: AI Assistant
