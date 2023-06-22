import { EventListener } from "./EventListener";
import { TaskCollection } from "./TaskCollection";
import { Task, Status, statusMap} from './Task'
import { TaskRenderer } from "./TaskRender";

class Application {
  private readonly eventLister = new EventListener()
  private readonly taskCollection = new TaskCollection()
  private readonly taskRender = new TaskRenderer(
    document.getElementById('todoList') as HTMLElement,
    document.getElementById('doingList') as HTMLElement,
    document.getElementById('doneList') as HTMLElement,
  )

  start() {
    const createForm = document.getElementById('createForm') as HTMLElement

    // 一括削除機能の作成
    const deleteAllDoneTaskButton = document.getElementById('deleteAllDoneTask') as HTMLElement

    this.eventLister.add('submit-handler', 'submit', createForm, this.handlerSubmit)
    this.eventLister.add('click-handler', 'click', deleteAllDoneTaskButton, this.handlerClickDeleteAllDoneTask)

    this.taskRender.subscribeDragAndDrop(this.handleDropAndDrop)
  }

  private handlerClickDeleteAllDoneTask = () => {
    if(!window.confirm('DONEのタスクを一括削除してもよろしいですか？')) return

    const doneTasks = this.taskCollection.filter(statusMap.done)
    doneTasks.forEach((task) => this.executeDeleteTask(task))
  }

  private handlerSubmit = (e: Event) => {
    e.preventDefault()
    const titleInput = document.getElementById('title') as HTMLInputElement

    if(!titleInput.value) return

    const task = new Task({title: titleInput.value})
    this.taskCollection.add(task)

    const { deleteButtonEl } = this.taskRender.append(task)

    this.eventLister.add(
      task.id,
      'click',
      deleteButtonEl,
      () => this.handlerClickDeleteTask(task),
    )
    titleInput.value = ''
  }

  private handlerClickDeleteTask = (task: Task) => {
    if(!window.confirm(`「${task.title}を削除してもよろしいですか？`)) return

    this.executeDeleteTask(task)
  }

  private handleDropAndDrop = (el: Element, sibling: Element | null, newStatus: Status) => {
    const taskId = this.taskRender.getId(el)

    if (!taskId) return

    const task = this.taskCollection.find(taskId)

    if (!task) return

    task.update({ status: newStatus })
    this.taskCollection.update(task)

    console.log(sibling)
  }

  // 複数タスクの削除
  private executeDeleteTask = (task: Task) => {
    this.eventLister.remove(task.id)
    this.taskCollection.delete(task)
    this.taskRender.remove(task)
  }
}

window.addEventListener('load', () => {
  const app = new Application()
  app.start()
})