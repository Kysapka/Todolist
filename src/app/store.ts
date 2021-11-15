import { combineReducers, createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

import { AuthReducer } from '../features/Login/AuthReducer';
import { TasksReducer } from '../features/TodolistsList/TasksReducer';
import { TotoListReducer } from '../features/TodolistsList/TodolistReducer';

import { AppReducer } from './AppReducer';

export const RootReducer = combineReducers({
  todoLists: TotoListReducer,
  tasks: TasksReducer,
  app: AppReducer,
  auth: AuthReducer,
});

export type AppStateType = ReturnType<typeof RootReducer>;

export const rootState = createStore(RootReducer, applyMiddleware(thunk));
// loadState()
// rootState.subscribe(() => saveState(rootState.getState()))

// @ts-ignore
window.store = rootState;
