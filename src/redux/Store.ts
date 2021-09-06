import {combineReducers, createStore} from "redux";
import {TotoListReducer} from "../reducers/TodolistReducer";
import {TasksReducer} from "../reducers/TasksReducer";

export const RootReducer = combineReducers({
    todoLists: TotoListReducer,
    tasks: TasksReducer
})

export type AppStateType = ReturnType<typeof RootReducer>

export const AppState = createStore(RootReducer)