import { EventListener } from "./EventListener";
import { Task } from "./task";

class Application {
  private readonly eventLister = new EventListener()
  start() {
    const createForm = document.getElementById('createForm') as HTMLElement

    this.eventLister.add('submit-handler', 'submit', createForm, this.handlerSubmit)
  }

  private handlerSubmit = (e: Event) => {
    e.preventDefault()
    const titleInput = document.getElementById('title') as HTMLInputElement

    if(!titleInput.value) return

    const task = new Task({title: titleInput.value})
    console.log(task);
  }
}

window.addEventListener('load', () => {
  const app = new Application()
  app.start()
})