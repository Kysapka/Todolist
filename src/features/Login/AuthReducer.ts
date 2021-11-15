import { Dispatch } from 'redux';

import { authAPI, AuthPayloadType } from '../../api/todolists-api';
import {
  SetAppErrorActionType,
  setAppStatusAC,
  SetAppStatusActionType,
} from '../../app/AppReducer';
import { handleServerAppError, handleServerNetworkError } from '../../utils/error-utils';
import { clearDataAC } from '../TodolistsList/TodolistReducer';

const initialState = {
  isLoggedIn: false,
};
type InitialStateType = typeof initialState;

export const AuthReducer = (
  state: InitialStateType = initialState,
  action: ActionsType,
): InitialStateType => {
  switch (action.type) {
    case 'login/SET-IS-LOGGED-IN':
      return { ...state, isLoggedIn: action.value };
    default:
      return state;
  }
};

export const setIsLoggedInAC = (value: boolean) =>
  ({ type: 'login/SET-IS-LOGGED-IN', value } as const);

// thunks
export const loginTC =
  (authPayload: AuthPayloadType) => (dispatch: Dispatch<ActionsType>) => {
    dispatch(setAppStatusAC('loading'));
    authAPI
      .login(authPayload)
      .then(res => {
        if (res.data.resultCode === 0) {
          dispatch(setIsLoggedInAC(true));
          dispatch(setAppStatusAC('succeeded'));
        } else {
          handleServerAppError(res, dispatch);
        }
      })
      .catch(error => {
        handleServerNetworkError(error, dispatch);
      });
  };

export const logoutTC = () => (dispatch: Dispatch<ActionsType>) => {
  dispatch(setAppStatusAC('loading'));
  authAPI
    .logout()
    .then(res => {
      if (res.data.resultCode === 0) {
        dispatch(setIsLoggedInAC(false));
        dispatch(clearDataAC());
        dispatch(setAppStatusAC('succeeded'));
      } else {
        handleServerAppError(res, dispatch);
      }
    })
    .catch(error => {
      handleServerNetworkError(error, dispatch);
    });
};

// types
type ActionsType =
  | ReturnType<typeof setIsLoggedInAC>
  | SetAppStatusActionType
  | SetAppErrorActionType
  | ReturnType<typeof clearDataAC>;
