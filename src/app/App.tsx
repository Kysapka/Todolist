import React, {useEffect} from 'react';
import './App.css';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import {Container, LinearProgress} from "@material-ui/core";
import {TodolistsList} from "../features/TodolistsList/TodolistsList";
import {ErrorSnackbar} from "../components/ErrorSnackbar/ErrorSnackbar";
import {useDispatch, useSelector} from "react-redux";
import {initializeAppTC, RequestStatusType} from "./AppReducer";
import {AppStateType} from "./store";
import {Login} from "../features/Login/Login";
import {Route, Routes} from "react-router-dom";
import {CircularProgress} from "@mui/material";
import {logoutTC} from "../features/Login/AuthReducer";

type PropsType = {
    demo?: boolean
}

export const App = React.memo(({demo = false}: PropsType) => {

    const status = useSelector<AppStateType, RequestStatusType>(state => state.app.status)
    const isInitialized = useSelector<AppStateType, boolean>(state => state.app.isInitialized)
    const isLoggedIn = useSelector<AppStateType, boolean>(state => state.auth.isLoggedIn)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(initializeAppTC())
    }, [dispatch])

    if (!isInitialized) {
        return <div
            style={{position: 'fixed', top: '30%', textAlign: 'center', width: '100%'}}>
            <CircularProgress/>
        </div>
    }

const logOutHandler = () => {
    dispatch(logoutTC());
}

    return (
        <div>
            <Container maxWidth="xl">
                <ErrorSnackbar/>
                <AppBar position="static" style={{marginBottom: 30}}>
                    <Toolbar style={{display: 'flex', justifyContent: 'space-between'}}>
                        <div style={{display: 'flex', alignItems: 'center'}}>
                            <IconButton edge="start" color="inherit" aria-label="menu">
                                <MenuIcon/>
                            </IconButton>
                            <Typography variant="h6">
                                My Todolist Project
                            </Typography>
                        </div>
                        <Button color="inherit" onClick={logOutHandler} disabled={!isLoggedIn}>Log out</Button>
                    </Toolbar>
                    <div className={'linearProgress'}>
                        {status === 'loading' && <LinearProgress/>}
                    </div>
                </AppBar>
                <Routes>
                    <Route path={'/'} element={<TodolistsList demo={demo}/>} />
                    <Route path={'login'} element={<Login />} />
                    <Route path={ '*' } element={<h1>404: PAGE NOT FOUND</h1>}/>
                </Routes>
            </Container>
        </div>
    )
})



