import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Dispatch } from 'redux';

import {
  PayloadTaskType,
  tasksPriorities,
  taskStatuses,
  TaskType,
  todolistsAPI,
  TodolistType,
} from '../../api/todolists-api';
import { RequestStatusType, setAppStatusAC } from '../../app/AppReducer';
import { AppStateType } from '../../app/store';
import { handleServerAppError, handleServerNetworkError } from '../../utils/error-utils';

import { addTodoListAC, clearDataAC, setTodoListsAC } from './TodolistReducer';

const initialState: TasksType = {};

const slice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    setTasksAC(state, action: PayloadAction<{ tasks: TaskType[]; todoListId: string }>) {
      state[action.payload.todoListId] = action.payload.tasks.map(ts => ({
        ...ts,
        tsEntityStatus: 'idle',
      }));
      // return {
      //   ...state,
      //   [action.payload.todoListId]: action.payload.tasks.map((ts: any) => ({
      //     ...ts,
      //     tsEntityStatus: 'idle',
      //   })),
      // };
    },
    addTaskAC(state, action: PayloadAction<{ task: TaskType }>) {
      state[action.payload.task.todoListId].unshift({
        ...action.payload.task,
        tsEntityStatus: 'idle',
      });
      // return {
      //   ...state,
      //   [action.payload.task.todoListId]: [
      //     { ...action.payload.task, tsEntityStatus: 'idle' },
      //     ...state[action.payload.task.todoListId],
      //   ],
      // };
    },
    removeTaskAC(state, action: PayloadAction<{ todolistID: string; id: string }>) {
      const index = state[action.payload.todolistID].findIndex(
        ts => ts.id === action.payload.id,
      );
      state[action.payload.todolistID].slice(index, 1);
      // return {
      //   ...state,
      //   [action.payload.todolistID]: state[action.payload.todolistID].filter(
      //     ts => ts.id !== action.payload.id,
      //   ),
      // };
    },
    updateTaskAC(
      state,
      action: PayloadAction<{
        todolistID: string;
        taskID: string;
        model: updateDomainTaskModelType;
      }>,
    ) {
      const index = state[action.payload.todolistID].findIndex(
        ts => ts.id === action.payload.taskID,
      );
      let updatedTask = state[action.payload.todolistID][index];
      updatedTask = { ...updatedTask, ...action.payload.model };

      // return {
      //   ...state,
      //   [action.payload.todolistID]: state[action.payload.todolistID].map(ts =>
      //     ts.id === action.payload.taskID ? { ...ts, ...action.payload.model } : ts,
      //   ),
      // };
    },
    changeTaskEntityStatusAC(
      state,
      action: PayloadAction<{
        todolistID: string;
        taskID: string;
        entityStatus: RequestStatusType;
      }>,
    ) {
      const index = state[action.payload.todolistID].findIndex(
        ts => ts.id === action.payload.taskID,
      );
      state[action.payload.todolistID][index].tsEntityStatus =
        action.payload.entityStatus;
      // return {
      //   ...state,
      //   [action.payload.todolistID]: state[action.payload.todolistID].map(ts =>
      //     ts.id === action.payload.taskID ? { ...ts, tsEntityStatus: action.payload.entityStatus } : ts,
      //   ),
      // };
    },
  },
  extraReducers(builder) {
    builder.addCase(
      setTodoListsAC.type,
      (state, action: PayloadAction<{ todoLists: TodolistType[] }>) =>
        action.payload.todoLists.reduce((acc: any, tl) => ({ ...acc, [tl.id]: [] }), {
          ...state,
        }),
    );
    builder.addCase(
      addTodoListAC.type,
      (state, action: PayloadAction<{ todolist: TodolistType }>) => ({
        ...state,
        [action.payload.todolist.id]: [],
      }),
    );
    builder.addCase(clearDataAC.type, () => {});
  },
});

export const TasksReducer = slice.reducer;
export const {
  setTasksAC,
  removeTaskAC,
  addTaskAC,
  changeTaskEntityStatusAC,
  updateTaskAC,
} = slice.actions;

// export const _TasksReducer = (tasks: TasksType = {}, action: any): TasksType => {
//   switch (action.type) {
// case TSK_ACTIONS.CHANGE_TASK_ENTITY_STATUS:
//   return {
//     ...tasks,
//     [action.todolistID]: tasks[action.todolistID].map(ts =>
//       ts.id === action.taskID ? { ...ts, tsEntityStatus: action.entityStatus } : ts,
//     ),
//   };
// case setTodoListsAC.type:
//   return action.payload.todoLists.reduce(
//     (acc: any, tl: any) => ({ ...acc, [tl.id]: [] }),
//     {
//       ...tasks,
//     },
//   );
// case TSK_ACTIONS.SET_TASKS:
// return {
//   ...tasks,
//   [action.todoListId]: action.tasks.map((ts: any) => ({
//     ...ts,
//     tsEntityStatus: 'idle',
//   })),
// };
// case TSK_ACTIONS.ADD_TASK:
// return {
//   ...tasks,
//   [action.task.todoListId]: [
//     { ...action.task, tsEntityStatus: 'idle' },
//     ...tasks[action.task.todoListId],
//   ],
// };
// case addTodoListAC.type:
//   return { ...tasks, [action.payload.todolist.id]: [] };
// case removeTodoListAC.type: {
//   const copyTasks = { ...tasks };
//   delete copyTasks[action.payload.todolistID];
//   return copyTasks;
// }
// case TSK_ACTIONS.REMOVE_TASK:
//   return {
//     ...tasks,
//     [action.todolistID]: tasks[action.todolistID].filter(ts => ts.id !== action.id),
//   };
// case TSK_ACTIONS.UPDATE_TASK:
//   return {
//     ...tasks,
//     [action.todolistID]: tasks[action.todolistID].map(ts =>
//       ts.id === action.taskID ? { ...ts, ...action.model } : ts,
//     ),
//   };
//     case clearDataAC.type:
//       return {};
//     default:
//       return tasks;
//   }
// };

