import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Dispatch } from 'redux';

import { authAPI, AuthPayloadType } from '../../api/todolists-api';
import { setAppStatusAC } from '../../app/AppReducer';
import { handleServerAppError, handleServerNetworkError } from '../../utils/error-utils';
import { clearDataAC } from '../TodolistsList/TodolistsReducerExportActions';

const initialState = {
  isLoggedIn: false,
};

const slice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setIsLoggedInAC(state, action: PayloadAction<{ value: boolean }>) {
      state.isLoggedIn = action.payload.value;
    },
  },
});

export const AuthReducer = slice.reducer;
export const { setIsLoggedInAC } = slice.actions;

// thunks
export const loginTC = (authPayload: AuthPayloadType) => (dispatch: Dispatch) => {
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
