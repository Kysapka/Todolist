import React from 'react';

import { configureStore } from '@reduxjs/toolkit';
import { TotoListReducer } from 'features/TodolistsList/TodolistsReducerExportActions';
import { Provider } from 'react-redux';
import { combineReducers } from 'redux';
import thunkMiddleware from 'redux-thunk';

import { tasksPriorities, taskStatuses } from '../../api/todolists-api';
import { AppReducer } from '../../app/AppReducer';
import { AppStateType } from '../../app/store';
import { AuthReducer } from '../../features/Login/AuthReducer';
import { TasksReducer } from '../../features/TodolistsList/TasksReducer';

export const RootReducer = combineReducers({
  todoLists: TotoListReducer,
  tasks: TasksReducer,
  app: AppReducer,
  auth: AuthReducer,
});

const rootReducer = combineReducers({
  todoLists: TotoListReducer,
  tasks: TasksReducer,
  app: AppReducer,
});

const initialGlobalState = {
  todoLists: [
    {
      id: 'todolistId1',
      title: 'What to learn',
      order: 0,
      addedDate: '',
      filter: 'all',
      tlEntityStatus: 'idle',
    },
    {
      id: 'todolistId2',
      title: 'What to bye',
      order: 0,
      addedDate: '',
      filter: 'all',
      tlEntityStatus: 'loading',
    },
  ],
  tasks: {
    todolistId1: [
      {
        description: 'React task',
        title: 'React',
        status: taskStatuses.New,
        priority: tasksPriorities.Low,
        startDate: '',
        deadline: '',
        id: 'taskId1',
        todoListId: 'todolistId1',
        order: 0,
        addedDate: '',
        tsEntityStatus: 'idle',
      },
    ],
    todolistId2: [
      {
        description: 'Milk',
        title: 'Milk',
        status: taskStatuses.New,
        priority: tasksPriorities.Low,
        startDate: '',
        deadline: '',
        id: 'taskId1',
        todoListId: 'todolistId1',
        order: 0,
        addedDate: '',
        tsEntityStatus: 'idle',
      },
    ],
  },
  app: {
    isInitialized: false,
    error: null,
    status: 'idle',
  },
  auth: {
    isLoggedIn: false,
  },
};

export const storyBookStore = configureStore({
  reducer: rootReducer,
  preloadedState: initialGlobalState as AppStateType,
  middleware: getDefaultMiddleware => getDefaultMiddleware().prepend(thunkMiddleware),
});

// const _storyBookStore = createStore(
//   rootReducer,
//   initialGlobalState as AppStateType,
//   applyMiddleware(thunkMiddleware),
// );

export const ReduxStoreProviderDecorator = (storyFn: any) => (
  <Provider store={storyBookStore}>{storyFn()}</Provider>
);
