import {v1} from "uuid";
import {TDL_ACTIONS} from "../consts/global_consts";
import {TodolistType} from "../api/todolists-api";

export type FilterValuesType = "all" | "active" | "completed";

export type TodoListDomenType = TodolistType & {
    filter: FilterValuesType
}

export type TodoListsType = Array<TodoListDomenType>

export type TodoListActionsTypes =
    | ReturnType<typeof addTodoListAC>
    | ReturnType<typeof removeTodoListAC>
    | ReturnType<typeof changeTodoListTitleAC>
    | ReturnType<typeof changeTodoListFilterAC>

export const TotoListReducer = (todoLists: TodoListsType = [], action: TodoListActionsTypes):TodoListsType => {
    switch (action.type) {
        case TDL_ACTIONS.ADD_TODOLIST:
            return[action.payload, ...todoLists]
        case TDL_ACTIONS.REMOVE_TODOLIST:
            return todoLists.filter(tl => tl.id !== action.payload.id)
        case TDL_ACTIONS.CHANGE_TDL_NAME:
        case TDL_ACTIONS.CHANGE_FILTER:
            return todoLists.map(tl => tl.id === action.payload.id ? {...tl, ...action.payload} : tl)
        default: return todoLists
    }
}

export const addTodoListAC = (title: string) => ({type: TDL_ACTIONS.ADD_TODOLIST, payload: {id: v1(), title, filter: 'all', order: 0, addedDate: ''}} as const)
export const removeTodoListAC = (todolistID: string) => ({type: TDL_ACTIONS.REMOVE_TODOLIST, payload: {id: todolistID}})
export const changeTodoListTitleAC = (todolistID: string, title: string) => ({type: TDL_ACTIONS.CHANGE_TDL_NAME, payload: {id: todolistID, title}})
export const changeTodoListFilterAC = (todolistID: string, filter: FilterValuesType) => ({type: TDL_ACTIONS.CHANGE_FILTER, payload: {id: todolistID, filter}})