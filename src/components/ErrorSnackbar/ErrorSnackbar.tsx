import React from 'react';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert, {AlertProps} from '@mui/material/Alert';
import {useDispatch, useSelector} from "react-redux";
import {AppStateType} from "../../app/store";
import {setAppErrorAC} from "../../app/AppReducer";

const Alert = React.forwardRef<HTMLDivElement, AlertProps>((
    props,
    ref,
) => {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export const ErrorSnackbar = () => {

    const dispatch = useDispatch()
    const error = useSelector<AppStateType, string | null>(state => state.app.error)

    const handleClose = (event?: React.SyntheticEvent, reason?: string) => {
        if (reason === 'clickaway') {
            return;
        }
        dispatch(setAppErrorAC(null))
    };

    return (
        <Snackbar anchorOrigin={{'vertical': 'bottom', 'horizontal': 'center'}} open={error !== null} autoHideDuration={6000}
                  onClose={handleClose}>
            <Alert onClose={handleClose} severity="error">{error}</Alert>
        </Snackbar>
    );
}