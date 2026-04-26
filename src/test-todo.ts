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