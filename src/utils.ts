import { ITodoItem, TodoList, TodoStatus, UserAction } from './types';

/**
 * 格式化日期为易读的字符串
 *
 * 【纯函数示例】：相同输入永远产生相同输出，无副作用
 */
export function formatDate(date: Date): string{
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
        // 先算 && 再算 ?
        const desc = (todo.description && todo.description.length > 16 ? todo.description.substring(0, 13) + 
        "..." : (todo.description || "-")).padEnd(18);

        const date = formatDate(todo.createdAt);
        return `│ ${id}│ ${status}│ ${title}│ ${desc}│ ${date} │`;
    })
    
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


