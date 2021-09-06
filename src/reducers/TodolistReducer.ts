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

let initState: todoListsType = JSON.parse(localStorage.getItem('TDL')!)
// let initState: todoListsType = [
//     {id: '1', title: "What to learn", filter: "all"},
//     {id: '2', title: "What to buy", filter: "all"}
// ]

const updateTodoListLocalStorage = (todoList: todoListsType) => {
    localStorage.removeItem('TDL')
    localStorage.setItem('TDL', JSON.stringify(todoList))
}

export const TotoListReducer = (todoLists: todoListsType = initState ? initState : [], action: TodoListActionsTypes):todoListsType => {
    switch (action.type) {
        case "ADD-TODOLIST":
            let newTodoList :todoListsType  = [...todoLists, {id: action.newID, title: action.title, filter: 'all'}]
            updateTodoListLocalStorage(newTodoList)
            return newTodoList

        case REMOVE_TODOLIST:
            let filteredTodoList = [...todoLists.filter(tl => tl.id !== action.todolistID)]
            updateTodoListLocalStorage(filteredTodoList)
            return filteredTodoList

        case "CHANGE_TDL_NAME":
            let updatedTodoList = todoLists.map(tl => tl.id === action.todolistID ? {...tl, title : action.title} : tl)
            updateTodoListLocalStorage(updatedTodoList)
            return updatedTodoList

        case "CHANGE_FILTER":
            let filteredTodolist = todoLists.map(tl => tl.id === action.todolistID ? {...tl, filter: action.value} : tl)
            return filteredTodolist

        default: return todoLists
    }
}

export const addTodoListAC = (title: string, newID: string) => ({type: ADD_TODOLIST, title, newID} as const)
export const removeTodoListAC = (todolistID: string) => ({type: REMOVE_TODOLIST, todolistID} as const)
export const changeTodoListTitleAC = (todolistID: string, title: string) => ({type: CHANGE_TDL_NAME, todolistID, title} as const)
export const changeTodoListFilterAC = (todolistID: string, value: FilterValuesType) => ({type: CHANGE_FILTER, todolistID, value} as const)