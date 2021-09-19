import {combineReducers, createStore} from "redux";
import {TotoListReducer} from "./TodolistReducer";
import {TasksReducer} from "./TasksReducer";
import {loadState} from "../utils/loadState";
import {saveState} from "../utils/saveState";

export const RootReducer = combineReducers({
    todoLists: TotoListReducer,
    tasks: TasksReducer
})

export type AppStateType = ReturnType<typeof RootReducer>

export const rootState = createStore(RootReducer, loadState())

rootState.subscribe(() => saveState(rootState.getState()))