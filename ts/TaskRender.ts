import { Task } from './Task'

export class TaskRenderer {
  constructor(private readonly todoList: HTMLElement) {}

  append(task: Task) {
    const {taskElement, deleteButtonEl} = this.render(task)

    this.todoList.append(taskElement)
    return {deleteButtonEl}
  }

  private render(task: Task) {
    // <div class="taskItem">
    //   <span>タイトル</span>
    //   <button>削除</button>
    // </div>

    const taskElement = document.createElement('div')
    const spanElement = document.createElement('span')
    const deleteButtonEl = document.createElement('button')

    taskElement.id = task.id
    taskElement.classList.add('task-item')

    spanElement.textContent = task.title
    deleteButtonEl.textContent = '削除'

    taskElement.append(spanElement, deleteButtonEl)

    return {taskElement, deleteButtonEl}
  }
  
  remove(task: Task){
    const taskEl = document.getElementById(task.id)
    if(!taskEl) return
    
    this.todoList.removeChild(taskEl)
  }
}