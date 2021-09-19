import {v1} from "uuid";

const ADD_TASK = 'ADD_TASK'
const REMOVE_TASK = 'REMOVE_TASK'
const ADD_EMPTY_TASK_LIST = 'ADD_EMPTY_TASK_LIST'
const REMOVE_EMPTY_TASK_LIST = 'REMOVE_EMPTY_TASK_LIST'
const CHANGE_TASK_NAME = 'CHANGE_TASK_NAME'
const CHANGE_TASK_STATUS = 'CHANGE_TASK_STATUS'

export type tasksType = {
    [todolistID: string]: Array<{ id: string, title: string, isDone: boolean }>
}

export type TasksActionsTypes =
    ReturnType<typeof addTaskAC>
    | ReturnType<typeof removeTaskAC>
    | ReturnType<typeof addEmptyTaskListAC>
    | ReturnType<typeof removeEmptyTaskListAC>
    | ReturnType<typeof changeTaskTitleAC>
    | ReturnType<typeof changeTaskStatusAC>

export const TasksReducer = (tasks: tasksType = {}, action: TasksActionsTypes) => {
    switch (action.type) {
        case "ADD_TASK":
            return {...tasks, [action.todolistID]: [...tasks[action.todolistID], {id: v1(), title: action.title, isDone: false}]}
        case "ADD_EMPTY_TASK_LIST":
            return {...tasks, [action.newID]: []}
        case REMOVE_EMPTY_TASK_LIST:
            delete tasks[action.removedID]
            return tasks
        case "REMOVE_TASK":
            return {...tasks, [action.todolistID]: tasks[action.todolistID].filter(ts => ts.id !== action.id)}
        case "CHANGE_TASK_NAME":
            return {...tasks, [action.todolistID]: tasks[action.todolistID].map(ts => ts.id === action.taskID ? {...ts, title: action.title} : ts)}
        case "CHANGE_TASK_STATUS":
            return {...tasks, [action.todolistID]: tasks[action.todolistID].map(ts => ts.id === action.taskId ? {...ts, isDone: action.isDone} : ts)}
        default: return tasks
    }
}

export const addEmptyTaskListAC = (newID: string) => ({type: ADD_EMPTY_TASK_LIST, newID} as const)
export const removeEmptyTaskListAC = (removedID: string) => ({type: REMOVE_EMPTY_TASK_LIST, removedID} as const)
export const addTaskAC = (todolistID: string, title: string) => ({type: ADD_TASK, todolistID, title} as const)
export const removeTaskAC = (todolistID: string, id: string) => ({type: REMOVE_TASK, todolistID, id} as const)
export const changeTaskTitleAC = (todolistID: string, taskID: string, title: string) => ({type: CHANGE_TASK_NAME, todolistID, taskID, title} as const)
export const changeTaskStatusAC = (todolistID: string, taskId: string, isDone: boolean) => ({type: CHANGE_TASK_STATUS, todolistID, taskId, isDone} as const)