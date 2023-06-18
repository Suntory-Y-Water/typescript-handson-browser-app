import { v4 as uuid } from 'uuid'

// 列挙型 あまり使うべきではない理由もあるらしい
// as constでタプルにしてからtypeofしたほうが手堅い
// enum Status {
//   Todo = 'TODO',
//   Doing = 'DOING',
//   Done = 'DONE'
// }

export const statusMap =  {
  todo: 'TODO',
  doing: 'DOING',
  done: 'DONE'
} as const

export type Status = typeof statusMap[keyof typeof statusMap]
export class Task {
  readonly id:any
  title:any
  status:any

  constructor(properties: {title: string}) {
    this.id = uuid()
    this.title = properties.title
    this.status = statusMap.todo
  }
}