import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Dispatch } from 'redux';

import { todolistsAPI, TodolistType } from '../../api/todolists-api';
import { RequestStatusType, setAppStatusAC } from '../../app/AppReducer';
import { TDL_ACTIONS } from '../../utils/consts/global_consts';
import { handleServerNetworkError } from '../../utils/error-utils';

import { fetchTasksTC } from './TasksReducer';

const initialState: TodoListsType = [];

const slice = createSlice({
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

export const TotoListReducer = slice.reducer;
export const {
  changeTodolistEntityStatusAC,
  changeTodoListFilterAC,
  changeTodoListTitleAC,
  addTodoListAC,
  removeTodoListAC,
  setTodoListsAC,
  clearDataAC,
} = slice.actions;

// export const _TotoListReducer = (
//   todoLists: TodoListsType = [],
//   action: TodoListActionsTypes,
// ): TodoListsType => {
//   switch (action.type) {
// case TDL_ACTIONS.SET_TODOLISTS:
//   return action.todoLists.map(tdl => ({
//     ...tdl,
//     filter: 'all',
//     tlEntityStatus: 'idle',
//   }));
// case TDL_ACTIONS.ADD_TODOLIST:
//   return [
//     { ...action.todolist, filter: 'all', tlEntityStatus: 'idle' },
//     ...todoLists,
//   ];
// case TDL_ACTIONS.REMOVE_TODOLIST:
//   return todoLists.filter(tl => tl.id !== action.todolistID);
// case TDL_ACTIONS.CHANGE_TDL_NAME:
// case TDL_ACTIONS.CHANGE_FILTER:
//   return todoLists.map(tl =>
//     tl.id === action.payload.id ? { ...tl, ...action.payload } : tl,
//   );

// case TDL_ACTIONS.CHANGE_TODOLIST_ENTITY_STATUS:
//   return todoLists.map(tl =>
//     tl.id === action.id ? { ...tl, tlEntityStatus: action.entityStatus } : tl,
//   );
// case TDL_ACTIONS.CLEAR_DATA:
//   return [];
//   default:
//     return todoLists;
// }
// };

// action creators
// export const addTodoListAC = (todolist: TodolistType) => ({
//   type: TDL_ACTIONS.ADD_TODOLIST,
//   todolist,
// });
// export const removeTodoListAC = (todolistID: string) => ({
//   type: TDL_ACTIONS.REMOVE_TODOLIST,
//   todolistID,
// });
// export const changeTodoListTitleAC = (todolistID: string, title: string) => ({
//   type: TDL_ACTIONS.CHANGE_TDL_NAME,
//   payload: { id: todolistID, title },
// });
// export const changeTodoListFilterAC = (todolistID: string, filter: FilterValuesType) => ({
//   type: TDL_ACTIONS.CHANGE_FILTER,
//   payload: { id: todolistID, filter },
// });

// export const setTodoListsAC = (todoLists: TodolistType[]) => ({
//   type: TDL_ACTIONS.SET_TODOLISTS,
//   todoLists,
// });
// export const changeTodolistEntityStatusAC = (
//   id: string,
//   entityStatus: RequestStatusType,
// ) => ({ type: TDL_ACTIONS.CHANGE_TODOLIST_ENTITY_STATUS, id, entityStatus });
// export const clearDataAC = () => ({ type: TDL_ACTIONS.CLEAR_DATA });

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
// export type TodoListActionsTypes =
//   | ReturnType<typeof addTodoListAC>
//   | ReturnType<typeof removeTodoListAC>
//   | ReturnType<typeof changeTodoListTitleAC>
//   | ReturnType<typeof changeTodoListFilterAC>
//   | ReturnType<typeof setTodoListsAC>
//   | ReturnType<typeof changeTodolistEntityStatusAC>
//   | ReturnType<typeof clearDataAC>;
export type FilterValuesType = 'all' | 'active' | 'completed';
export type TodoListDomenType = TodolistType & {
  filter: FilterValuesType;
  tlEntityStatus: RequestStatusType;
};
