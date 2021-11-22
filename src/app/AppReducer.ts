import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Dispatch } from 'redux';

import { authAPI } from '../api/todolists-api';
import { setIsLoggedInAC } from '../features/Login/AuthReducer';
import { handleServerAppError, handleServerNetworkError } from '../utils/error-utils';

// export type InitialStateType = {
//   isInitialized: boolean;
//   status: RequestStatusType;
//   error: string | null;
// };

const initialState = {
  isInitialized: false,
  status: 'idle',
  error: '',
};

const slice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    setIsInitializedAC(state, action: PayloadAction<{ value: boolean }>) {
      state.isInitialized = action.payload.value;
    },
    setAppStatusAC(state, action: PayloadAction<{ status: RequestStatusType }>) {
      state.status = action.payload.status;
    },
    setAppErrorAC(state, action: PayloadAction<{ error: string }>) {
      state.error = action.payload.error;
    },
  },
});

export const AppReducer = slice.reducer;
export const { setIsInitializedAC, setAppStatusAC, setAppErrorAC } = slice.actions;

// export const AppReducer = (
//   state: InitialStateType = initialState,
//   action: AppActionsType,
// ): InitialStateType => {
//   switch (action.type) {
//     case 'APP/SET_IS_INITIALIZED':
//       return { ...state, isInitialized: action.value };
//     case 'APP/SET_STATUS':
//       return { ...state, status: action.status };
//     case 'APP/SET_ERROR':
//       return { ...state, error: action.error };
//     default:
//       return { ...state };
//   }
// };

// action creators
// export const setIsInitializedAC = (value: boolean) =>
//   ({ type: 'APP/SET_IS_INITIALIZED', value } as const);
// export const setAppStatusAC = (status: RequestStatusType) =>
//   ({ type: 'APP/SET_STATUS', status } as const);
// export const setAppErrorAC = (error: string | null) =>
//   ({ type: 'APP/SET_ERROR', error } as const);

// thunk
export const initializeAppTC = () => (dispatch: Dispatch) => {
  authAPI
    .me()
    .then(res => {
      if (res.data.resultCode === 0) {
        dispatch(setIsLoggedInAC({ value: true }));
      } else {
        handleServerAppError(res, dispatch);
      }
    })
    .catch(error => {
      handleServerNetworkError(error, dispatch);
    })
    .finally(() => {
      dispatch(setIsInitializedAC({ value: true }));
    });
};

// types
export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed';
// export type SetAppErrorActionType = ReturnType<typeof setAppErrorAC>;
// export type SetAppStatusActionType = ReturnType<typeof setAppStatusAC>;
// export type SetIsInitializedType = ReturnType<typeof setIsInitializedAC>;
// export type AppActionsType =
//   | SetAppErrorActionType
//   | SetAppStatusActionType
//   | SetIsInitializedType;
