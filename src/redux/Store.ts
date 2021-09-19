import {combineReducers, createStore} from "redux";
import {TotoListReducer} from "../reducers/TodolistReducer";
import {TasksReducer} from "../reducers/TasksReducer";
import {loadState} from "../utils/loadState";
import {saveState} from "../utils/saveState";

export const RootReducer = combineReducers({
    todoLists: TotoListReducer,
    tasks: TasksReducer
})

export type AppStateType = ReturnType<typeof RootReducer>

export const AppState = createStore(RootReducer, loadState())

AppState.subscribe(() => saveState(AppState.getState()))