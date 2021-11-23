import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Dispatch } from 'redux';

import { authAPI } from '../api/todolists-api';
import { setIsLoggedInAC } from '../features/Login/AuthReducer';
import { handleServerAppError, handleServerNetworkError } from '../utils/error-utils';

export type InitialStateType = {
  isInitialized: boolean;
  status: RequestStatusType;
  error: string | null;
};

const initialState: InitialStateType = {
  isInitialized: false,
  status: 'idle',
  error: null,
};

const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    setIsInitializedAC(state, action: PayloadAction<{ value: boolean }>) {
      state.isInitialized = action.payload.value;
    },
    setAppStatusAC(state, action: PayloadAction<{ status: RequestStatusType }>) {
      state.status = action.payload.status;
    },
    setAppErrorAC(state, action: PayloadAction<{ error: string | null }>) {
      state.error = action.payload.error;
    },
  },
});

export const AppReducer = appSlice.reducer;
export const { setIsInitializedAC, setAppStatusAC, setAppErrorAC } = appSlice.actions;

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
