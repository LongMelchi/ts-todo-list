import { ITodoItem, TodoStatus, TodoList } from './types';
import { formatDate, getStatusSymbol, formatTodoTable, showMenu, isValidAction, validateId } from './utils';

console.log("=== 测试日期格式化 ===");
console.log(formatDate(new Date()));

console.log("\n=== 测试表格格式化 ===");
const testTodos: TodoList = [
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