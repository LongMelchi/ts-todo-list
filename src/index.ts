#!/usr/bin/env node

/**
 * 主程序入口文件
 * 负责：用户交互、流程控制、协调各模块工作
 */

import * as readline from 'readline/promises';
import { TodoManager } from './todo';
import { UserAction, TodoStatus } from './types';
import * as utils from './utils';
import { delay } from './utils';

class TodoApp{
    private manager: TodoManager;
    private rl: readline.Interface;
    private isRunning: boolean;


    constructor(){
        this.manager = new TodoManager();
        this.rl = readline.createInterface({
            input: process.stdin,
            output: process.stdout
        });
        this.isRunning = false;
    }


    async start(): Promise<void> {
        this.isRunning = true;
        utils.clearScreen();
        console.log("🎉 欢迎使用 TypeScript Todo List！");
        await utils.delay(500);

        while(this.isRunning){
            try{
                await this.showMainMenu();
            } catch(error) {
                console.error("\n❌ 发生错误:", error);
                await utils.delay(1000);
            }
        }
    }


    private async showMainMenu(): Promise<void> {
        console.log(utils.showMenu());
        console.log(utils.formatStatistics(this.manager.getStatistics()));

        const input = await this.rl.question("\n👉 请选择操作 (1-5): ");
        
        if (!utils.isValidAction(input)) {
            console.log("\n⚠️  无效的选择！");
            await delay(1000);
            utils.clearScreen();
            return;
        }

        utils.clearScreen();
        switch (input) {
            case UserAction.ADD:              await this.handleAddTodo(); break;
            case UserAction.DISPLAY:          await this.handleDisplayTodos(); break;
            case UserAction.TOGGLE_STATUS:    await this.handleToggleStatus(); break;
            case UserAction.REMOVE_COMPLETED: await this.handleRemoveCompleted(); break;
            case UserAction.QUIT:             await this.handleQuit(); break;
        }
    }


    private async handleAddTodo(): Promise<void> {
        console.log("\n📝 添加新任务");
        utils.showSeparator();

        const title = await this.rl.question("请输入任务标题: ");
        if (!title.trim()) {
            console.log("\n⚠️  标题不能为空！");
            await delay(1000);
            return;
        }

        const description = await this.rl.question("请输入任务描述（可选，回车跳过）: ");
        const newTodo = this.manager.addTodo(title, description || undefined);

        console.log("\n✅ 任务添加成功！");
        console.log(utils.formatTodoTable([newTodo]));
        await delay(2000);
    }
     

    private async handleDisplayTodos(): Promise<void> {
        console.log("\n📋 所有任务列表");
        utils.showSeparator();

        const todos = this.manager.getAllTodos();
        if (todos.length === 0) {
            console.log(utils.formatTodoTable(todos));
        } else {
            console.log(utils.formatTodoTable(todos));
            console.log(utils.formatStatistics(this.manager.getStatistics()));
        }
        await this.rl.question("\n按回车继续...");
    }

    
    private async handleToggleStatus(): Promise<void> {
        console.log("\n✏️  切换任务状态");
        utils.showSeparator();

        const todos = this.manager.getAllTodos();
        if (todos.length === 0) {
            console.log("\n📭 暂无任务！");
            await delay(1500);
            return;
        }
        
        console.log(utils.formatTodoTable(todos));

        const input = await this.rl.question("\n请输入任务 ID: ");
        const validation = utils.validateId(input, this.manager.getNextId() - 1);
        
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
        
        console.log(`\n当前状态: ${utils.getStatusSymbol(todo.status)} ${utils.getStatusName(todo.status)}`);
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
            console.log(utils.formatTodoTable([updated]));
        }
        await delay(2000);        
    }


    private async handleRemoveCompleted(): Promise<void> {
        console.log("\n🗑️  清理已完成任务");
        utils.showSeparator();

        const completed = this.manager.getTodosByStatus(TodoStatus.COMPLETED);
        if (completed.length === 0) {
            console.log("\n📭 暂无已完成任务！");
            await delay(1500);
            return;
        }

        console.log(`即将删除 ${completed.length} 个已完成任务:`);
        console.log(utils.formatTodoTable(completed));

        const confirm = await this.rl.question("\n确认删除? (y/n): ");
        if (confirm.toLowerCase() === 'y') {
            const count = this.manager.removeCompletedTodos();
            console.log(`\n✅ 成功删除 ${count} 个任务！`);
            console.log(utils.formatStatistics(this.manager.getStatistics()));
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

