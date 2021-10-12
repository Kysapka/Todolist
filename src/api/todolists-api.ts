import axios from "axios";

const settings = {
    withCredentials: true,
    headers: {
        'API-KEY': '9660a6e9-744c-4376-8717-32b82016bc28'
    }
}

export type TodolistType = {
    id: string,
    title: string,
    order: number,
    addedDate: string
}

type _CreateTodolistResponseType = {
    resultCode: number,
    messages: Array<string>,
    data: {
        item: TodolistType
    }
}

type _UpdateDeleteTodolistResponseType = {
    resultCode: number,
    messages: string[],
    data: {}
}

type ResponseType<D> = {
    resultCode: number,
    messages: string[],
    data: D
}

// type UpdateTodolistResponseType = {
//     resultCode: number,
//     messages: string[],
//     data: {}
// }

export const todolistsAPI = {
     getTodolist() {
        return axios.get<Array<TodolistType>>('https://social-network.samuraijs.com/api/1.1/todo-lists', settings)
    },
    createTodolist(title: string) {
        return axios.post<{title: string}, ResponseType<{item: TodolistType}>>('https://social-network.samuraijs.com/api/1.1/todo-lists', {title}, settings)
    },
    updateTodolist(title: string, todolistID: string) {
        return axios.put<{title: string}, ResponseType<{}>>(`https://social-network.samuraijs.com/api/1.1/todo-lists/${todolistID}`, {title}, settings)
    },
    deleteTodolist(todolistID: string) {
        return axios.delete<ResponseType<{}>>(`https://social-network.samuraijs.com/api/1.1/todo-lists/${todolistID}`, settings)
    }
}