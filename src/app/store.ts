import {combineReducers, createStore, applyMiddleware} from "redux";
import {TotoListReducer} from "../features/TodolistsList/TodolistReducer";
import {TasksReducer} from "../features/TodolistsList/TasksReducer";
import thunk from "redux-thunk";
import {AppReducer} from "./AppReducer";

export const RootReducer = combineReducers({
    todoLists: TotoListReducer,
    tasks: TasksReducer,
    app: AppReducer
})

export type AppStateType = ReturnType<typeof RootReducer>

export const rootState = createStore(RootReducer, applyMiddleware(thunk))
// loadState()
// rootState.subscribe(() => saveState(rootState.getState()))