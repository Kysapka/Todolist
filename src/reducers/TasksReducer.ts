import {v1} from "uuid";

const ADD_TASK = 'ADD_TASK'
const REMOVE_TASK = 'REMOVE_TASK'

type tasksType = {
    [todolistID: string]: Array<{ id: string, title: string, isDone: boolean }>
}

export type TasksActionsTypes = ReturnType<typeof addTaskAC> | ReturnType<typeof removeTaskAC>

// let initTasksState: tasksType = JSON.parse(localStorage.getItem('TSK')!)

let initTasksState = {
    'id1': [
    {id: v1(), title: "HTML&CSS", isDone: true},
    {id: v1(), title: "JS", isDone: true},
    {id: v1(), title: "ReactJS", isDone: false},
    {id: v1(), title: "Rest API", isDone: false},
    {id: v1(), title: "GraphQL", isDone: false},
]
}

export const TasksReducer = (tasks: tasksType = initTasksState, action: TasksActionsTypes):tasksType => {
    switch (action.type) {

        case "ADD_TASK":
            let newTask = {...tasks, [action.todolistID]: [...tasks[action.todolistID], {id: v1(), title: action.title, isDone: false}]}
            return newTask
            // localStorage.removeItem('TSK')
            // localStorage.setItem('TSK', JSON.stringify(newTask))

        case "REMOVE_TASK":
            let updatedTasks = {...tasks, [action.todolistID]: tasks[action.todolistID].filter(ts => ts.id !== action.id)}
            console.log(updatedTasks)
            return {...updatedTasks}
            // localStorage.removeItem('TSK')
            // localStorage.setItem('TSK', JSON.stringify(updatedTasks))

        default: return tasks
    }
}

export const addTaskAC = (todolistID: string, title: string) => ({type: ADD_TASK, todolistID, title}) as const
export const removeTaskAC = (todolistID: string, id: string) => ({type: REMOVE_TASK, todolistID, id}) as const