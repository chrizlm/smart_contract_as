import { TaskStatus } from '../utils/enums';

@nearBindgen
export class Task {
  title: String;
  status: TaskStatus;

  constructor(title: String) {
    this.title = title;
    this.status = TaskStatus.PENDING;
  }
}
