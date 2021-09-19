const ADD_TODOLIST = 'ADD-TODOLIST'
const REMOVE_TODOLIST = 'REMOVE_TODOLIST'
const CHANGE_TDL_NAME = 'CHANGE_TDL_NAME'
const CHANGE_FILTER = 'CHANGE_FILTER'

export type FilterValuesType = "all" | "active" | "completed";

export type todoListsType = Array<{ id: string, title: string, filter: FilterValuesType }>

export type TodoListActionsTypes =
    | ReturnType<typeof addTodoListAC>
    | ReturnType<typeof removeTodoListAC>
    | ReturnType<typeof changeTodoListTitleAC>
    | ReturnType<typeof changeTodoListFilterAC>

export const TotoListReducer = (todoLists: todoListsType = [], action: TodoListActionsTypes):todoListsType => {
    switch (action.type) {
        case "ADD-TODOLIST":
            return[...todoLists, {id: action.newID, title: action.title, filter: 'all'}]
        case REMOVE_TODOLIST:
            return [...todoLists.filter(tl => tl.id !== action.todolistID)]
        case "CHANGE_TDL_NAME":
            return todoLists.map(tl => tl.id === action.todolistID ? {...tl, title : action.title} : tl)
        case "CHANGE_FILTER":
            return todoLists.map(tl => tl.id === action.todolistID ? {...tl, filter: action.value} : tl)
        default: return todoLists
    }
}

export const addTodoListAC = (title: string, newID: string) => ({type: ADD_TODOLIST, title, newID} as const)
export const removeTodoListAC = (todolistID: string) => ({type: REMOVE_TODOLIST, todolistID} as const)
export const changeTodoListTitleAC = (todolistID: string, title: string) => ({type: CHANGE_TDL_NAME, todolistID, title} as const)
export const changeTodoListFilterAC = (todolistID: string, value: FilterValuesType) => ({type: CHANGE_FILTER, todolistID, value} as const)