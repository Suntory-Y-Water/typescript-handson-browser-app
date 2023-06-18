import { EventListener } from "./EventListener";
import { TaskCollection } from "./TaskCollection";
import { Task } from './Task'

class Application {
  private readonly eventLister = new EventListener()
  private readonly taskCollection = new TaskCollection()

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
    console.log(this.taskCollection);
    
  }
}

window.addEventListener('load', () => {
  const app = new Application()
  app.start()
})