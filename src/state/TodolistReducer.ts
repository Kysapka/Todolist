import {v1} from "uuid";
import {TDL_ACTIONS} from "../consts/global_consts";

export type FilterValuesType = "all" | "active" | "completed";

export type todoListsType = Array<{ id: string, title: string, filter: FilterValuesType }>
export type addToDoACType = ReturnType<typeof addTodoListAC>
export type removeTodoListACType = ReturnType<typeof removeTodoListAC>
export type TodoListActionsTypes =
    | addToDoACType
    | removeTodoListACType
    | ReturnType<typeof changeTodoListTitleAC>
    | ReturnType<typeof changeTodoListFilterAC>

export const TotoListReducer = (todoLists: todoListsType = [], action: TodoListActionsTypes):todoListsType => {
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

export const addTodoListAC = (title: string) => ({type: TDL_ACTIONS.ADD_TODOLIST, payload: {id: v1(), title, filter: 'all'}} as const)
export const removeTodoListAC = (todolistID: string) => ({type: TDL_ACTIONS.REMOVE_TODOLIST, payload: {id: todolistID}})
export const changeTodoListTitleAC = (todolistID: string, title: string) => ({type: TDL_ACTIONS.CHANGE_TDL_NAME, payload: {id: todolistID, title}})
export const changeTodoListFilterAC = (todolistID: string, filter: FilterValuesType) => ({type: TDL_ACTIONS.CHANGE_FILTER, payload: {id: todolistID, filter}})