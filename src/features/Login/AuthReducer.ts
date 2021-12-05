import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AxiosError } from 'axios';
import { Dispatch } from 'redux';

import { authAPI, AuthPayloadType } from '../../api/todolists-api';
import { setAppStatusAC } from '../../app/AppReducer';
import { handleServerAppError, handleServerNetworkError } from '../../utils/error-utils';
import { clearDataAC } from '../TodolistsList/TodolistsReducer';

const initialState = {
  isLoggedIn: false,
};

export const loginTC = createAsyncThunk<
  { isLoggedIn: boolean },
  AuthPayloadType,
  {
    rejectValue: {
      errors: string[];
      fieldsErrors: any;
    };
  }
>('auth/login', async (param, thunkAPI) => {
  thunkAPI.dispatch(setAppStatusAC({ status: 'loading' }));
  try {
    const res = await authAPI.login(param);
    if (res.data.resultCode === 0) {
      thunkAPI.dispatch(setAppStatusAC({ status: 'succeeded' }));
      return { isLoggedIn: true };
    }
    handleServerAppError(res, thunkAPI.dispatch);
    return thunkAPI.rejectWithValue({
      errors: res.data.messages,
      fieldsErrors: res.data.fieldsErrors,
    });
  } catch (error) {
    const err = error as AxiosError;
    handleServerNetworkError(err, thunkAPI.dispatch);
    return thunkAPI.rejectWithValue({
      errors: [err.message],
      fieldsErrors: undefined,
    });
  }
});
const slice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setIsLoggedInAC(state, action: PayloadAction<{ value: boolean }>) {
      state.isLoggedIn = action.payload.value;
    },
  },
  extraReducers: builder => {
    builder.addCase(loginTC.fulfilled, (state, action) => {
      state.isLoggedIn = action.payload.isLoggedIn;
    });
  },
});

export const AuthReducer = slice.reducer;
export const { setIsLoggedInAC } = slice.actions;

// thunks
export const _loginTC = (authPayload: AuthPayloadType) => (dispatch: Dispatch) => {
  dispatch(setAppStatusAC({ status: 'loading' }));
  authAPI
    .login(authPayload)
    .then(res => {
      if (res.data.resultCode === 0) {
        dispatch(setIsLoggedInAC({ value: true }));
        dispatch(setAppStatusAC({ status: 'succeeded' }));
      } else {
        handleServerAppError(res, dispatch);
      }
    })
    .catch(error => {
      handleServerNetworkError(error, dispatch);
    });
};

export const logoutTC = () => (dispatch: Dispatch) => {
  dispatch(setAppStatusAC({ status: 'loading' }));
  authAPI
    .logout()
    .then(res => {
      if (res.data.resultCode === 0) {
        dispatch(setIsLoggedInAC({ value: false }));
        dispatch(clearDataAC());
        dispatch(setAppStatusAC({ status: 'succeeded' }));
      } else {
        handleServerAppError(res, dispatch);
      }
    })
    .catch(error => {
      handleServerNetworkError(error, dispatch);
    });
};

// types
