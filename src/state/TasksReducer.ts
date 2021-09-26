import {v1} from "uuid";
import {addToDoACType, removeTodoListACType} from "./TodolistReducer";
import {TDL_ACTIONS, TSK_ACTIONS} from "../consts/global_consts";

export type TasksType = {
    [todolistID: string]: Array<TaskType>
}
export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

export type TasksActionsTypes =
    | removeTodoListACType
    | addToDoACType
    | ReturnType<typeof addTaskAC>
    | ReturnType<typeof removeTaskAC>
    | ReturnType<typeof changeTaskTitleAC>
    | ReturnType<typeof changeTaskStatusAC>


export const TasksReducer = (tasks: TasksType = {}, action: TasksActionsTypes) => {
    switch (action.type) {
        case TSK_ACTIONS.ADD_TASK:
            return {...tasks, [action.todolistID]: [{id: v1(), title: action.title, isDone: false}, ...tasks[action.todolistID]]}
        case TDL_ACTIONS.ADD_TODOLIST:
            return {...tasks, [action.payload.id]: []}
        case TDL_ACTIONS.REMOVE_TODOLIST:
            delete tasks[action.payload.id]
            return tasks
        case TSK_ACTIONS.REMOVE_TASK:
            return {...tasks, [action.todolistID]: tasks[action.todolistID].filter(ts => ts.id !== action.id)}
        case TSK_ACTIONS.CHANGE_TASK_NAME:
            return {...tasks, [action.todolistID]: tasks[action.todolistID].map(ts => ts.id === action.taskID ? {...ts, title: action.title} : ts)}
        case TSK_ACTIONS.CHANGE_TASK_STATUS:
            return {...tasks, [action.todolistID]: tasks[action.todolistID].map(ts => ts.id === action.taskId ? {...ts, isDone: action.isDone} : ts)}
        default: return tasks
    }
}

export const addTaskAC = (todolistID: string, title: string) => ({type: TSK_ACTIONS.ADD_TASK, todolistID, title})
export const removeTaskAC = (todolistID: string, id: string) => ({type: TSK_ACTIONS.REMOVE_TASK, todolistID, id})
export const changeTaskTitleAC = (todolistID: string, taskID: string, title: string) => ({type: TSK_ACTIONS.CHANGE_TASK_NAME, todolistID, taskID, title})
export const changeTaskStatusAC = (todolistID: string, taskId: string, isDone: boolean) => ({type: TSK_ACTIONS.CHANGE_TASK_STATUS, todolistID, taskId, isDone})