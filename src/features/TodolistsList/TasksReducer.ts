import {addTodoListAC, removeTodoListAC, setTodoListsAC} from "./TodolistReducer";
import {TDL_ACTIONS, TSK_ACTIONS} from "../../utils/consts/global_consts";
import {PayloadTaskType, tasksPriorities, taskStatuses, TaskType, todolistsAPI} from "../../api/todolists-api";
import {Dispatch} from "redux";
import {AppStateType} from "../../app/store";
import {AppActionsType, RequestStatusType, setAppStatusAC} from "../../app/AppReducer";
import {handleServerAppError, handleServerNetworkError} from "../../utils/error-utils";

export const TasksReducer = (tasks: TasksType = {}, action: TasksActionsTypes): TasksType => {
    switch (action.type) {
        case TSK_ACTIONS.CHANGE_TASK_ENTITY_STATUS:
            return {...tasks, [action.todolistID]: tasks[action.todolistID].map(ts => ts.id === action.taskID ? {...ts, tsEntityStatus: action.entityStatus} : ts)}
        case TDL_ACTIONS.SET_TODOLISTS:
            return action.todoLists.reduce((acc, tl) => ({...acc, [tl.id]: []}), {...tasks})
        case TSK_ACTIONS.SET_TASKS:
            return {...tasks, [action.todoListId]: action.tasks.map(ts => ({...ts, tsEntityStatus: 'idle'}))}
        case TSK_ACTIONS.ADD_TASK:
            return {...tasks, [action.task.todoListId]: [{...action.task, tsEntityStatus: 'idle'}, ...tasks[action.task.todoListId]]}
        case TDL_ACTIONS.ADD_TODOLIST:
            return {...tasks, [action.todolist.id]: []}
        case TDL_ACTIONS.REMOVE_TODOLIST:
            const copyTasks = {...tasks}
            delete copyTasks[action.todolistID]
            return copyTasks
        case TSK_ACTIONS.REMOVE_TASK:
            return {...tasks, [action.todolistID]: tasks[action.todolistID].filter(ts => ts.id !== action.id)}
        case TSK_ACTIONS.UPDATE_TASK:
            return ({...tasks, [action.todolistID]: tasks[action.todolistID].map(ts => ts.id === action.taskID ? {...ts, ...action.model} : ts)})
        default:
            return tasks
    }
}

// action creators
export const setTasksAC = (tasks: TaskType[], todoListId: string) => ({type: TSK_ACTIONS.SET_TASKS, tasks, todoListId})
export const addTaskAC = (task: TaskType) => ({type: TSK_ACTIONS.ADD_TASK, task})
export const removeTaskAC = (todolistID: string, id: string) => ({type: TSK_ACTIONS.REMOVE_TASK, todolistID, id})
export const updateTaskAC = (todolistID: string, taskID: string, model: updateDomainTaskModelType) => ({type: TSK_ACTIONS.UPDATE_TASK, todolistID, taskID, model })
export const changeTaskEntityStatusAC = (todolistID: string, taskID: string, entityStatus: RequestStatusType) => ({type: TSK_ACTIONS.CHANGE_TASK_ENTITY_STATUS, todolistID, taskID, entityStatus})

// thunk
export const fetchTasksTC = (todoListId: string) => (dispatch: Dispatch<ThunkActionsTypes>) => {
    dispatch(setAppStatusAC('loading'))
    todolistsAPI.getTasks(todoListId)
        .then((res) => {
            dispatch(setTasksAC(res.data.items, todoListId))
            dispatch(setAppStatusAC('succeeded'))
        })
}

export const removeTaskTC = (todoListId: string, taskId: string) => (dispatch: Dispatch<ThunkActionsTypes>) => {
    dispatch(setAppStatusAC('loading'))
    dispatch(changeTaskEntityStatusAC(todoListId, taskId, 'loading'))
    todolistsAPI.deleteTask(todoListId, taskId)
        .then(res => {
            dispatch(removeTaskAC(todoListId, taskId))
            dispatch(setAppStatusAC('succeeded'))
            dispatch(changeTaskEntityStatusAC(todoListId, taskId, 'succeeded'))
        })
}

export const addTaskTC = (title: string, todoListId: string) => (dispatch: Dispatch<ThunkActionsTypes>) => {
    dispatch(setAppStatusAC('loading'))
    todolistsAPI.createTask(title, todoListId)
        .then(res => {
            if (res.data.resultCode === 0) {
                dispatch(addTaskAC(res.data.data.item))
                dispatch(setAppStatusAC('succeeded'))
            } else {
                handleServerAppError(res, dispatch)
            }
        })
        .catch((error) => {
            handleServerNetworkError(error, dispatch)
        })
}

export const updateTaskTC = (todolistId: string, taskId: string, domainModel: updateDomainTaskModelType) => {
    return (dispatch: Dispatch<ThunkActionsTypes>, getState: () => AppStateType) => {
        const task = getState().tasks[todolistId].find(t => t.id === taskId)
        if (task) {
            const apiModel: PayloadTaskType = {
                deadline: task.deadline,
                description: task.description,
                priority: task.priority,
                startDate: task.startDate,
                title: task.title,
                status: task.status,
                ...domainModel
            }
            dispatch(setAppStatusAC('loading'))
            dispatch(changeTaskEntityStatusAC(todolistId, taskId, 'loading'))
            todolistsAPI.updateTask(todolistId, taskId, apiModel)
                .then((res) => {
                    if (res.data.resultCode === 0) {
                        const model = res.data.data.item
                        dispatch(updateTaskAC(todolistId, taskId, model))
                        dispatch(setAppStatusAC('succeeded'))
                        dispatch(changeTaskEntityStatusAC(todolistId, taskId, 'succeeded'))
                    } else {
                        handleServerAppError(res, dispatch)
                    }
                })
                .catch((error) => {
                    handleServerNetworkError(error, dispatch)
                })
        }
    }
}

// types
export type updateDomainTaskModelType = {
    title?: string
    startDate?: string
    priority?: tasksPriorities
    description?: string
    deadline?: string
    status?: taskStatuses
}

export type TaskDomainType =  TaskType & {
    tsEntityStatus: RequestStatusType
}
export type TasksType = {
    [key: string]: Array<TaskDomainType>
}
export type TasksActionsTypes =
    | ReturnType<typeof removeTodoListAC>
    | ReturnType<typeof addTodoListAC>
    | ReturnType<typeof addTaskAC>
    | ReturnType<typeof removeTaskAC>
    | ReturnType<typeof setTodoListsAC>
    | ReturnType<typeof setTasksAC>
    | ReturnType<typeof updateTaskAC>
    | ReturnType<typeof changeTaskEntityStatusAC>

type ThunkActionsTypes = TasksActionsTypes | AppActionsType



