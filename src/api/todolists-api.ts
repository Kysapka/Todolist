import axios from "axios";

const settings = {
    withCredentials: true,
    headers: {
        'API-KEY': '9660a6e9-744c-4376-8717-32b82016bc28'
    }
}

const instance = axios.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.1/',
    ...settings
})

export type TodolistType = {
    id: string,
    title: string,
    order: number,
    addedDate: string
}

type ResponseType<D = {}> = {
    resultCode: number,
    messages: string[],
    data: D
}

type GetTasksResponse = {
    items: Array<TaskResponseType>
    totalCount: number
    error: string | null
}

type TaskResponseType = {
    description: string
    title: string
    status: number
    priority: number
    startDate: string
    deadline: string
    id: string
    todoListId: string
    order: number
    addedDate: string
}

type PayloadTaskType = {
    description: string
    title: string
    status: number
    priority: number
    startDate: string
    deadline: string
}


export const todolistsAPI = {
    getTodolist() {
        return instance.get<Array<TodolistType>>('todo-lists', settings)
    },
    createTodolist(title: string) {
        return instance.post<{ title: string }, ResponseType<{ item: TodolistType }>>('todo-lists', {title})
    },
    updateTodolist(title: string, id: string) {
        return instance.put<{ title: string }, ResponseType>(`todo-lists/${id}`, {title})
    },
    deleteTodolist(todolistID: string) {
        return instance.delete<ResponseType>(`todo-lists/${todolistID}`)
    },

    getTasks(todolistID: string) {
        return instance.get<GetTasksResponse>(`todo-lists/${todolistID}/tasks`)
    },
    createTask(title: string, todolistId: string) {
        return instance.post<{ title: string}, ResponseType<{ item: TodolistType }>>(`todo-lists/${todolistId}/tasks`, {title})
    },
    updateTask(todolistId: string, taskId: string, body: PayloadTaskType) {
        return instance.put<PayloadTaskType, ResponseType<{ item: TodolistType }>>(`todo-lists/${todolistId}/tasks/${taskId}`, body)
    },
    deleteTask(todolistId: string, taskId: string) {
        return instance.delete<ResponseType>(`todo-lists/${todolistId}/tasks/${taskId}`)
    },
}