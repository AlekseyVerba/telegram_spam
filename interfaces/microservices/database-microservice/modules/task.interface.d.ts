import { ITask } from '../models/task.interface'

export interface ICreateTaskDatabase {
    name: string
    message: string
    cron?: string
    dates?: string[]
    is_active: boolean
    chats: string[]
    file?: string
    user_uid: string
}

export interface IGetAllMyTasksDatabase {
    uid: string
}

export interface IGetAllMyTasksDatabaseResponse {
    tasks: ITask[]
}

export interface IGetTaskDatabase {
    id: number
    uid?: string
}

export interface IGetTaskDatabaseResponse {
    task: ITask | null
}

export interface IUpdateTaskDatabase {
    name?: string;
    message?: string;
    cron?: string;
    dates?: string[]
    is_active?: boolean;
    chats?: string[];
    file?: string;
    user_uid: string;
    taskId: number
}

export interface IGetAllActiveTasksDatabase {
    tasks: (Pick<ITask, 'id' | 'cron'>)[]
}