import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RequestStatusType, setAppStatusAC } from 'app/AppReducer';
import { AppStateType } from 'app/store';
import { Dispatch } from 'redux';

import {
  PayloadTaskType,
  tasksPriorities,
  taskStatuses,
  TaskType,
  todolistsAPI,
} from '../../api/todolists-api';
import { handleServerAppError, handleServerNetworkError } from '../../utils/error-utils';

import {
  addTodoListAC,
  clearDataAC,
  removeTodoListAC,
  setTodoListsAC,
} from './TodolistsReducer';

const initialState: TasksType = {};
export const fetchTasksTC = createAsyncThunk(
  'tasks/fetchTasks',
  async (todoListId: string, thunkAPI) => {
    thunkAPI.dispatch(setAppStatusAC({ status: 'loading' }));
    const response = await todolistsAPI.getTasks(todoListId);
    const tasks = response.data.items;
    thunkAPI.dispatch(setAppStatusAC({ status: 'succeeded' }));
    return { tasks, todoListId };
    // return todolistsAPI
    //   .getTasks(todoListId)
    //
    //   .then(res => {
    //     const tasks = res.data.items;
    //     // thunkAPI.dispatch(setTasksAC({ tasks: res.data.items, todoListId }));
    //     thunkAPI.dispatch(setAppStatusAC({ status: 'succeeded' }));
    //     return { tasks, todoListId };
    //   });
  },
  // .catch(error => {
  //   handleServerNetworkError(error, thunkAPI.dispatch);
  // })
  // .finally(() => {
  //   thunkAPI.dispatch(setAppStatusAC({ status: 'idle' }));
  // });
);
const taskSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    // setTasksAC(state, action: PayloadAction<{ tasks: TaskType[]; todoListId: string }>) {
    //   state[action.payload.todoListId] = action.payload.tasks.map(ts => ({
    //     ...ts,
    //     tsEntityStatus: 'idle',
    //   }));
    // },
    addTaskAC(state, action: PayloadAction<{ task: TaskType }>) {
      state[action.payload.task.todoListId].unshift({
        ...action.payload.task,
        tsEntityStatus: 'idle',
      });
    },
    removeTaskAC(state, action: PayloadAction<{ todolistID: string; id: string }>) {
      const index = state[action.payload.todolistID].findIndex(
        ts => ts.id === action.payload.id,
      );
      state[action.payload.todolistID].splice(index, 1);
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
      state[action.payload.todolistID][index] = {
        ...state[action.payload.todolistID][index],
        ...action.payload.model,
      };
    },
    changeTaskEntityStatusAC(
      state,
      action: PayloadAction<{
        todolistID: string;
        taskID: string;
        entityStatus: RequestStatusType;
      }>,
    ) {
      const currentTasks = state[action.payload.todolistID];
      const index = currentTasks.findIndex(ts => ts.id === action.payload.taskID);
      currentTasks[index].tsEntityStatus = action.payload.entityStatus;
    },
  },
  extraReducers: builder => {
    builder.addCase(addTodoListAC, (state, action) => {
      state[action.payload.todolist.id] = [];
    });
    builder.addCase(removeTodoListAC, (state, action) => {
      delete state[action.payload.todolistID];
    });
    builder.addCase(setTodoListsAC, (state, action) =>
      action.payload.todoLists.forEach(tl => {
        state[tl.id] = [];
      }),
    );
    builder.addCase(clearDataAC, () => {});
    builder.addCase(fetchTasksTC.fulfilled, (state, action) => {
      state[action.payload.todoListId] = action.payload.tasks.map(ts => ({
        ...ts,
        tsEntityStatus: 'idle',
      }));
    });
  },
});

export const TasksReducer = taskSlice.reducer;
const { removeTaskAC, addTaskAC, changeTaskEntityStatusAC, updateTaskAC } =
  taskSlice.actions;

// thunk
// export const _fetchTasksTC = (todoListId: string) => (dispatch: Dispatch) => {
//   dispatch(setAppStatusAC({ status: 'loading' }));
//   todolistsAPI
//     .getTasks(todoListId)
//     .then(res => {
//       if (res.data.error === null) {
//         dispatch(setTasksAC({ tasks: res.data.items, todoListId }));
//         dispatch(setAppStatusAC({ status: 'succeeded' }));
//       }
//     })
//     .catch(error => {
//       handleServerNetworkError(error, dispatch);
//     })
//     .finally(() => {
//       dispatch(setAppStatusAC({ status: 'idle' }));
//     });
// };

export const removeTaskTC =
  (todoListId: string, taskId: string) => (dispatch: Dispatch) => {
    dispatch(setAppStatusAC({ status: 'loading' }));

    todolistsAPI
      .deleteTask(todoListId, taskId)
      .then(res => {
        if (res.data.resultCode === 0) {
          dispatch(removeTaskAC({ id: taskId, todolistID: todoListId }));
          dispatch(setAppStatusAC({ status: 'succeeded' }));
        } else {
          handleServerAppError(res, dispatch);
        }
      })
      .catch(error => {
        handleServerNetworkError(error, dispatch);
      })
      .finally(() => {
        dispatch(setAppStatusAC({ status: 'idle' }));
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
    })
    .finally(() => {
      dispatch(setAppStatusAC({ status: 'idle' }));
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
type updateDomainTaskModelType = {
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
type TasksType = {
  [key: string]: Array<TaskDomainType>;
};
