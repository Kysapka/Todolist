import {v1} from "uuid";

const ADD_TODOLIST = 'ADD-TODOLIST'
const REMOVE_TODOLIST = 'REMOVE_TODOLIST'

type FilterValuesType = "all" | "active" | "completed";
export type todoListsType = Array<{ id: string, title: string, filter: FilterValuesType }>

export type TodoListActionsTypes = ReturnType<typeof addTodoListAC> | ReturnType<typeof removeTodoListAC>

// let initState: todoListsType = JSON.parse(localStorage.getItem('TDL')!)
let initState: todoListsType = [
    {id: 'id1', title: "What to learn", filter: "all"},
]

export const TotoListReducer = (todoLists: todoListsType = initState, action: TodoListActionsTypes):todoListsType => {
    switch (action.type) {
        case "ADD-TODOLIST":
            let newTodoList: todoListsType = [{id: v1(), title: action.title, filter: "all"}, ...todoLists]
            return newTodoList
            // setTasks({...tasks, [todolistID]: []})
            // localStorage.removeItem('TDL')
            // localStorage.setItem('TDL', JSON.stringify(newTodoList))
        case REMOVE_TODOLIST:
            let updatedTodoList = [...todoLists.filter(tl => tl.id !== action.todolistID)]
            return updatedTodoList
            // delete tasks[todolistID]
            // setTasks({...tasks})
            // localStorage.removeItem(`TDL`)
            // localStorage.setItem('TDL', JSON.stringify(updatedTodoList))
            // localStorage.removeItem('TSK')
            // localStorage.setItem('TSK', JSON.stringify({...tasks}))
            default: return todoLists
    }
}

export const addTodoListAC = (title: string) => ({type: ADD_TODOLIST, title} as const)
export const removeTodoListAC = (todolistID: string) => ({type: REMOVE_TODOLIST, todolistID} as const)