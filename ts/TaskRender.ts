import { Task, Status, statusMap } from './Task'
import dragula from 'dragula'
import { TaskCollection } from './TaskCollection'

export class TaskRenderer {
  constructor(
    private readonly todoList: HTMLElement,
    private readonly doingList: HTMLElement,
    private readonly doneList: HTMLElement
  ){}

  renderAll(taskCollection: TaskCollection) {
    const todoTasks = this.renderList(taskCollection.filter(statusMap.todo), this.todoList)
    const doingTasks = this.renderList(taskCollection.filter(statusMap.doing), this.doingList)
    const doneTasks = this.renderList(taskCollection.filter(statusMap.done), this.doneList)

    return [...todoTasks, ...doingTasks, ...doneTasks]
  }


  private renderList(tasks: Task[], listEl: HTMLElement) {
    if (tasks.length === 0) return []

    const taskList: Array<{
      task: Task
      deleteButtonEl: HTMLButtonElement
    }> = []

    tasks.forEach((task) => {
      const { taskElement, deleteButtonEl } = this.render(task)

      listEl.append(taskElement)
      taskList.push({ task, deleteButtonEl })
    })

    return taskList
  }

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
  
  remove(task: Task) {
    const taskEl = document.getElementById(task.id)

    if (!taskEl) return

    if (task.status === statusMap.todo) {
      this.todoList.removeChild(taskEl)
    }

    if (task.status === statusMap.doing) {
      this.doingList.removeChild(taskEl)
    }

    if (task.status === statusMap.done) {
      this.doneList.removeChild(taskEl)
    }
  }

  subscribeDragAndDrop(onDrop: (el: Element, sibling: Element | null, newStatus: Status) => void) {
    dragula([this.todoList, this.doingList, this.doneList]).on('drop', (el, target, _source, sibling) => {
      let newStatus: Status = statusMap.todo

      if (target.id === 'doingList') newStatus = statusMap.doing
      if (target.id === 'doneList') newStatus = statusMap.done

      onDrop(el, sibling, newStatus)
    })
  }

  getId(el: Element) {
    return el.id
  }
}