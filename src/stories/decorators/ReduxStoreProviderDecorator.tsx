import React from "react";
import {Provider} from "react-redux";
import {TotoListReducer} from "../../features/TodolistsList/TodolistReducer";
import {TasksReducer} from "../../features/TodolistsList/TasksReducer";
import {combineReducers, createStore} from 'redux'
import {AppStateType} from "../../app/store";
import {tasksPriorities, taskStatuses} from "../../api/todolists-api";



const rootReducer = combineReducers({
    todoLists: TotoListReducer,
    tasks: TasksReducer
})

const initialGlobalState = {
    todoLists: [
        {id: "todolistId1", title: "What to learn", order: 0, addedDate: "", filter: "all", entityStatus: 'idle'}
    ],
    tasks: {
        ["todolistId1"]: [
            {description: "React task", title: "React", status: taskStatuses.New, priority: tasksPriorities.Low,
            startDate: "", deadline: "", id: "taskId1", todoListId: "todolistId1", order: 0, addedDate: ""}
        ],
    },
    app: {
        error: null,
        status: 'idle'
    }

};

const storyBookStore = createStore(rootReducer, initialGlobalState as AppStateType);

export const ReduxStoreProviderDecorator = (storyFn: any) => (
    <Provider
        store={storyBookStore}>{storyFn()}
    </Provider>)