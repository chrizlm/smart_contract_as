import { TaskStatus } from '../utils/enums';
import { Task } from './Task';
import { TaskInfo } from './TaskInfo';

@nearBindgen
export class TaskManager {
  tasks: Task[] = [];

  addTask(title: String): TaskInfo {
    const task = new Task(title);
    const id = this.tasks.push(task);
    return new TaskInfo(task, id);
  }

  showTask(taskId: i32): TaskInfo | null {
    if (taskId >= this.tasks.length) return null;
    const task = this.tasks[taskId];
    return new TaskInfo(task, taskId);
  }

  showAllTasks(): Task[] {
    return this.tasks;
  }

  startTask(taskId: i32): bool {
    if (taskId >= this.tasks.length) return false;
    this.tasks[taskId].status = TaskStatus.ACTIVE;
    return true;
  }

  completeTask(taskId: i32): bool {
    if (taskId >= this.tasks.length) return false;
    this.tasks[taskId].status = TaskStatus.COMPLETED;
    return true;
  }

  removeTask(taskId: i32): Task | null {
    if (taskId >= this.tasks.length) return null;
    const tmpTasks: Task[] = [];
    let removedTask: Task | null = null;
    for (let i = 0; i < this.tasks.length; i++) {
      const task = this.tasks[i];
      if (taskId !== i) {
        tmpTasks.push(task);
      } else {
        removedTask = task;
      }
    }
    this.tasks = tmpTasks;
    return removedTask;
  }
}
