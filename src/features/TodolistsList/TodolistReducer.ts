import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Dispatch } from 'redux';

import { todolistsAPI, TodolistType } from '../../api/todolists-api';
import { RequestStatusType, setAppStatusAC } from '../../app/AppReducer';
import { handleServerNetworkError } from '../../utils/error-utils';

import { fetchTasksTC } from './TasksReducer';

const initialState: TodoListsType = [];

const todolistSlice = createSlice({
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
      state.slice(index, 1);
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

const TotoListReducer = todolistSlice.reducer;
export const {
  changeTodolistEntityStatusAC,
  changeTodoListFilterAC,
  changeTodoListTitleAC,
  addTodoListAC,
  removeTodoListAC,
  setTodoListsAC,
  clearDataAC,
} = todolistSlice.actions;

// thunk
export const fetchTodolistsTC = () => (dispatch: any) => {
  dispatch(setAppStatusAC({ status: 'loading' }));
  todolistsAPI
    .getTodolist()
    .then(res => {
      dispatch(setTodoListsAC({ todoLists: res.data }));
      dispatch(setAppStatusAC({ status: 'succeeded' }));
      return res.data;
    })
    .then(todos => {
      todos.forEach(tl => {
        dispatch(fetchTasksTC(tl.id));
      });
    })
    .catch(error => {
      handleServerNetworkError(error, dispatch);
    });
};
export const removeTodoListTC = (todolistID: string) => (dispatch: Dispatch) => {
  dispatch(changeTodolistEntityStatusAC({ id: todolistID, entityStatus: 'loading' }));
  dispatch(setAppStatusAC({ status: 'loading' }));
  todolistsAPI
    .deleteTodolist(todolistID)
    .then(() => {
      dispatch(removeTodoListAC({ todolistID }));
      dispatch(setAppStatusAC({ status: 'succeeded' }));
    })
    .catch(error => {
      handleServerNetworkError(error, dispatch);
    });
};
export const addTodoListTC = (title: string) => (dispatch: Dispatch) => {
  dispatch(setAppStatusAC({ status: 'loading' }));
  todolistsAPI
    .createTodolist(title)
    .then(response => {
      dispatch(addTodoListAC({ todolist: response.data.data.item }));
      dispatch(setAppStatusAC({ status: 'succeeded' }));
    })
    .catch(error => {
      handleServerNetworkError(error, dispatch);
    });
};
export const changeTodoListTitleTC =
  (todolistID: string, title: string) => (dispatch: Dispatch) => {
    dispatch(setAppStatusAC({ status: 'loading' }));
    todolistsAPI
      .updateTodolist(title, todolistID)
      .then(() => {
        dispatch(changeTodoListTitleAC({ todolistID, title }));
        dispatch(setAppStatusAC({ status: 'succeeded' }));
      })
      .catch(error => {
        handleServerNetworkError(error, dispatch);
      });
  };

// types
export type TodoListsType = Array<TodoListDomenType>;

export type FilterValuesType = 'all' | 'active' | 'completed';
export type TodoListDomenType = TodolistType & {
  filter: FilterValuesType;
  tlEntityStatus: RequestStatusType;
};

export default TotoListReducer;
