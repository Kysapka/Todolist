// thunks
import { Dispatch } from 'redux';

import { todolistsAPI } from '../../../api/todolists-api';
import { setAppStatusAC } from '../../../app/AppReducer';
import { handleServerNetworkError } from '../../../utils/error-utils';
import { fetchTasksTC } from '../TasksReducer';
import {
  addTodoListAC,
  changeTodolistEntityStatusAC,
  changeTodoListTitleAC,
  removeTodoListAC,
  setTodoListsAC,
} from '../TodolistsReducer';

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
