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


