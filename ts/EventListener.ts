type Listeners = {
  [id: string]: {
    event: string
    element: HTMLElement
    handler: (e: Event) => void
  }
}

export class EventListener {
  private readonly listeners: Listeners = {}

  add(listenerId: string, event: string, element: HTMLElement, handler: (e: Event) => void) {
    this.listeners[listenerId] = {
      event,
      element,
      handler,
    }

    element.addEventListener(event, handler)
  }

  /* 
  remove メソッドは addメソッドの第1引数で渡していた listenerIdと同じものを引数で渡します。
  渡されたlistenerIdをキーとして this.listeners に保存されていたオブジェクトを見つけます。
  もしオブジェクトが見つかった場合は element に対して
  removeEventListenerを行い、イベントハンドラを削除します。 
  
  ■ やる理由
  イベントを登録した要素が削除されたとき、要素はなくなっているのに
  イベントハンドラ(イベントが発生したときに呼び出される処理のこと)自体は削除されず残っている状態になってしまう。
  →バグや無駄なメモリを使う理由になる
  */
  remove(listenerId: string){
    const listener = this.listeners[listenerId]

    if(!listener) return

    listener.element.removeEventListener(listener.event, listener.handler)
    delete this.listeners[listenerId]

  }
}