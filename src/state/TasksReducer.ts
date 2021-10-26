import {v1} from "uuid";
import {addTodoListAC, removeTodoListAC, setTodoListsAC} from "./TodolistReducer";
import {TDL_ACTIONS, TSK_ACTIONS} from "../consts/global_consts";
import {tasksPriorities, taskStatuses, TaskType, todolistsAPI} from "../api/todolists-api";
import { Dispatch } from "redux";



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
    | ReturnType<typeof setTodoListsAC>
    | ReturnType<typeof setTasksAC>

export const TasksReducer = (tasks: TasksType = {}, action: TasksActionsTypes):TasksType => {
    switch (action.type) {
        case TDL_ACTIONS.SET_TODOLISTS: {
            let copyTasks = {...tasks}
            action.todoLists.forEach(tdl => {
                copyTasks[tdl.id] = []
            })
            return copyTasks
        }
        case "SET_TASKS":
            let copyTasks = {...tasks}
            copyTasks[action.todoListId] = action.tasks
            return copyTasks

        case TSK_ACTIONS.ADD_TASK:
            const stateCopy = {...tasks}
            const oldTasks = stateCopy[action.task.todoListId];
            const newTasks = [action.task, ...oldTasks];
            stateCopy[action.task.todoListId] = newTasks;
            return stateCopy;

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

export const setTasksAC = (tasks: TaskType[], todoListId: string) => ({type: TSK_ACTIONS.SET_TASKS, tasks, todoListId})
// export const addTaskAC = (todolistID: string, title: string) => ({type: TSK_ACTIONS.ADD_TASK, todolistID, title})
export const addTaskAC = (task: TaskType) => ({type: TSK_ACTIONS.ADD_TASK, task})
export const removeTaskAC = (todolistID: string, id: string) => ({type: TSK_ACTIONS.REMOVE_TASK, todolistID, id})
export const changeTaskTitleAC = (todolistID: string, taskID: string, title: string) => ({type: TSK_ACTIONS.CHANGE_TASK_NAME, todolistID, taskID, title})
export const changeTaskStatusAC = (todolistID: string, taskId: string, status: taskStatuses) => ({type: TSK_ACTIONS.CHANGE_TASK_STATUS, todolistID, taskId, status})

export const fetchTasksTC = (todoListId: string) => (dispatch: Dispatch) => {
        todolistsAPI.getTasks(todoListId)
            .then((res) => {
                dispatch(setTasksAC(res.data.items, todoListId))
            })
    }

export const removeTaskTC = (todoListId: string, taskId: string) => (dispatch: Dispatch) => {
    todolistsAPI.deleteTask(todoListId, taskId)
        .then(res => {
        dispatch(removeTaskAC(todoListId, taskId))
    })
}

export const addTaskTC = (title: string, todoListId: string) => (dispatch: Dispatch) => {
    todolistsAPI.createTask(title, todoListId)
        .then(res => {
            dispatch(addTaskAC(res.data.data.item))
        })
}
