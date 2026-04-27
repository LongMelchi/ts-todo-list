import { TodoManager } from './todo';
import { TodoStatus } from './types';

console.log('=== 边界情况测试 ===');

const manager = new TodoManager();

// 测试 1：空标题
console.log('\n1. 测试空标题:');
try {
    const result = manager.addTodo('   ');
    console.log('❌ 错误：应该拒绝空标题');
} catch (error) {
    console.log('✅ 正确：拒绝了空标题');
}

// 测试 2：不存在的任务 ID
console.log('\n2. 测试不存在的任务 ID:');
const result1 = manager.toggleTodoStatus(999);
console.log(`切换不存在任务状态: ${result1} (应为 false)`);

const result2 = manager.removeTodo(999);
console.log(`删除不存在任务: ${result2} (应为 false)`);

// 测试 3：状态切换边界
console.log('\n3. 测试状态切换边界:');
const todo = manager.addTodo('测试状态切换');
console.log(`初始状态: ${todo.status}`);

// 循环切换状态
for (let i = 0; i < 5; i++) {
    manager.toggleTodoStatus(todo.id);
    const updated = manager.getTodoById(todo.id);
    console.log(`切换后状态 ${i+1}: ${updated?.status}`);
}

// 测试 4：搜索空关键词
console.log('\n4. 测试搜索空关键词:');
const emptySearch = manager.searchTodos('');
console.log(`空关键词搜索结果数: ${emptySearch.length} (应为 1)`);

// 测试 5：清理空列表
console.log('\n5. 测试清理空列表:');
const count = manager.removeCompletedTodos();
console.log(`清理空列表删除数: ${count} (应为 0)`);

console.log('\n🎉 边界情况测试完成！');