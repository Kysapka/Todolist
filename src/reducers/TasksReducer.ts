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

let initTasksState: tasksType = JSON.parse(localStorage.getItem('TSK')!)
// let initTasksState: tasksType = {
//     '1': [
//         {id: v1(), title: "HTML&CSS", isDone: true},
//         {id: v1(), title: "JS", isDone: true}
//     ],
//     '2': [
//         {id: v1(), title: "Milk", isDone: true},
//         {id: v1(), title: "React Book", isDone: true}
//     ]
// }

const updateTasksLocalStorage = (tasks: tasksType) => {
    localStorage.removeItem('TSK')
    localStorage.setItem('TSK', JSON.stringify(tasks))
}

export const TasksReducer = (tasks: tasksType = initTasksState ? initTasksState : {}, action: TasksActionsTypes) => {
    switch (action.type) {

        case "ADD_TASK":
            let newTasks = {...tasks, [action.todolistID]: [...tasks[action.todolistID], {id: v1(), title: action.title, isDone: false}]}
            updateTasksLocalStorage(newTasks)
            return newTasks

        case "ADD_EMPTY_TASK_LIST":
            return {...tasks, [action.newID]: []}

        case REMOVE_EMPTY_TASK_LIST:
            delete tasks[action.removedID]
            updateTasksLocalStorage(tasks)
            return tasks

        case "REMOVE_TASK":
            let reduceTasks = {...tasks, [action.todolistID]: tasks[action.todolistID]
                    .filter(ts => ts.id !== action.id)}
            updateTasksLocalStorage(reduceTasks)
            return reduceTasks

        case "CHANGE_TASK_NAME":
            let changedNameTasks = {...tasks, [action.todolistID]: tasks[action.todolistID]
                    .map(ts => ts.id === action.taskID ? {...ts, title: action.title} : ts)}
            updateTasksLocalStorage(changedNameTasks)
            return changedNameTasks

        case "CHANGE_TASK_STATUS":
            let changedStatusTasks = {...tasks, [action.todolistID]: tasks[action.todolistID].map(ts => ts.id === action.taskId ? {...ts, isDone: action.isDone} : ts)}
            updateTasksLocalStorage(changedStatusTasks)
            return changedStatusTasks

        default: return tasks
    }
}

export const addEmptyTaskListAC = (newID: string) => ({type: ADD_EMPTY_TASK_LIST, newID} as const)
export const removeEmptyTaskListAC = (removedID: string) => ({type: REMOVE_EMPTY_TASK_LIST, removedID} as const)
export const addTaskAC = (todolistID: string, title: string) => ({type: ADD_TASK, todolistID, title} as const)
export const removeTaskAC = (todolistID: string, id: string) => ({type: REMOVE_TASK, todolistID, id} as const)
export const changeTaskTitleAC = (todolistID: string, taskID: string, title: string) => ({type: CHANGE_TASK_NAME, todolistID, taskID, title} as const)
export const changeTaskStatusAC = (todolistID: string, taskId: string, isDone: boolean) => ({type: CHANGE_TASK_STATUS, todolistID, taskId, isDone} as const)