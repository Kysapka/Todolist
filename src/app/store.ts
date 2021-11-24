import { configureStore } from '@reduxjs/toolkit';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import { combineReducers } from 'redux';
import logger from 'redux-logger';
import thunkMiddleware from 'redux-thunk';

import { AuthReducer } from '../features/Login/AuthReducer';
import { TasksReducer } from '../features/TodolistsList/TasksReducer';
import { TotoListReducer } from '../features/TodolistsList/TodolistsReducer';

import { AppReducer } from './AppReducer';

export const RootReducer = combineReducers({
  tasks: TasksReducer,

  todoLists: TotoListReducer,

  app: AppReducer,

  auth: AuthReducer,
});

export type AppStateType = ReturnType<typeof rootState.getState>;

export type AppDispatch = typeof rootState.dispatch;

export const useAppDispatch = (): AppDispatch => useDispatch<AppDispatch>();

export const useAppSelector: TypedUseSelectorHook<AppStateType> = useSelector;

export const rootState = configureStore({
  reducer: RootReducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware().prepend(thunkMiddleware).concat(logger),
});

// @ts-ignore
window.store = rootState;
