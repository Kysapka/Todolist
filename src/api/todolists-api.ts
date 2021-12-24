import axios, { AxiosResponse } from 'axios';
import {GetTasksResponse, LoginParamsType, ResponseType, TaskType, TodolistType, UpdateTaskModelType} from './types'

const settings = {
    withCredentials: true,
    headers: {
        'API-KEY': process.env.REACT_APP_API_KEY
    }
}
const instance = axios.create({
    baseURL: process.env.REACT_APP_BASE_URL,
    ...settings
})

// api layer
export const todolistsAPI = {
    getTodolists() {
        return instance.get<any, AxiosResponse<Promise<TodolistType[]>>>('todo-lists');
    },
    createTodolist(title: string) {
        return instance.post<ResponseType<{ item: TodolistType }>>('todo-lists', {title: title});
    },
    deleteTodolist(id: string) {
        return instance.delete<ResponseType>(`todo-lists/${id}`);
    },
    updateTodolist(id: string, title: string) {
        return instance.put<ResponseType>(`todo-lists/${id}`, {title: title});
    },
    getTasks(todolistId: string) {
        return instance.get<GetTasksResponse>(`todo-lists/${todolistId}/tasks`);
    },
    deleteTask(todolistId: string, taskId: string) {
        return instance.delete<ResponseType>(`todo-lists/${todolistId}/tasks/${taskId}`);
    },
    createTask(todolistId: string, taskTitile: string) {
        return instance.post<ResponseType<{ item: TaskType}>>(`todo-lists/${todolistId}/tasks`, {title: taskTitile});
    },
    updateTask(todolistId: string, taskId: string, model: UpdateTaskModelType) {
        return instance.put<ResponseType<TaskType>>(`todo-lists/${todolistId}/tasks/${taskId}`, model);
    }
}


export const authAPI = {
    login(data: LoginParamsType) {
        return instance.post<ResponseType<{userId?: number}>>('auth/login', data);
    },
    logout() {
        return instance.delete<ResponseType<{userId?: number}>>('auth/login');
    },
    me() {
        return instance.get<ResponseType<{id: number; email: string; login: string}>>('auth/me');
    }
}

