import { configureStore } from '@reduxjs/toolkit';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import { combineReducers } from 'redux';
import thunkMiddleware from 'redux-thunk';

import { AuthReducer } from '../features/Login/AuthReducer';
import { TasksReducer } from '../features/TodolistsList/TasksReducer';
import TotoListReducer from '../features/TodolistsList/TodolistReducer';

import { AppReducer } from './AppReducer';

export const RootReducer = combineReducers({
  todoLists: TotoListReducer,
  tasks: TasksReducer,
  app: AppReducer,
  auth: AuthReducer,
});

export type AppStateType = ReturnType<typeof rootState.getState>;
export type AppDispatch = typeof rootState.dispatch;
export const useAppDispatch = (): AppDispatch => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<AppStateType> = useSelector;

export const rootState = configureStore({
  reducer: RootReducer,
  middleware: getDefaultMiddleware => getDefaultMiddleware().prepend(thunkMiddleware),
});

// @ts-ignore
window.store = rootState;
