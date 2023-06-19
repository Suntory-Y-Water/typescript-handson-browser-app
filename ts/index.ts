import { EventListener } from "./EventListener";
import { TaskCollection } from "./TaskCollection";
import { Task } from './Task'
import { TaskRenderer } from "./TaskRender";

class Application {
  private readonly eventLister = new EventListener()
  private readonly taskCollection = new TaskCollection()
  private readonly taskRender = new TaskRenderer(
    document.getElementById('todoList') as HTMLElement
  )

  start() {
    const createForm = document.getElementById('createForm') as HTMLElement

    this.eventLister.add('submit-handler', 'submit', createForm, this.handlerSubmit)
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

    this.eventLister.remove(task.id)
    console.log(this.taskCollection);
  }
}

window.addEventListener('load', () => {
  const app = new Application()
  app.start()
})