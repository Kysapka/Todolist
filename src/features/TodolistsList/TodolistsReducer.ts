import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { TodolistType } from '../../api/todolists-api';
import { RequestStatusType } from '../../app/AppReducer';

import { FilterValuesType, TodoListsType } from './types/TodolistsTypes';

const initialState: TodoListsType = [];

export const todolistSlice = createSlice({
  name: 'todoLists',
  initialState,
  reducers: {
    addTodoListAC: (state, action: PayloadAction<{ todolist: TodolistType }>) => {
      state.unshift({
        ...action.payload.todolist,
        filter: 'all',
        tlEntityStatus: 'idle',
      });
    },
    removeTodoListAC: (state, action: PayloadAction<{ todolistID: string }>) => {
      const index = state.findIndex(tl => tl.id === action.payload.todolistID);
      state.splice(index, 1);
    },
    changeTodoListTitleAC: (
      state,
      action: PayloadAction<{ todolistID: string; title: string }>,
    ) => {
      const index = state.findIndex(tl => tl.id === action.payload.todolistID);
      state[index].title = action.payload.title;
    },
    changeTodoListFilterAC: (
      state,
      action: PayloadAction<{ todolistID: string; filter: FilterValuesType }>,
    ) => {
      const index = state.findIndex(tl => tl.id === action.payload.todolistID);
      state[index].filter = action.payload.filter;
    },
    setTodoListsAC: (state, action: PayloadAction<{ todoLists: TodolistType[] }>) =>
      action.payload.todoLists.map(tdl => ({
        ...tdl,
        filter: 'all',
        tlEntityStatus: 'idle',
      })),
    changeTodolistEntityStatusAC: (
      state,
      action: PayloadAction<{ id: string; entityStatus: RequestStatusType }>,
    ) => {
      const index = state.findIndex(tl => tl.id === action.payload.id);
      state[index].tlEntityStatus = action.payload.entityStatus;
    },
    clearDataAC: () => initialState,
  },
});

export const TotoListReducer = todolistSlice.reducer;
export const {
  addTodoListAC,
  removeTodoListAC,
  setTodoListsAC,
  clearDataAC,
  changeTodolistEntityStatusAC,
  changeTodoListTitleAC,
  changeTodoListFilterAC,
} = todolistSlice.actions;
