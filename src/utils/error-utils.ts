import { Dispatch } from 'redux';

import { ResponseType } from '../api/todolists-api';
import { setAppErrorAC, setAppStatusAC } from '../app/AppReducer';

// generic function
export const handleServerAppError = <T>(
  data: ResponseType<T>,
  dispatch: ErrorUtilsDispatchType,
): void => {
  if (data.data.messages) {
    dispatch(setAppErrorAC({ error: data.data.messages[0] }));
  } else {
    dispatch(setAppErrorAC({ error: 'Some error occurred' }));
  }
  dispatch(setAppStatusAC({ status: 'failed' }));
};

export const handleServerNetworkError = (
  error: { message: string },
  dispatch: ErrorUtilsDispatchType,
): void => {
  dispatch(setAppErrorAC({ error: error.message }));
  dispatch(setAppStatusAC({ status: 'failed' }));
};

type ErrorUtilsDispatchType = Dispatch;
