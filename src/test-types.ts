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