# TypeScript CLI Todo List - 完整逐步实现教程

> **项目来源**: [wmd-ts-todo-list](https://github.com/hassan-ak/wmd-ts-todo-list)
>
> **教程特点**: 从零开始，每步都可运行，含 Git/GitHub 版本管理
>
> **适用人群**: TypeScript 初学者

---

## 📋 目录

- [第0章：环境准备与 Git 基础](#第0章环境准备与git基础)
- [第1章：项目初始化 + Git 仓库创建](#第1章项目初始化--git-仓库创建)
- [第2章：类型定义模块](#第2章类型定义模块)
- [第3章：核心逻辑模块](#第3章核心逻辑模块)
- [第4章：工具函数模块](#第4章工具函数模块)
- [第5章：主程序入口](#第5章主程序入口)
- [第6章：整合测试与 GitHub 发布](#第6章整合测试与github发布)
- [附录：常用命令速查表](#附录常用命令速查表)

---

## 第0章：环境准备与 Git 基础

### 0.1 前置要求

在开始之前，确保你的电脑已安装：

| 软件 | 版本要求 | 检查命令 |
|------|---------|---------|
| **Node.js** | >= 18.0.0 | `node --version` |
| **npm** | >= 9.0.0 | `npm --version` |
| **Git** | >= 2.30.0 | `git --version` |
| **代码编辑器** | VS Code 推荐 | - |

**如何检查**：打开终端/命令提示符，输入上述命令，如果显示版本号则已安装。

---

### 0.2 Git 安装与配置（如未安装）

#### Windows 用户：

1. 访问 [Git 官网](https://git-scm.com/download/win) 下载安装包
2. 双击安装程序，一路点击 **Next**（保持默认选项）
3. 安装完成后，右键桌面应该能看到 **"Git Bash Here"**

#### macOS 用户：

```bash
# 方法1：使用 Homebrew（推荐）
brew install git

# 方法2：通过 Xcode 安装
xcode-select --install
```

#### Linux 用户：

```bash
# Ubuntu/Debian
sudo apt update && sudo apt install git

# CentOS/RHEL
sudo yum install git
```

---

### 0.3 配置 Git 用户信息

**这是必须的步骤！** Git 需要知道你是谁，才能记录每次提交的作者信息。

```bash
# 设置你的用户名（将 "Your Name" 替换为你的名字）
git config --global user.name "Your Name"

# 设置你的邮箱（建议使用 GitHub 注册邮箱）
git config --global user.email "your.email@example.com"
```

**📚 命令详解**：

| 部分 | 含义 |
|------|------|
| `git` | Git 版本控制工具 |
| `config` | 配置命令 |
| `--global` | 全局配置（对所有项目生效） |
| `user.name` | 配置项：用户名 |
| `"Your Name"` | 你的名字（用引号包裹） |

**💡 为什么需要这个？**
- 每次 Git 提交（commit）都会记录作者信息
- 推送到 GitHub 后，能看到谁做了什么修改
- 团队协作时便于沟通和责任追溯

**验证配置是否成功**：
```bash
git config --list
```
应该能看到你刚才设置的用户名和邮箱。

---

### 0.4 GitHub 账号准备

1. 访问 [github.com](https://github.com) 注册账号（如果还没有）
2. 记住你的用户名和邮箱
3. （可选）配置 SSH 密钥或使用 HTTPS 方式连接

---

## 第1章：项目初始化 + Git 仓库创建

### 🎯 本章目标
- 创建项目目录结构
- 初始化 npm 项目
- 安装 TypeScript 相关依赖
- 创建 **Git 仓库**并完成首次提交
- （可选）关联 GitHub 远程仓库

---

### 步骤 1.1：创建项目目录

```bash
# 在你想存放项目的位置（比如桌面或 Documents）
mkdir ts-todo-list

# 进入项目目录
cd ts-todo-list
```

**📚 命令详解**：

| 命令 | 全称 | 含义 |
|------|------|------|
| `mkdir` | make directory | 创建新目录/文件夹 |
| `ts-todo-list` | 目录名称 | 你可以改成任何名字 |
| `cd` | change directory | 进入/切换到指定目录 |

**💡 提示**：
- Windows 用户可以在文件资源管理器中手动创建文件夹，然后右键选择"在此处打开终端"
- 路径中不要包含中文或空格，避免潜在问题

---

### 步骤 1.2：初始化 npm 项目

```bash
npm init -y
```

**📚 命令详解**：

| 部分 | 含义 |
|------|------|
| `npm` | Node Package Manager（Node 包管理器） |
| `init` | initialize（初始化） |
| `-y` | yes（自动确认所有默认选项） |

**执行后会生成 `package.json` 文件**，内容如下：

```json
{
  "name": "ts-todo-list",          // 项目名称（默认取目录名）
  "version": "1.0.0",              // 版本号（语义化版本：主.次.修订）
  "description": "",               // 项目描述（可以后续补充）
  "main": "index.js",              // 入口文件路径
  "scripts": {                     // 可执行的脚本命令
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "keywords": [],                  // 关键词（用于 npm 搜索）
  "author": "",                    // 作者
  "license": "ISC",                // 开源协议（ISC 是宽松协议）
  "dependencies": {},              // 生产依赖（目前为空）
  "devDependencies": {}            // 开发依赖（目前为空）
}
```

**💡 package.json 关键字段说明**：

- **name**: 发布到 npm 时的包名，必须唯一
- **version**: 遵循 [语义化版本](https://semver.org/) 规范
- **main**: 当别人 `require()` 你的包时加载的文件
- **scripts**: 定义快捷命令，例如 `npm run build` 会执行 scripts.build 对应的命令
- **dependencies**: 运行代码时需要的包（生产环境也需要）
- **devDependencies**: 开发时才需要的包（编译器、测试工具等）

---

### 步骤 1.3：安装 TypeScript 开发依赖

```bash
npm install typescript ts-node @types/node --save-dev
```

**📚 命令详解**：

| 部分                    | 含义                              |
| --------------------- | ------------------------------- |
| `install` (或简写 `i`)   | 安装指定的 npm 包                     |
| `typescript`          | TypeScript 编译器（将 .ts 编译为 .js）   |
| `ts-node`             | 直接运行 .ts 文件的工具（无需先编译）           |
| `@types/node`         | Node.js 内置模块的 TypeScript 类型定义   |
| `--save-dev` (或 `-D`) | 保存为**开发依赖**（写入 devDependencies） |

**这三个包的作用**：

1. **typescript**: 核心编译器，负责类型检查和代码转换
2. **ts-node**: 开发神器，让你能像运行 JavaScript 一样直接运行 TypeScript
3. **@types/node**: 让 TypeScript 理解 Node.js 的 API（如 `readline`, `fs` 等）

**💡 生产依赖 vs 开发依赖的区别**：

```
dependencies（生产依赖）
├── 运行应用时必需
├── 会随项目一起部署到服务器
└── 示例: express, lodash, axios

devDependencies（开发依赖）
├── 仅开发和构建时需要
├── 不会部署到生产环境
└── 示例: typescript, eslint, webpack, jest
```

**执行后 `package.json` 会新增**：
```json
{
  "devDependencies": {
    "@types/node": "^20.11.0",
    "ts-node": "^10.9.2",
    "typescript": "^5.3.3"
  }
}
```

同时会生成 **package-lock.json**（锁定精确版本号）和 **node_modules/** 文件夹（存储实际下载的包）。

---

### 步骤 1.4：创建 TypeScript 配置文件

有两种方式创建 `tsconfig.json`：

**方式一：使用命令自动生成（然后手动修改）**
```bash
npx tsc --init
```
这会生成一个包含所有选项的配置文件（几百行），你需要删除大部分注释。

**方式二：手动创建（推荐，更简洁）**

在项目根目录创建文件 `tsconfig.json`，内容如下：

```json
{
  "compilerOptions": {
    /* 语言与环境设置 */
    "target": "ES2020",
    "module": "commonjs",
    "lib": ["ES2020"],

    /* 输出配置 */
    "outDir": "./dist",
    "rootDir": "./src",

    /* 严格模式（强烈推荐开启！） */
    "strict": true,
    "noImplicitAny": true,
    "strictNullChecks": true,

    /* 模块解析 */
    "moduleResolution": "node",
    "esModuleInterop": true,
    "resolveJsonModule": true,

    /* 其他 */
    "skipLibCheck": true,
    "forceConsistentCasingInFileNames": true,
    "sourceMap": true
  },
  "include": ["src/**/*"],
  "exclude": ["node_modules", "dist"]
}
```

**📚 配置项详解**：

| 配置项               | 值                          | 含义                           |
| ----------------- | -------------------------- | ---------------------------- |
| `target`          | `"ES2020"`                 | 编译目标：将 TS 转换为 ES2020 标准的 JS  |
| `module`          | `"commonjs"`               | 模块系统：CommonJS 格式（Node.js 使用） |
| `lib`             | `["ES2020"]`               | 包含的类型库定义                     |
| `outDir`          | `"./dist"`                 | 编译后的 JS 文件输出到 dist 目录        |
| `rootDir`         | `"./src"`                  | 源代码（TS 文件）存放在 src 目录         |
| `strict`          | `true`                     | **开启严格模式**（帮你发现很多潜在错误）       |
| `esModuleInterop` | `true`                     | 允许 CommonJS 和 ES Module 互操作  |
| `include`         | `["src/**/*"]`             | 编译哪些文件（src 下所有文件）            |
| `exclude`         | `["node_modules", "dist"]` | 排除哪些目录不编译                    |

**💡 为什么需要 tsconfig.json？**
- 告诉 TypeScript 编译器如何工作
- 类似于项目的"规则手册"
- VS Code 会读取它来提供智能提示和错误检查

---

### 步骤 1.5：创建源代码目录结构

```bash
# 创建 src 目录（用于存放所有 TypeScript 源代码）
mkdir src
```

**最终目录结构应该是这样**：
```
ts-todo-list/
├── src/                  # 源代码目录（我们写代码的地方）
├── node_modules/         # 依赖包（自动生成，不要手动修改）
├── package.json          # 项目配置
├── package-lock.json     # 依赖锁定文件
└── tsconfig.json         # TypeScript 配置
```

---

### 步骤 1.6：添加 npm 脚本命令

编辑 `package.json`，在 `scripts` 部分添加以下内容：

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
  "author": "Your Name",
  "license": "ISC",
  "devDependencies": {
    "@types/node": "^20.11.0",
    "ts-node": "^10.9.2",
    "typescript": "^5.3.3"
  }
}
```

**📚 新增脚本命令说明**：

| 命令 | 实际执行的操作 | 用途 |
|------|---------------|------|
| `npm start` | `ts-node src/index.ts` | 启动应用（开发调试用） |
| `npm run build` | `tsc` | 将 TypeScript 编译为 JavaScript |
| `npm run run` | `node dist/index.js` | 运行编译后的版本 |
| `npm run dev` | `ts-node --watch src/index.ts` | 监听文件变化自动重启 |

**💡 使用方式**：在终端输入 `npm start` 就等同于执行 `ts-node src/index.ts`

---

### ✅ 阶段一完成标志

此时你应该能够：
- ✅ 看到 `package.json`、`tsconfig.json`、`node_modules/`、`src/` 这些文件/文件夹
- ✅ 执行 `npx tsc --version` 能看到 TypeScript 版本号

---

## 🔧 Git 操作：初始化仓库 + 首次提交

现在项目的基础框架已经搭建好了，让我们开始使用 **Git 进行版本管理**！

---

### 步骤 1.7：初始化 Git 仓库

```bash
git init
```

**📚 命令详解**：

| 部分 | 含义 |
|------|------|
| `git` | 版本控制工具 |
| `init` | initialize（初始化） |

**执行后会发生什么**：
- 在当前目录下创建一个隐藏的 `.git` 文件夹
- 这个文件夹存储了所有的版本历史记录
- **不要删除或修改 .git 文件夹！**

**输出示例**：
```
Initialized empty Git repository in D:/your-path/ts-todo-list/.git/
```

这意味着：**Git 仓库已经创建成功！** 但还是空的，没有任何提交记录。

---

### 步骤 1.8：创建 .gitignore 文件

在项目根目录创建 `.gitignore` 文件（注意前面有个点），内容如下：

```gitignore
# 依赖目录（太大，不需要上传）
node_modules/

# 编译输出（可以从源码重新生成）
dist/

# 编辑器配置
.vscode/
.idea/

# 系统文件
.DS_Store
Thumbs.db

# 日志文件
*.log

# 环境变量（包含敏感信息）
.env
.env.local
```

**📚 什么是 .gitignore？**
- 告诉 Git **哪些文件/文件夹不要纳入版本管理**
- `node_modules/` 通常有几百兆，没必要上传（其他人可以通过 `npm install` 重新下载）
- `dist/` 是编译产物，可以从 `src/` 重新生成
- `.env` 可能包含密码、API Key 等敏感信息，绝对不能上传！

**💡 常见忽略规则**：
- `node_modules/` - 忽略整个文件夹
- `*.log` - 忽略所有 .log 结尾的文件
- `.env` - 忽略特定文件
- `!important.log` - 忽略所有 .log 但保留 important.log（! 表示排除）

---

### 步骤 1.9：查看当前状态

```bash
git status
```

**📚 命令详解**：

| 部分 | 含义 |
|------|------|
| `status` | 状态查看命令 |

**你会看到类似这样的输出**：
```
On branch main
No commits yet

Untracked files:
  (use "git add <file>..." to include in what will be committed)
        .gitignore
        package.json
        package-lock.json
        tsconfig.json

nothing added to commit but untracked files present (use "git add" to track)
```

**解读**：
- `On branch main`: 当前在 **main 分支**（主分支）
- `No commits yet`: 还没有过任何提交
- `Untracked files`: 这些文件是**新的**，Git 还没开始跟踪它们
- 红色文字 = 未暂存的文件

**💡 Git 的三个区域**：

```
工作区（Working Directory）      暂存区（Staging Area）       仓库区（Repository）
┌─────────────────┐          ┌─────────────────┐          ┌─────────────────┐
│  你编辑的文件    │ ──add──▶ │  准备提交的文件  │ ──commit─▶ │  已保存的版本   │
│                 │          │                 │          │                 │
│ • package.json  │          │ • 已 add 的文件  │          │ • 历史版本记录   │
│ • src/index.ts  │          │                 │          │                 │
└─────────────────┘          └─────────────────┘          └─────────────────┘
     编辑文件                      git add                   git commit
```

---

### 步骤 1.10：添加文件到暂存区

```bash
git add .
```

**📚 命令详解**：

| 部分 | 含义 |
|------|------|
| `add` | 添加到暂存区 |
| `.` | 当前目录下的所有文件（符合 .gitignore 规则的） |

**或者逐个添加**（更可控）：
```bash
git add .gitignore
git add package.json
git add package-lock.json
git add tsconfig.json
```

**再次查看状态**：
```bash
git status
```

现在应该看到：
```
Changes to be committed:
  (use "git restore --staged <file>..." to unstage)
        new file:   .gitignore
        new file:   package.json
        new file:   package-lock.json
        new file:   tsconfig.json
```

**绿色文字** = 已暂存，准备好提交了！

---

### 步骤 1.11：首次提交（Commit）

```bash
git commit -m "feat: 项目初始化 - 配置 TypeScript 开发环境"
```

**📚 命令详解**：

| 部分 | 含义 |
|------|------|
| `commit` | 提交（创建一个版本快照） |
| `-m` | message（提交消息） |
| `"feat: ..."` | 提交信息（说明这次改了什么） |

**💡 提交信息规范（Conventional Commits）**：

| 前缀 | 类型 | 说明 |
|------|------|------|
| `feat:` | 新功能 | 新增功能或文件 |
| `fix:` | 修复 Bug | 修复问题 |
| `docs:` | 文档 | 只改了文档 |
| `style:` | 格式 | 代码格式调整（不影响逻辑） |
| `refactor:` | 重构 | 重构代码（不新增功能也不修 bug） |
| `test:` | 测试 | 添加或修改测试 |
| `chore:` | 杂项 | 构建过程、依赖变动等 |

**示例**：
- `feat: 添加用户登录功能`
- `fix: 修复密码验证的边界情况`
- `docs: 更新 README 安装说明`
- `chore: 升级 TypeScript 到 v5.3`

**提交成功后的输出**：
```
[main (root-commit) a1b2c3d] feat: 项目初始化 - 配置 TypeScript 开发环境
 4 files changed, 87 insertions(+)
 create mode 100644 .gitignore
 create mode 100644 package.json
 create mode 100644 package-lock.json
 create mode 100644 tsconfig.json
```

**解读**：
- `[main (root-commit) a1b2c3d]` - 这是第一个提交（root-commit），提交 ID 是 a1b2c3d
- `4 files changed, 87 insertions(+)` - 改动了 4 个文件，新增 87 行

---

### 步骤 1.12：查看提交历史

```bash
git log
```

**输出示例**：
```
commit a1b2c3d4e5f6g7h8i9j0k1l2m3n4o5p6q7r8s9t0 (HEAD -> main)
Author: Your Name <your.email@example.com>
Date:   Mon Jan 1 10:00:00 2024 +0800

    feat: 项目初始化 - 配置 TypeScript 开发环境
```

**📚 命令详解**：
- `log` - 查看提交历史日志
- 可以看到每次提交的：ID、作者、时间、提交信息

**其他有用的变体**：
```bash
git log --oneline          # 简洁模式（只显示一行）
git log --oneline --graph  # 图形化显示分支合并情况
git log -5                 # 只看最近 5 次提交
```

---

### 🌐 （可选）步骤 1.13：关联 GitHub 远程仓库

如果你想把代码推送到 GitHub（推荐！），按以下步骤操作：

#### 1. 在 GitHub 上创建新仓库

1. 登录 [github.com](https://github.com)
2. 点击右上角 **"+"** → **"New repository"**
3. 填写信息：
   - **Repository name**: `ts-todo-list`（或你喜欢的名字）
   - **Description**: `A CLI Todo List built with TypeScript`
   - **Visibility**: Public（公开）或 Private（私有）
4. **⚠️ 重要：不要勾选** "Add a README file"、".gitignore"、"Choose a license"
   - 因为我们本地已经有代码了，如果远程仓库也有文件会冲突
5. 点击 **"Create repository"**

#### 2. 关联本地仓库到远程

GitHub 创建成功后会显示一些命令，复制执行：

```bash
# 添加远程仓库地址（HTTPS 方式）
git remote add origin https://github.com/YOUR_USERNAME/ts-todo-list.git

# 或者 SSH 方式（如果你配置了 SSH 密钥）
# git remote add origin git@github.com:YOUR_USERNAME/ts-todo-list.git
```

**📚 命令详解**：

| 部分 | 含义 |
|------|------|
| `remote` | 远程仓库 |
| `add` | 添加 |
| `origin` | 远程仓库的别名（习惯上叫 origin） |
| `URL` | 仓库地址（把 YOUR_USERNAME 替换成你的 GitHub 用户名） |

**验证远程仓库是否添加成功**：
```bash
git remote -v
```
应该看到：
```
origin  https://github.com/YOUR_USERNAME/ts-todo-list.git (fetch)
origin  https://github.com/YOUR_USERNAME/ts-todo-list.git (push)
```

#### 3. 推送到 GitHub

```bash
# 第一次推送需要 -u 参数，建立本地分支和远程分支的关联
git push -u origin main
```

**📚 命令详解**：

| 部分 | 含义 |
|------|------|
| `push` | 推送（将本地提交上传到远程） |
| `-u` | upstream（设置上游分支，以后可以直接 `git push`） |
| `origin` | 推送到哪个远程仓库 |
| `main` | 推送哪个本地分支 |

**如果推送时要求登录**：
- 会弹出浏览器窗口让你授权 GitHub
- 或者在终端输入用户名和 **Personal Access Token**（不是密码！）

**推送成功后**，刷新你的 GitHub 仓库页面，就能看到代码了！🎉

---

### 📊 第1章总结

**✅ 你已经完成了**：
1. ✅ 创建项目目录和 npm 项目
2. ✅ 安装 TypeScript、ts-node、@types/node
3. ✅ 配置 tsconfig.json
4. ✅ 创建 src 目录结构
5. ✅ 配置 npm 脚本命令
6. ✅ **初始化 Git 仓库**
7. ✅ **创建 .gitignore**
8. ✅ **完成首次 Git 提交**
9. ✅ **（可选）推送到 GitHub**

**🎯 当前项目状态**：
```
✅ 可运行的空项目（无源代码）
✅ Git 版本管理已启用
✅ GitHub 远程仓库已关联（如果执行了步骤 1.13）
```

**📝 本章节掌握的 Git 命令**：

| 命令 | 用途 |
|------|------|
| `git init` | 初始化本地仓库 |
| `git status` | 查看工作区状态 |
| `git add <file>` | 添加文件到暂存区 |
| `git commit -m "msg"` | 提交更改 |
| `git log` | 查看提交历史 |
| `git remote add origin <url>` | 添加远程仓库 |
| `git push -u origin main` | 推送到远程 |

---

## 第2章：类型定义模块

### 🎯 本章目标
- 学习 TypeScript 的**类型系统**（接口、枚举、类型别名）
- 为待办事项应用定义清晰的数据结构
- 完成编码后进行 **Git 提交**

---

### 步骤 2.1：创建类型定义文件

在 `src/` 目录下创建文件 `types.ts`，输入以下代码：

```typescript
/**
 * 待办事项状态枚举
 *
 * 【概念讲解】什么是枚举（Enum）？
 * 枚举是一种特殊的数据类型，用于定义一组命名的常量。
 * 它让代码更具可读性，避免使用魔法数字或字符串。
 *
 * 例如：不用记 0=待处理, 1=进行中, 2=已完成，
 *       而是用 TodoStatus.PENDING 这种有意义的名字。
 */
export enum TodoStatus {
    PENDING = "pending",           // 待处理
    IN_PROGRESS = "in-progress",   // 进行中
    COMPLETED = "completed"        // 已完成
}

/**
 * 待办事项接口
 *
 * 【概念讲解】什么是接口（Interface）？
 * 接口定义了一个对象应该具有的结构（形状）。
 * 它就像一份"合同"或"蓝图"，规定对象必须有哪些属性、各是什么类型。
 *
 * TypeScript 会在编译时检查对象是否符合接口定义，
 * 如果不符合就会报错，从而避免很多低级 bug。
 */
export interface ITodoItem {
    id: number;                    // 唯一标识符（数字类型）
    title: string;                 // 任务标题（字符串类型）
    description?: string;          // 任务描述（可选，? 表示可以不存在）
    status: TodoStatus;            // 任务状态（使用上面定义的枚举类型）
    createdAt: Date;               // 创建时间（日期类型）
    updatedAt: Date;               // 最后更新时间（日期类型）
}

/**
 * 待办事项列表类型
 *
 * 【概念讲解】什么是类型别名（Type Alias）？
 * 类型别名给现有的类型起一个新的名字，让复杂数据类型更易用。
 * 这里 TodoList 就是 ITodoItem[]（ITodoItem 数组）的别名。
 *
 * 使用场景：
 * - 给复杂类型起个短名字
 * - 联合类型、交叉类型的命名
 * - 条件类型的命名
 */
export type TodoList = ITodoItem[];

/**
 * 用户操作枚举
 *
 * 定义用户在菜单中可以选择的操作编号
 */
export enum UserAction {
    ADD = "1",                     // 添加新任务
    DISPLAY = "2",                 // 显示所有任务
    TOGGLE_STATUS = "3",           // 切换任务状态
    REMOVE_COMPLETED = "4",        // 清理已完成任务
    QUIT = "5"                     // 退出应用
}
```

**📚 代码逐行详解**：

#### 1. `export` 关键字
```typescript
export enum TodoStatus { ... }
```
- **含义**：导出这个类型/变量，让其他文件可以通过 `import` 引入使用
- **对比**：如果不写 `export`，这个类型只能在当前文件内使用

#### 2. `enum`（枚举）
```typescript
enum TodoStatus {
    PENDING = "pending",
    IN_PROGRESS = "in-progress",
    COMPLETED = "completed"
}
```
- **用途**：定义一组相关的命名常量
- **好处**：代码可读性好，避免拼写错误
- **使用方式**：`TodoStatus.PENDING`、`TodoStatus.COMPLETED`
- **这里用的是字符串枚举**（每个值都是字符串），也可以用数字枚举（默认从 0 开始自增）

#### 3. `interface`（接口）
```typescript
interface ITodoItem {
    id: number;
    title: string;
    description?: string;  // ⬅ 注意这个问号
    status: TodoStatus;
    createdAt: Date;
    updatedAt: Date;
}
```
- **用途**：定义对象的形状（结构）
- **属性规则**：
  - `id: number` - 必须有 id 属性，且必须是数字
  - `description?: string` - **可选属性**（`?` 标记），可以有也可以没有
- **命名惯例**：接口通常以 `I` 开头（Interface 的缩写），但这不是强制的

#### 4. `type`（类型别名）
```typescript
type TodoList = ITodoItem[];
```
- **用途**：给复杂类型起个简单的名字
- **`[]` 表示数组**：`ITodoItem[]` 就是 "ITodoItem 类型的数组"
- **使用场景**：当同一个复杂类型在多处使用时，用类型别名避免重复

---

### 步骤 2.2：验证类型定义（创建测试文件）

在 `src/` 目录下创建 `test-types.ts`（仅用于学习验证，后面可以删除）：

```typescript
// 导入我们在 types.ts 中定义的类型
import { ITodoItem, TodoList, TodoStatus, UserAction } from './types';

// ========== 测试 1：创建符合接口的对象 ==========
const todo: ITodoItem = {
    id: 1,
    title: "学习 TypeScript",
    status: TodoStatus.PENDING,
    createdAt: new Date(),
    updatedAt: new Date()
    // description 是可选的，所以可以不写
};

console.log("✅ 测试1通过：符合接口的对象创建成功");
console.log(todo);

// ========== 测试 2：使用类型别名 ==========
const myList: TodoList = [];  // 等同于 const myList: ITodoItem[] = [];
myList.push(todo);

console.log("✅ 测试2通过：类型别名正常工作");
console.log("列表长度:", myList.length);

// ========== 测试 3：使用枚举 ==========
const action: UserAction = UserAction.ADD;

console.log("✅ 测试3通过：枚举值:", action);

// ========== 测试 4：TypeScript 类型检查演示 ==========
// 下面这行如果取消注释会报错！
// const badTodo: ITodoItem = { id: "不是数字" };  // ❌ 错误：id 应该是 number

console.log("\n🎉 所有类型测试通过！");
```

**运行测试**：
```bash
npx ts-node src/test-types.ts
```

**预期输出**：
```
✅ 测试1通过：符合接口的对象创建成功
{ id: 1, title: '学习 TypeScript', ..., status: 'pending' }
✅ 测试2通过：类型别名正常工作
列表长度: 1
✅ 测试3通过：枚举值: 1

🎉 所有类型测试通过！
```

**📚 命令详解**：

| 部分 | 含义 |
|------|------|
| `npx` | execute npm package binaries（临时执行 npm 包的可执行文件） |
| `ts-node` | TypeScript 执行引擎（直接运行 .ts 文件） |
| `src/test-types.ts` | 要运行的文件路径 |

---

### 🔧 Git 操作：第2章提交

现在我们已经完成了类型定义模块，让我们提交这次更改。

#### 查看当前状态
```bash
git status
```

**预期输出**：
```
Untracked files:
  (use "git add <file>..." to include in what will be committed)
        src/types.ts
        src/test-types.ts
```

#### 添加文件到暂存区
```bash
git add src/types.ts src/test-types.ts
```

**或者一次性添加所有新文件**：
```bash
git add .
```

#### 再次查看状态（确认已暂存）
```bash
git status
```

**预期输出**（绿色文字表示已暂存）：
```
Changes to be committed:
  (use "git restore --staged <file>..." to unstage)
        new file:   src/types.ts
        new file:   src/test-types.ts
```

#### 提交更改
```bash
git commit -m "feat: 添加类型定义模块 - 定义 Todo 数据结构"
```

**💡 提交信息说明**：
- `feat:` 表示这是一个新功能
- 内容简洁明了地说明了本次改动

#### （可选）推送到 GitHub
```bash
git push
```

**因为之前用了 `-u origin main`，现在只需 `git push` 即可**。

---

### 📊 第2章总结

**✅ 你已经完成了**：
1. ✅ 学习了 TypeScript 三大类型定义方式：**枚举、接口、类型别名**
2. ✅ 创建了 `types.ts` 文件，定义了所有数据结构
3. ✅ 通过测试文件验证了类型定义的正确性
4. ✅ 完成了 **Git 提交**

**📝 本章节学习的 TypeScript 概念**：

| 概念 | 关键字 | 用途 |
|------|--------|------|
| 枚举 | `enum` | 定义一组命名常量 |
| 接口 | `interface` | 定义对象的结构 |
| 可选属性 | `?:` | 标记可有可无的属性 |
| 类型别名 | `type` | 给类型起别名 |
| 导出 | `export` | 让其他文件可以使用 |
| 导入 | `import` | 引入其他文件的导出 |

**📝 本章节使用的 Git 命令**：

| 命令 | 用途 |
|------|------|
| `git status` | 查看哪些文件被修改了 |
| `git add <files>` | 暂存要提交的文件 |
| `git commit -m "msg"` | 创建一个提交记录 |
| `git push` | 推送到远程仓库 |

---

## 第3章：核心逻辑模块

### 🎯 本章目标
- 学习 **面向对象编程（OOP）**：类（Class）、方法、属性
- 实现 TodoManager 类，包含增删改查（CRUD）所有功能
- 完成编码后进行 **Git 提交**

---

### 步骤 3.1：创建核心逻辑文件

在 `src/` 目录下创建 `todo.ts`，输入以下代码：

```typescript
/**
 * 导入类型定义
 *
 * 【概念讲解】import 语句
 * import 用于从其他模块引入导出的内容。
 * 这里的相对路径 './types' 表示同一目录下的 types.ts 文件
 * （.ts 扩展名可以省略）
 */
import { ITodoItem, TodoList, TodoStatus } from './types';

/**
 * TodoManager 类
 *
 * 【概念讲解】什么是类（Class）？
 * 类是面向对象编程的核心概念，它是创建对象的"模板"或"蓝图"。
 * 类封装了数据（属性/状态）和行为（方法/函数）。
 *
 * 好比"汽车图纸"是一个类，根据图纸造出来的每一辆具体的汽车就是"对象"（实例）。
 *
 * 设计原则：
 * - 单一职责：这个类只负责管理待办事项
 * - 封装：内部数据对外部隐藏，只能通过公开的方法访问
 * - 开闭原则：易于扩展新功能而不需修改已有代码
 */
export class TodoManager {
    /**
     * 私有属性：待办事项列表
     *
     * 【概念讲解】private 访问修饰符
     * private 表示这个属性只能在类内部访问，外部无法直接读写。
     * 这就是"封装"——保护数据不被随意篡改。
     *
     * TodoList 是我们在 types.ts 中定义的类型别名，
     * 表示"由 ITodoItem 组成的数组"，初始值为空数组 []。
     */
    private todos: TodoList = [];

    /**
     * 私有属性：下一个可用的 ID
     * 用于自动生成唯一 ID，初始值为 1
     */
    private nextId: number = 1;

    /**
     * 添加新的待办事项
     *
     * @param title - 任务标题（必填，string 类型）
     * @param description - 任务描述（可选，string 类型，? 表示可选参数）
     * @returns 新创建的 ITodoItem 对象
     *
     * 【概念讲解】方法的类型注解
     * - 参数列表：(title: string, description?: string)
     *   每个 参数名:类型 都明确了参数应该是什么类型
     *   ? 表示该参数是可选的，调用时可以不传
     *
     * - 返回类型：: ITodoItem
     *   明确声明这个方法返回什么类型的数据
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
     * 根据 ID 获取单个待办事项
     */
    getTodoById(id: number): ITodoItem | undefined {
        return this.todos.find(todo => todo.id === id);
    }

    /**
     * 获取所有待办事项（返回副本，保护原始数据）
     */
    getAllTodos(): TodoList {
        return [...this.todos];
    }

    /**
     * 根据状态筛选待办事项
     */
    getTodosByStatus(status: TodoStatus): TodoList {
        return this.todos.filter(todo => todo.status === status);
    }

    /**
     * 更新待办事项的标题
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
     */
    toggleTodoStatus(id: number, newStatus?: TodoStatus): boolean {
        const todo = this.getTodoById(id);
        if (!todo) {
            return false;
        }

        if (newStatus) {
            todo.status = newStatus;
        } else {
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
     */
    removeTodo(id: number): boolean {
        const initialLength = this.todos.length;
        this.todos = this.todos.filter(todo => todo.id !== id);
        return this.todos.length < initialLength;
    }

    /**
     * 删除所有已完成的待办事项
     */
    removeCompletedTodos(): number {
        const completedCount = this.getTodosByStatus(TodoStatus.COMPLETED).length;
        this.todos = this.todos.filter(todo => todo.status !== TodoStatus.COMPLETED);
        return completedCount;
    }

    /**
     * 获取统计信息
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
     * 搜索待办事项（模糊匹配标题和描述）
     */
    searchTodos(keyword: string): TodoList {
        const lowerKeyword = keyword.toLowerCase();
        return this.todos.filter(todo => {
            const titleMatch = todo.title.toLowerCase().includes(lowerKeyword);
            const descMatch = todo.description
                ? todo.description.toLowerCase().includes(lowerKeyword)
                : false;
            return titleMatch || descMatch;
        });
    }

    /**
     * 清空所有待办事项（重置）
     */
    clearAll(): void {
        this.todos = [];
        this.nextId = 1;
    }

    /**
     * 获取下一个 ID（供外部验证使用）
     */
    getNextId(): number {
        return this.nextId;
    }
}
```

**📚 核心概念详解**：

#### 1. 类的基本结构
```typescript
export class TodoManager {
    private todos: TodoList = [];   // 属性：数据
    private nextId: number = 1;    // 属性：状态

    addTodo(...): ITodoItem { ... }  // 方法：行为
}
```
- **class**: 定义类的关键字
- **export**: 导出类，让其他文件可以使用
- **属性**: 类的数据成员（变量）
- **方法**: 类的行为（函数）

#### 2. 访问修饰符
```typescript
private todos: TodoList = [];   // 私有：只有类内部能访问
public getAllTodos(): TodoList { ... }  // 公开：任何地方都能访问（public 可省略）
```

#### 3. 数组的常用方法
```typescript
this.todos.push(newTodo)                          // 添加到末尾
this.todos.find(todo => todo.id === id)             // 查找第一个匹配的
this.todos.filter(todo => todo.status === status)  // 筛选所有匹配的
[...this.todos]                                    // 复制数组（展开运算符）
```

---

### 步骤 3.2：验证核心逻辑（创建测试文件）

在 `src/` 目录下创建 `test-todo.ts`：

```typescript
import { TodoManager } from './todo';
import { TodoStatus } from './types';

const manager = new TodoManager();

console.log("=== 测试 1：添加任务 ===");
const todo1 = manager.addTodo("学习 TypeScript 基础");
console.log("✅ 添加成功:", todo1.title);

const todo2 = manager.addTodo("完成作业", "数学第三章习题");
console.log("✅ 添加成功:", todo2.title, "-", todo2.description);

const todo3 = manager.addTodo("购买 groceries");
console.log("✅ 添加成功:", todo3.title);

console.log("\n=== 测试 2：查询任务 ===");
console.log("所有任务数量:", manager.getAllTodos().length);
console.log("ID=1 的任务:", manager.getTodoById(1)?.title);
console.log("统计信息:", manager.getStatistics());

console.log("\n=== 测试 3：更新状态 ===");
manager.toggleTodoStatus(1, TodoStatus.IN_PROGRESS);
manager.toggleTodoStatus(2, TodoStatus.COMPLETED);
console.log("更新后的统计:", manager.getStatistics());

console.log("\n=== 测试 4：搜索功能 ===");
console.log("搜索 'TypeScript':", manager.searchTodos("TypeScript").length, "个结果");

console.log("\n=== 测试 5：删除功能 ===");
console.log("删除已完成任务数:", manager.removeCompletedTodos());
console.log("剩余任务数:", manager.getAllTodos().length);

console.log("\n🎉 所有核心逻辑测试通过！");
```

**运行测试**：
```bash
npx ts-node src/test-todo.ts
```

**预期输出**：
```
=== 测试 1：添加任务 ===
✅ 添加成功: 学习 TypeScript 基础
✅ 添加成功: 完成作业 - 数学第三章习题
✅ 添加成功: 购买 groceries

=== 测试 2：查询任务 ===
所有任务数量: 3
ID=1 的任务: 学习 TypeScript 基础
统计信息: { total: 3, pending: 1, inProgress: 1, completed: 1 }

=== 测试 3：更新状态 ===
更新后的统计: { total: 3, pending: 1, inProgress: 1, completed: 1 }

=== 测试 4：搜索功能 ===
搜索 'TypeScript': 1 个结果

=== 测试 5：删除功能 ===
删除已完成任务数: 1
剩余任务数: 2

🎉 所有核心逻辑测试通过！
```

---

### 🔧 Git 操作：第3章提交

```bash
git status                    # 查看哪些文件变化了
git add src/todo.ts src/test-todo.ts
git commit -m "feat: 实现核心业务逻辑 - TodoManager 类支持 CRUD 操作"
git push                       # 如果有关联远程仓库
```

---

### 📊 第3章总结

**✅ 你已经完成了**：
1. ✅ 学习了 **类（Class）** 的定义和使用
2. ✅ 理解了 **访问修饰符**（private/public）
3. ✅ 掌握了数组的 **高阶方法**（find/filter/map/push）
4. ✅ 实现了完整的 CRUD 功能
5. ✅ 完成了 **Git 提交**

**📝 本章节学习的 TypeScript/OOP 概念**：

| 概念 | 关键字/语法 | 用途 |
|------|------------|------|
| 类 | `class` | 定义对象的模板 |
| 属性 | `private x: Type` | 类的数据成员 |
| 方法 | `methodName(): Type` | 类的行为 |
| 实例化 | `new ClassName()` | 根据类创建对象 |
| 可选参数 | `(param?: Type)` | 参数可以不传 |
| 箭头函数 | `=> {}` | 简洁的函数写法 |
| 展开运算符 | `[...array]` | 复制/展开数组 |
| 可选链 | `obj?.prop` | 安全访问可能为空的属性 |

---

## 第4章：工具函数模块

### 🎯 本章目标
- 学习 **函数式编程** 思想：纯函数、高阶函数
- 实现辅助功能：表格格式化、输入验证、日期处理等
- 完成编码后进行 **Git 提交**

---

### 步骤 4.1：创建工具函数文件

在 `src/` 目录下创建 `utils.ts`，输入以下代码：

```typescript
import { ITodoItem, TodoList, TodoStatus, UserAction } from './types';

/**
 * 格式化日期为易读的字符串
 *
 * 【纯函数示例】：相同输入永远产生相同输出，无副作用
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
 * 获取状态的显示符号（emoji）
 */
export function getStatusSymbol(status: TodoStatus): string {
    switch (status) {
        case TodoStatus.PENDING:      return "⬜";
        case TodoStatus.IN_PROGRESS:  return "🔄";
        case TodoStatus.COMPLETED:    return "✅";
        default:                      return "❓";
    }
}

/**
 * 获取状态的中文名称
 */
export function getStatusName(status: TodoStatus): string {
    const names: Record<TodoStatus, string> = {
        [TodoStatus.PENDING]: "待处理",
        [TodoStatus.IN_PROGRESS]: "进行中",
        [TodoStatus.COMPLETED]: "已完成"
    };
    return names[status] || "未知";
}

/**
 * 将待办事项列表格式化为表格字符串
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
        const title = (todo.title.length > 24 ? todo.title.substring(0, 21) + "..." : todo.title).padEnd(24);
        const desc = (todo.description && todo.description.length > 16 ? todo.description.substring(0, 13) + "..." : (todo.description || "-")).padEnd(18);
        const date = formatDate(todo.createdAt);
        return `│ ${id}│ ${status}│ ${title}│ ${desc}│ ${date} │`;
    });

    return [header, ...rows, "=".repeat(80)].join('\n');
}

/**
 * 格式化统计信息
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
 * 【重要】类型守卫函数（Type Guard）
 *
 * 验证用户输入是否为有效的操作编号。
 * 当返回 true 时，TypeScript 会将 input 的类型缩小为 UserAction。
 */
export function isValidAction(input: string): input is UserAction {
    return Object.values(UserAction).includes(input as UserAction);
}

/**
 * 验证 ID 是否有效
 */
export function validateId(input: string, maxId: number): { valid: boolean; id?: number } {
    const id = parseInt(input, 10);
    return {
        valid: !isNaN(id) && id > 0 && id <= maxId,
        id: !isNaN(id) ? id : undefined
    };
}

/** 清屏 */
export function clearScreen(): void { console.clear(); }

/** 显示分隔线 */
export function showSeparator(): void { console.log("-".repeat(80)); }

/**
 * 延迟执行（配合 await 使用实现等待效果）
 */
export function delay(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
}
```

**📚 核心概念详解**：

#### 1. 纯函数 vs 非纯函数
```typescript
// 纯函数：相同输入 → 相同输出，无副作用
function formatDate(date: Date): string {
    return `${date.getFullYear()}-...`;
}

// 非纯函数：有副作用（I/O 操作）
function clearScreen(): void {
    console.clear();  // 修改了控制台
}
```

#### 2. 高阶函数
```typescript
// map 接受回调函数作为参数
todos.map(todo => formatRow(todo));

// 返回函数
function createFormatter(prefix: string) {
    return (text: string) => `${prefix}: ${text}`;
}
```

#### 3. 类型守卫（Type Guard）
```typescript
function isValidAction(input: string): input is UserAction {
    return Object.values(UserAction).includes(input as UserAction);
}

// 使用后 TypeScript 能自动缩小类型
if (isValidAction(input)) {
    handleAction(input);  // 这里 input 被 TS 识别为 UserAction 类型
}
```

---

### 步骤 4.2：验证工具函数（创建测试文件）

在 `src/` 目录下创建 `test-utils.ts`：

```typescript
import { ITodoItem, TodoStatus } from './types';
import { formatDate, getStatusSymbol, formatTodoTable, showMenu, isValidAction, validateId } from './utils';

console.log("=== 测试日期格式化 ===");
console.log(formatDate(new Date()));

console.log("\n=== 测试表格格式化 ===");
const testTodos: ITodoItem[] = [
    { id: 1, title: "学习 TypeScript", description: "完成基础教程", status: TodoStatus.IN_PROGRESS, createdAt: new Date(), updatedAt: new Date() },
    { id: 2, title: "完成作业", status: TodoStatus.COMPLETED, createdAt: new Date(), updatedAt: new Date() }
];
console.log(formatTodoTable(testTodos));

console.log("\n=== 测试菜单显示 ===");
console.log(showMenu());

console.log("\n=== 测试输入验证 ===");
console.log("'1' 有效?", isValidAction("1"));   // true
console.log("'6' 有效?", isValidAction("6"));   // false

console.log("\n🎉 所有工具函数测试通过！");
```

**运行测试**：
```bash
npx ts-node src/test-utils.ts
```

---

### 🔧 Git 操作：第4章提交

```bash
git add src/utils.ts src/test-utils.ts
git commit -m "feat: 添加工具函数模块 - 表格格式化和输入验证"
git push
```

---

## 第5章：主程序入口

### 🎯 本章目标
- 学习 **异步编程**：async/await、Promise
- 使用 Node.js **readline** 模块实现命令行交互
- 整合所有模块，实现完整的 CLI 应用
- 完成编码后进行 **Git 提交**

---

### 步骤 5.1：创建主程序文件

在 `src/` 目录下创建 `index.ts`（这是程序的入口点），输入以下代码：

```typescript
#!/usr/bin/env node

/**
 * 主程序入口文件
 * 负责：用户交互、流程控制、协调各模块工作
 */

import * as readline from 'readline/promises';
import { TodoManager } from './todo';
import { UserAction, TodoStatus } from './types';
import {
    showMenu, formatTodoTable, formatStatistics,
    clearScreen, showSeparator, isValidAction, validateId,
    delay, getStatusSymbol, getStatusName
} from './utils';

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

    private async showMainMenu(): Promise<void> {
        console.log(showMenu());
        console.log(formatStatistics(this.manager.getStatistics()));

        const input = await this.rl.question("\n👉 请选择操作 (1-5): ");

        if (!isValidAction(input)) {
            console.log("\n⚠️  无效的选择！");
            await delay(1000);
            clearScreen();
            return;
        }

        clearScreen();

        switch (input) {
            case UserAction.ADD:             await this.handleAddTodo(); break;
            case UserAction.DISPLAY:          await this.handleDisplayTodos(); break;
            case UserAction.TOGGLE_STATUS:    await this.handleToggleStatus(); break;
            case UserAction.REMOVE_COMPLETED: await this.handleRemoveCompleted(); break;
            case UserAction.QUIT:             await this.handleQuit(); break;
        }
    }

    private async handleAddTodo(): Promise<void> {
        console.log("\n📝 添加新任务");
        showSeparator();

        const title = await this.rl.question("请输入任务标题: ");
        if (!title.trim()) {
            console.log("\n⚠️  标题不能为空！");
            await delay(1000);
            return;
        }

        const description = await this.rl.question("请输入任务描述（可选，回车跳过）: ");
        const newTodo = this.manager.addTodo(title, description || undefined);

        console.log("\n✅ 任务添加成功！");
        console.log(formatTodoTable([newTodo]));
        await delay(2000);
    }

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
        await this.rl.question("\n按回车继续...");
    }

    private async handleToggleStatus(): Promise<void> {
        console.log("\n✏️  切换任务状态");
        showSeparator();

        const todos = this.manager.getAllTodos();
        if (todos.length === 0) {
            console.log("\n📭 暂无任务！");
            await delay(1500);
            return;
        }

        console.log(formatTodoTable(todos));

        const input = await this.rl.question("\n请输入任务 ID: ");
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
        console.log("\n可选状态:");
        console.log(`1. ${TodoStatus.PENDING}`);
        console.log(`2. ${TodoStatus.IN_PROGRESS}`);
        console.log(`3. ${TodoStatus.COMPLETED}`);
        console.log("4. 自动切换");

        const choice = await this.rl.question("\n请选择 (1-4): ");
        let success: boolean;

        switch (choice) {
            case "1": success = this.manager.toggleTodoStatus(validation.id, TodoStatus.PENDING); break;
            case "2": success = this.manager.toggleTodoStatus(validation.id, TodoStatus.IN_PROGRESS); break;
            case "3": success = this.manager.toggleTodoStatus(validation.id, TodoStatus.COMPLETED); break;
            case "4": success = this.manager.toggleTodoStatus(validation.id); break;
            default:
                console.log("\n⚠️  无效选择！");
                await delay(1000);
                return;
        }

        if (success) {
            const updated = this.manager.getTodoById(validation.id)!;
            console.log("\n✅ 状态更新成功！");
            console.log(formatTodoTable([updated]));
        }
        await delay(2000);
    }

    private async handleRemoveCompleted(): Promise<void> {
        console.log("\n🗑️  清理已完成任务");
        showSeparator();

        const completed = this.manager.getTodosByStatus(TodoStatus.COMPLETED);
        if (completed.length === 0) {
            console.log("\n📭 暂无已完成任务！");
            await delay(1500);
            return;
        }

        console.log(`即将删除 ${completed.length} 个已完成任务:`);
        console.log(formatTodoTable(completed));

        const confirm = await this.rl.question("\n确认删除? (y/n): ");
        if (confirm.toLowerCase() === 'y') {
            const count = this.manager.removeCompletedTodos();
            console.log(`\n✅ 成功删除 ${count} 个任务！`);
            console.log(formatStatistics(this.manager.getStatistics()));
        } else {
            console.log("\n❌ 取消。");
        }
        await delay(2000);
    }

    private async handleQuit(): Promise<void> {
        console.log("\n👋 感谢使用，再见！");
        await delay(500);
        this.isRunning = false;
        this.rl.close();
    }
}

const app = new TodoApp();
app.start().catch(error => {
    console.error("启动失败:", error);
    process.exit(1);
});
```

**📚 核心概念详解**：

#### 1. async/await 异步编程
```typescript
async start(): Promise<void> {           // async 标记异步方法
    const input = await rl.question(...); // await 等待异步操作完成
}
```
- **async**: 声明函数是异步的，返回 Promise
- **await**: 暂停执行，等待 Promise 完成
- 让异步代码读起来像同步代码一样清晰

#### 2. readline 模块
```typescript
import * as readline from 'readline/promises';  // Promise 版本

const rl = readline.createInterface({ input: process.stdin, output: process.stdout });
const answer = await rl.question("输入: ");    // 等待用户输入
rl.close();                                      // 关闭接口
```

#### 3. while 循环实现持续交互
```typescript
while (this.isRunning) {
    await this.showMainMenu();  // 显示菜单 → 处理选择 → 循环
}
// 当用户选择退出时，isRunning 变为 false，循环结束
```

---

### 步骤 5.2：运行完整应用

```bash
npm start
```

或者：
```bash
npx ts-node src/index.ts
```

你将看到一个交互式的命令行界面！

---

### 🔧 Git 操作：第5章提交

```bash
git add src/index.ts
git commit -m "feat: 实现主程序入口 - CLI 交互界面"
git push
```

---

## 第6章：整合测试与 GitHub 发布

### 🎯 本章目标
- 编译项目确保无错误
- 进行端到端功能测试
- 清理测试文件
- 最终提交并发布到 GitHub

---

### 步骤 6.1：编译项目

```bash
npm run build
```

**预期结果**：
- 无编译错误
- 在 `dist/` 目录下生成 4 个 JS 文件：index.js、todo.js、types.js、utils.js

---

### 步骤 6.2：运行完整测试

```bash
npm start
```

按照以下清单逐一测试：

##### ✅ 测试 1：添加任务
1. 选择 `1`（添加新任务）
2. 输入标题："学习 TypeScript"
3. 输入描述：（可选）
4. 应显示"任务添加成功"

##### ✅ 测试 2：显示任务
1. 先添加几个任务
2. 选择 `2`（显示所有任务）
3. 应显示表格和统计信息

##### ✅ 测试 3：切换状态
1. 选择 `3`（切换状态）
2. 输入任务 ID
3. 选择新状态
4. 应显示更新后的任务

##### ✅ 测试 4：清理已完成
1. 将某个任务标记为已完成
2. 选择 `4`（清理已完成）
3. 确认删除
4. 应显示删除数量

##### ✅ 测试 5：退出
1. 选择 `5`（退出）
2. 应显示告别信息并退出

---

### 步骤 6.3：清理测试文件（可选）

测试完成后，可以删除测试文件：

```bash
rm src/test-types.ts src/test-todo.ts src/test-utils.ts
# Windows: del src\test-types.ts src\test-todo.ts src\test-utils.ts
```

或者保留它们作为参考（建议初学者保留）。

---

### 步骤 6.4：最终 Git 提交

```bash
git status                              # 查看当前状态
git add -A                              # 添加所有更改
git commit -m "feat: 完成 TypeScript CLI Todo List 应用"  # 最终提交
git push                                # 推送到 GitHub
```

---

### 📊 完整项目结构

```
ts-todo-list/
├── src/
│   ├── index.ts              # ✅ 主程序入口
│   ├── todo.ts               # ✅ 核心业务逻辑
│   ├── types.ts              # ✅ 类型定义
│   └── utils.ts              # ✅ 工具函数
├── dist/                     # ✅ 编译输出（自动生成）
├── node_modules/             # 依赖包
├── .gitignore                # ✅ Git 忽略规则
├── package.json              # ✅ 项目配置
├── package-lock.json         # 依赖锁定
├── tsconfig.json             # ✅ TS 编译配置
└── .git/                     # Git 仓库数据（隐藏）
```

---

### 📈 Git 提交历史一览

完成整个项目后，你的 Git 历史应该是这样的：

```
* a1b2c3d (HEAD -> main, origin/main) feat: 完成 TypeScript CLI Todo List 应用
* e5f6g7h feat: 实现主程序入口 - CLI 交互界面
* i9j0k1l feat: 添加工具函数模块 - 表格格式化和输入验证
* m2n3o4p feat: 实现核心业务逻辑 - TodoManager 类支持 CRUD 操作
* q5r6s7t feat: 添加类型定义模块 - 定义 Todo 数据结构
* u8v9w0x feat: 项目初始化 - 配置 TypeScript 开发环境
```

每一次提交都是一个**可回退的安全节点**！如果某一步出错了，你可以随时回到之前的任何一次提交。

---

## 附录：常用命令速查表

### npm 命令

| 命令 | 说明 |
|------|------|
| `npm init -y` | 初始化项目（生成 package.json） |
| `npm install <pkg>` | 安装包（生产依赖） |
| `npm install <pkg> -D` | 安装包（开发依赖） |
| `npm start` | 运行 start 脚本 |
| `npm run <script>` | 运行自定义脚本 |
| `npm run build` | 编译 TypeScript |
| `npm publish` | 发布包到 npm |

### TypeScript 命令

| 命令 | 说明 |
|------|------|
| `npx tsc --init` | 初始化 tsconfig.json |
| `npx tsc` | 编译 TypeScript |
| `npx tsc -w` | 监听模式编译 |
| `npx ts-node <file>` | 直接运行 TS 文件 |
| `npx ts-node --watch <file>` | 监听运行 |

### Git 命令

| 命令 | 说明 |
|------|------|
| `git init` | 初始化本地仓库 |
| `git clone <url>` | 克隆远程仓库 |
| `git status` | 查看工作区状态 |
| `git add <file>` | 添加到暂存区 |
| `git add .` | 添加所有更改 |
| `git commit -m "msg"` | 提交更改 |
| `git log` | 查看提交历史 |
| `git log --oneline` | 简洁历史 |
| `git diff` | 查看未暂存的更改 |
| `git diff --staged` | 查看已暂存的更改 |
| `git remote add origin <url>` | 添加远程仓库 |
| `git remote -v` | 查看远程仓库 |
| `git push` | 推送到远程 |
| `git pull` | 拉取远程更新 |
| `git branch` | 查看分支 |
| `git checkout -b <name>` | 创建并切换分支 |
| `git merge <branch>` | 合并分支 |
| `git reset --hard HEAD~1` | 回退到上一次提交（慎用！） |
| `git revert <commit>` | 安全撤销某次提交 |

### Node.js 运行命令

| 命令 | 说明 |
|------|------|
| `node <file.js>` | 运行 JS 文件 |
| `node --version` | 查看 Node 版本 |
| `clear` / `cls` / `Ctrl+L` | 清屏 |
| `Ctrl+C` | 终止正在运行的程序 |

---

## 🎓 总结

恭喜你完成了整个项目！你已经掌握了：

### TypeScript 技能
- ✅ **类型系统**：interface、type、enum、泛型
- ✅ **面向对象**：class、封装、继承、多态
- ✅ **函数式编程**：纯函数、高阶函数、不可变性
- ✅ **异步编程**：Promise、async/await

### 工程化技能
- ✅ **npm 包管理**：依赖安装、脚本配置
- ✅ **TypeScript 编译**：tsconfig 配置
- ✅ **模块化开发**：import/export
- ✅ **CLI 应用开发**：readline 交互

### Git/GitHub 技能
- ✅ **本地版本控制**：init、add、commit、log
- ✅ **远程协作**：remote、push、pull
- ✅ **提交规范**：Conventional Commits
- ✅ **代码托管**：GitHub 仓库创建和管理

**记住：编程学习的最佳方式就是动手实践！** 💪

---

**文档版本**: v1.0 | **最后更新**: 2026-04-26
