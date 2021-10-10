import React from "react";
import {Provider} from "react-redux";
import {TotoListReducer} from "../../state/TodolistReducer";
import {TasksReducer} from "../../state/TasksReducer";
import {combineReducers, createStore} from 'redux'
import {v1} from 'uuid'
import {AppStateType} from "../../state/Store";



const rootReducer = combineReducers({
    todoLists: TotoListReducer,
    tasks: TasksReducer
})

const initialGlobalState = {
    todoLists: [
        {id: "todolistId1", title: "What to learn", filter: "all"},
        {id: "todolistId2", title: "What to buy", filter: "all"}
    ] ,
    tasks: {
        ["todolistId1"]: [
            {id: v1(), title: "HTML&CSS", isDone: true},
            {id: v1(), title: "JS", isDone: true}
        ],
        ["todolistId2"]: [
            {id: v1(), title: "Milk", isDone: true},
            {id: v1(), title: "React Book", isDone: true}
        ]
    }
};

const storyBookStore = createStore(rootReducer, initialGlobalState as AppStateType);

export const ReduxStoreProviderDecorator = (storyFn: any) => (
    <Provider
        store={storyBookStore}>{storyFn()}
    </Provider>)