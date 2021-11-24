import React from 'react';

import { AlertTitle } from '@mui/material';
import MuiAlert, { AlertProps } from '@mui/material/Alert';
import Snackbar from '@mui/material/Snackbar';
import { setAppErrorAC } from 'app/AppReducer';
import { AppStateType } from 'app/store';
import { useDispatch, useSelector } from 'react-redux';

const Alert = React.forwardRef<HTMLDivElement, AlertProps>((props, ref) => (
  <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />
));

export const ErrorSnackbar = (): React.ReactElement => {
  const dispatch = useDispatch();
  const error = useSelector<AppStateType, string | null>(state => state.app.error);

  const handleClose = (event?: React.SyntheticEvent, reason?: string): void => {
    if (reason === 'clickaway') {
      return;
    }
    dispatch(setAppErrorAC({ error: null }));
  };

  return (
    <Snackbar
      anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      open={error !== null}
      autoHideDuration={6000}
      onClose={handleClose}
    >
      <Alert severity="error" onClose={handleClose}>
        <AlertTitle>{error}</AlertTitle>
      </Alert>
    </Snackbar>
  );
};
