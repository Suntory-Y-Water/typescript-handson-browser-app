import { Task } from './Task'

export class TaskCollection {
  private tasks: Task[] = []

  add(task: Task) {
    this.tasks.push(task)
  }

  /* 
  taskの配列に対してfilterを行い、渡されたtaskと同じidのものがあれば
  それを抜いた配列を新たに生成してtasksに入れ直す
  */
  delete(task: Task) {
    this.tasks = this.tasks.filter(({ id }) => id !== task.id)
  }

}