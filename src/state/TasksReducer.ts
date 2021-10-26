import {v1} from "uuid";
import {addTodoListAC, removeTodoListAC} from "./TodolistReducer";
import {TDL_ACTIONS, TSK_ACTIONS} from "../consts/global_consts";
import {tasksPriorities, taskStatuses, TaskType} from "../api/todolists-api";

export type TasksType = {
    [todolistID: string]: Array<TaskType>
}

export type TasksActionsTypes =
    | ReturnType<typeof removeTodoListAC>
    | ReturnType<typeof addTodoListAC>
    | ReturnType<typeof addTaskAC>
    | ReturnType<typeof removeTaskAC>
    | ReturnType<typeof changeTaskTitleAC>
    | ReturnType<typeof changeTaskStatusAC>


export const TasksReducer = (tasks: TasksType = {}, action: TasksActionsTypes):TasksType => {
    switch (action.type) {
        case TSK_ACTIONS.ADD_TASK:
            return {...tasks, [action.todolistID]: [{
                id: v1(), title: action.title, addedDate: '', order: 0,
                    deadline: '', description: '', priority: tasksPriorities.Low, startDate: '',
                    status: taskStatuses.New, todoListId: v1()
                }, ...tasks[action.todolistID]]}

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
            return {...tasks, [action.todolistID]: tasks[action.todolistID].map(ts => ts.id === action.taskId ? {
                ...ts,
                    status: action.status} : ts)
            }
        default: return tasks
    }
}

export const addTaskAC = (todolistID: string, title: string) => ({type: TSK_ACTIONS.ADD_TASK, todolistID, title})
export const removeTaskAC = (todolistID: string, id: string) => ({type: TSK_ACTIONS.REMOVE_TASK, todolistID, id})
export const changeTaskTitleAC = (todolistID: string, taskID: string, title: string) => ({type: TSK_ACTIONS.CHANGE_TASK_NAME, todolistID, taskID, title})
export const changeTaskStatusAC = (todolistID: string, taskId: string, status: taskStatuses) => ({type: TSK_ACTIONS.CHANGE_TASK_STATUS, todolistID, taskId, status})