// action creators
// export const setTasksAC = (tasks: TaskType[], todoListId: string) => ({
//   type: TSK_ACTIONS.SET_TASKS,
//   tasks,
//   todoListId,
// });
// export const addTaskAC = (task: TaskType) => ({ type: TSK_ACTIONS.ADD_TASK, task });
// export const removeTaskAC = (todolistID: string, id: string) => ({
//   type: TSK_ACTIONS.REMOVE_TASK,
//   todolistID,
//   id,
// });
// export const updateTaskAC = (
//   todolistID: string,
//   taskID: string,
//   model: updateDomainTaskModelType,
// ) => ({ type: TSK_ACTIONS.UPDATE_TASK, todolistID, taskID, model });
// export const changeTaskEntityStatusAC = (
//   todolistID: string,
//   taskID: string,
//   entityStatus: RequestStatusType,
// ) => ({ type: TSK_ACTIONS.CHANGE_TASK_ENTITY_STATUS, todolistID, taskID, entityStatus });

// thunk
export const fetchTasksTC = (todoListId: string) => (dispatch: Dispatch) => {
  dispatch(setAppStatusAC({ status: 'loading' }));
  todolistsAPI.getTasks(todoListId).then(res => {
    dispatch(setTasksAC({ tasks: res.data.items, todoListId }));
    dispatch(setAppStatusAC({ status: 'succeeded' }));
  });
};

export const removeTaskTC =
  (todoListId: string, taskId: string) => (dispatch: Dispatch) => {
    dispatch(setAppStatusAC({ status: 'loading' }));
    dispatch(
      changeTaskEntityStatusAC({
        taskID: taskId,
        todolistID: todoListId,
        entityStatus: 'loading',
      }),
    );
    todolistsAPI.deleteTask(todoListId, taskId).then(res => {
      dispatch(removeTaskAC({ id: taskId, todolistID: todoListId }));
      dispatch(setAppStatusAC({ status: 'succeeded' }));
      dispatch(
        changeTaskEntityStatusAC({
          taskID: taskId,
          todolistID: todoListId,
          entityStatus: 'succeeded',
        }),
      );
    });
  };

export const addTaskTC = (title: string, todoListId: string) => (dispatch: Dispatch) => {
  dispatch(setAppStatusAC({ status: 'loading' }));
  todolistsAPI
    .createTask(title, todoListId)
    .then(res => {
      if (res.data.resultCode === 0) {
        dispatch(addTaskAC({ task: res.data.data.item }));
        dispatch(setAppStatusAC({ status: 'succeeded' }));
      } else {
        handleServerAppError(res, dispatch);
      }
    })
    .catch(error => {
      handleServerNetworkError(error, dispatch);
    });
};

export const updateTaskTC =
  (todolistId: string, taskId: string, domainModel: updateDomainTaskModelType) =>
  (dispatch: Dispatch, getState: () => AppStateType) => {
    const task = getState().tasks[todolistId].find(t => t.id === taskId);
    if (!task) {
      return;
    }

    const apiModel: PayloadTaskType = {
      deadline: task.deadline,
      description: task.description,
      priority: task.priority,
      startDate: task.startDate,
      title: task.title,
      status: task.status,
      ...domainModel,
    };

    dispatch(setAppStatusAC({ status: 'loading' }));
    dispatch(
      changeTaskEntityStatusAC({
        taskID: taskId,
        todolistID: todolistId,
        entityStatus: 'loading',
      }),
    );

    todolistsAPI
      .updateTask(todolistId, taskId, apiModel)
      .then(res => {
        if (res.data.resultCode === 0) {
          const model = res.data.data.item;
          dispatch(updateTaskAC({ taskID: taskId, todolistID: todolistId, model }));
          dispatch(setAppStatusAC({ status: 'succeeded' }));
          dispatch(
            changeTaskEntityStatusAC({
              taskID: taskId,
              todolistID: todolistId,
              entityStatus: 'succeeded',
            }),
          );
        } else {
          handleServerAppError(res, dispatch);
        }
      })
      .catch(error => {
        handleServerNetworkError(error, dispatch);
      });
  };

// types
export type updateDomainTaskModelType = {
  title?: string;
  startDate?: string;
  priority?: tasksPriorities;
  description?: string;
  deadline?: string;
  status?: taskStatuses;
};

export type TaskDomainType = TaskType & {
  tsEntityStatus: RequestStatusType;
};
export type TasksType = {
  [key: string]: Array<TaskDomainType>;
};
// export type TasksActionsTypes =
//   | ReturnType<typeof removeTodoListAC>
//   | ReturnType<typeof addTodoListAC>
//   | ReturnType<typeof addTaskAC>
//   | ReturnType<typeof removeTaskAC>
//   | ReturnType<typeof setTodoListsAC>
//   | ReturnType<typeof setTasksAC>
//   | ReturnType<typeof updateTaskAC>
//   | ReturnType<typeof changeTaskEntityStatusAC>
//   | ReturnType<typeof clearDataAC>;
//
// type ThunkActionsTypes = TasksActionsTypes;
