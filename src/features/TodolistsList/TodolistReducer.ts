import {TDL_ACTIONS} from "../../consts/global_consts";
import {todolistsAPI, TodolistType} from "../../api/todolists-api";
import {Dispatch} from "redux";
import {AppActionsType, RequestStatusType, setStatusAC} from "../../app/AppReducer";

export const TotoListReducer = (todoLists: TodoListsType = [], action: TodoListActionsTypes): TodoListsType => {
    switch (action.type) {
        case TDL_ACTIONS.SET_TODOLISTS:
            return action.todoLists.map(tdl => ({...tdl, filter: 'all', entityStatus: 'idle'}))
        case TDL_ACTIONS.ADD_TODOLIST:
            return [{...action.todolist, filter: 'all', entityStatus: 'idle'}, ...todoLists]
        case TDL_ACTIONS.REMOVE_TODOLIST:
            return todoLists.filter(tl => tl.id !== action.todolistID)
        case TDL_ACTIONS.CHANGE_TDL_NAME:
        case TDL_ACTIONS.CHANGE_FILTER:
            return todoLists.map(tl => tl.id === action.payload.id ? {...tl, ...action.payload} : tl)
        default:
            return todoLists
    }
}

// action creators
export const addTodoListAC = (todolist: TodolistType) =>
    ({type: TDL_ACTIONS.ADD_TODOLIST, todolist})
export const removeTodoListAC = (todolistID: string) =>
    ({type: TDL_ACTIONS.REMOVE_TODOLIST, todolistID})
export const changeTodoListTitleAC = (todolistID: string, title: string) =>
    ({type: TDL_ACTIONS.CHANGE_TDL_NAME, payload: {id: todolistID, title}})
export const changeTodoListFilterAC = (todolistID: string, filter: FilterValuesType) =>
    ({type: TDL_ACTIONS.CHANGE_FILTER, payload: {id: todolistID, filter}})
export const setTodoListsAC = (todoLists: TodolistType[]) =>
    ({type: TDL_ACTIONS.SET_TODOLISTS, todoLists})

// thunk
export const fetchTodolistsTC = () => (dispatch: Dispatch<TodoListActionsTypes>) => {
    dispatch(setStatusAC('loading'))
    todolistsAPI.getTodolist().then(res => {
        dispatch(setTodoListsAC(res.data))
        dispatch(setStatusAC('succeeded'))
    })
}
export const removeTodoListTC = (todolistID: string) => (dispatch: Dispatch<TodoListActionsTypes>) => {
    dispatch(setStatusAC('loading'))
    todolistsAPI.deleteTodolist(todolistID)
        .then(() => {
            dispatch(removeTodoListAC(todolistID))
            dispatch(setStatusAC('succeeded'))
        })
}
export const addTodoListTC = (title: string) => (dispatch: Dispatch<TodoListActionsTypes>) => {
    dispatch(setStatusAC('loading'))
    todolistsAPI.createTodolist(title)
        .then((response) => {
            dispatch(addTodoListAC(response.data.data.item))
            dispatch(setStatusAC('succeeded'))
        })
}
export const changeTodoListTitleTC = (todolistID: string, title: string) => (dispatch: Dispatch<TodoListActionsTypes>) => {
    dispatch(setStatusAC('loading'))
    todolistsAPI.updateTodolist(title, todolistID)
        .then(() => {
            dispatch(changeTodoListTitleAC(todolistID, title))
            dispatch(setStatusAC('succeeded'))
        })
}

// types
export type TodoListsType = Array<TodoListDomenType>
export type TodoListActionsTypes =
    | ReturnType<typeof addTodoListAC>
    | ReturnType<typeof removeTodoListAC>
    | ReturnType<typeof changeTodoListTitleAC>
    | ReturnType<typeof changeTodoListFilterAC>
    | ReturnType<typeof setTodoListsAC>
    | AppActionsType
export type FilterValuesType = "all" | "active" | "completed";
export type TodoListDomenType = TodolistType & {
    filter: FilterValuesType
    entityStatus: RequestStatusType
}