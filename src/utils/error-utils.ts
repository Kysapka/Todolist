import { Dispatch } from 'redux';

import { ResponseType } from '../api/todolists-api';
import {
  setAppErrorAC,
  SetAppErrorActionType,
  setAppStatusAC,
  SetAppStatusActionType,
} from '../app/AppReducer';

// generic function
export const handleServerAppError = <T>(
  data: ResponseType<T>,
  dispatch: ErrorUtilsDispatchType,
): void => {
  if (data.data.messages) {
    dispatch(setAppErrorAC(data.data.messages[0]));
  } else {
    dispatch(setAppErrorAC('Some error occurred'));
  }
  dispatch(setAppStatusAC('failed'));
};

export const handleServerNetworkError = (
  error: { message: string },
  dispatch: ErrorUtilsDispatchType,
): void => {
  dispatch(setAppErrorAC(error.message));
  dispatch(setAppStatusAC('failed'));
};

type ErrorUtilsDispatchType = Dispatch<SetAppErrorActionType | SetAppStatusActionType>;
