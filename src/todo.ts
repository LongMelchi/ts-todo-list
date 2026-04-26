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
    addTodo(title: string, description?: string): ITodoItem{
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
        if(todo && newTitle.trim()){
            todo.title = newTitle.trim();
            todo.updatedAt = new Date();
            return true;
        }
        return false;
    }
    
    
    /**
     * 切换待办事项的状态
     */
    toggleTodoStatus(id: number, newStatus?: TodoStatus): boolean{
        const todo = this.getTodoById(id);
        if (!todo) {
            return false;
        }
        
        if(newStatus){
            todo.status = newStatus;
        } else {
            const statusOrder = [
                TodoStatus.PENDING,
                TodoStatus.IN_PROGRESS,
                TodoStatus.COMPLETED
            ];
            const currentIndex = statusOrder.indexOf(todo.status);
            const nextIndex = (currentIndex + 1)%statusOrder.length;
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
            const titleMatch = todo.title.toLocaleLowerCase().includes(lowerKeyword);
            const descMatch = todo.description
            ?todo.description.toLocaleLowerCase().includes(lowerKeyword):false;
            return titleMatch || descMatch
        })
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