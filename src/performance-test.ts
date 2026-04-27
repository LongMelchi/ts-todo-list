import { TodoManager } from './todo';
import { TodoStatus } from './types';
import { formatTodoTable, formatStatistics } from './utils';

console.log('=== 大数据量测试（50条任务）===');

const manager = new TodoManager();
const startTime = Date.now();

// 生成 50 条测试数据
for (let i = 1; i <= 50; i++) {
    const title = `任务 ${i}`;
    const description = i % 5 === 0 ? `这是任务 ${i} 的详细描述，包含更多信息` : undefined;
    manager.addTodo(title, description);
    
    // 每10个任务切换一个状态
    if (i % 10 === 0) {
        manager.toggleTodoStatus(i, TodoStatus.IN_PROGRESS);
    } else if (i % 7 === 0) {
        manager.toggleTodoStatus(i, TodoStatus.COMPLETED);
    }
}

const endTime = Date.now();
console.log(`✅ 生成 50 条任务耗时: ${endTime - startTime}ms`);

// 测试获取所有任务
const allTodos = manager.getAllTodos();
console.log(`✅ 总任务数: ${allTodos.length}`);

// 测试统计信息
const stats = manager.getStatistics();
console.log('📊 统计信息:');
console.log(formatStatistics(stats));

// 测试按状态筛选
console.log('\n=== 按状态筛选测试 ===');
console.log(`待处理任务数: ${manager.getTodosByStatus(TodoStatus.PENDING).length}`);
console.log(`进行中任务数: ${manager.getTodosByStatus(TodoStatus.IN_PROGRESS).length}`);
console.log(`已完成任务数: ${manager.getTodosByStatus(TodoStatus.COMPLETED).length}`);

// 测试搜索功能
console.log('\n=== 搜索功能测试 ===');
const searchResults = manager.searchTodos('任务 1');
console.log(`搜索 "任务 1" 结果数: ${searchResults.length}`);

// 测试清理已完成任务
console.log('\n=== 清理已完成任务测试 ===');
const completedCount = manager.removeCompletedTodos();
console.log(`清理了 ${completedCount} 个已完成任务`);
console.log(`清理后总任务数: ${manager.getAllTodos().length}`);

// 测试性能：批量操作
console.log('\n=== 批量操作性能测试 ===');
const batchStartTime = Date.now();

// 批量添加 10 个任务
for (let i = 51; i <= 60; i++) {
    manager.addTodo(`批量任务 ${i}`);
}

// 批量更新状态
for (let i = 51; i <= 60; i++) {
    manager.toggleTodoStatus(i, TodoStatus.COMPLETED);
}

const batchEndTime = Date.now();
console.log(`✅ 批量操作耗时: ${batchEndTime - batchStartTime}ms`);

// 测试清空功能
console.log('\n=== 清空功能测试 ===');
manager.clearAll();
console.log(`清空后任务数: ${manager.getAllTodos().length}`);
console.log(`下一个 ID: ${manager.getNextId()}`);

console.log('\n🎉 大数据量测试完成！');