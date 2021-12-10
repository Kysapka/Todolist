import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AxiosError } from 'axios';
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
export const initializeAppTC = createAsyncThunk<
  boolean,
  null,
  { rejectValue: { error: string } }
>('app/initialize', async (param, { dispatch, rejectWithValue }) => {
  try {
    const res = await authAPI.me();
    if (res.data.resultCode === 0) {
      return true;
    }
    handleServerAppError(res, dispatch);
    return rejectWithValue({ error: 'handleServerAppError' });
  } catch (error) {
    // right handle errors with define types
    const err = error as AxiosError;
    handleServerNetworkError(err, dispatch);
    return rejectWithValue({ error: err.message });
  }
});

const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    setIsInitializedAC(state, action: PayloadAction<{ value: boolean }>) {
      state.isInitialized = true;
    },
    setAppStatusAC(state, action: PayloadAction<{ status: RequestStatusType }>) {
      state.status = action.payload.status;
    },
    setAppErrorAC(state, action: PayloadAction<{ error: string | null }>) {
      state.error = action.payload.error;
    },
  },
  extraReducers: builder =>
    builder.addCase(initializeAppTC.fulfilled, (state, action) => {
      state.isInitialized = true;
    }),
});

export const AppReducer = appSlice.reducer;
export const { setIsInitializedAC, setAppStatusAC, setAppErrorAC } = appSlice.actions;

// thunk
export const _initializeAppTC = () => (dispatch: Dispatch) => {
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
