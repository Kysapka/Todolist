import React from "react";
import {Provider} from "react-redux";
import {TotoListReducer} from "../../features/TodolistsList/TodolistReducer";
import {TasksReducer} from "../../features/TodolistsList/TasksReducer";
import {applyMiddleware, combineReducers, createStore} from 'redux'
import {AppStateType} from "../../app/store";
import {tasksPriorities, taskStatuses} from "../../api/todolists-api";
import {AppReducer} from "../../app/AppReducer";
import thunk from "redux-thunk";



const rootReducer = combineReducers({
    todoLists: TotoListReducer,
    tasks: TasksReducer,
    app: AppReducer
})

const initialGlobalState = {
    todoLists: [
        {id: "todolistId1", title: "What to learn", order: 0, addedDate: "", filter: "all", tlEntityStatus: 'idle'},
        {id: "todolistId2", title: "What to bye", order: 0, addedDate: "", filter: "all", tlEntityStatus: 'loading'}
    ],
    tasks: {
        ["todolistId1"]: [
            {description: "React task", title: "React", status: taskStatuses.New, priority: tasksPriorities.Low,
            startDate: "", deadline: "", id: "taskId1", todoListId: "todolistId1", order: 0, addedDate: "", tsEntityStatus: 'idle'}
        ],
        ["todolistId2"]: [
            {description: "Milk", title: "Milk", status: taskStatuses.New, priority: tasksPriorities.Low,
                startDate: "", deadline: "", id: "taskId1", todoListId: "todolistId1", order: 0, addedDate: "", tsEntityStatus: 'idle'}
        ]
    },
    app: {
        error: null,
        status: 'idle'
    },
    auth: {
        isLoggedIn: false
    }
};

const storyBookStore = createStore(rootReducer, initialGlobalState as AppStateType, applyMiddleware(thunk));

export const ReduxStoreProviderDecorator = (storyFn: any) => (
    <Provider
        store={storyBookStore}>{storyFn()}
    </Provider>)
