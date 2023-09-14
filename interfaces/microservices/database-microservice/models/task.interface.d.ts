import { IUser } from './user.interface'

export interface ITask {
    id: number
    name: string
    cron: string
    message: string
    is_active: boolean
    chats: string[]
    file: string | null
    user_uid: string
    user: IUser
}