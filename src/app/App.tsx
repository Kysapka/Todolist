import React, { useCallback, useEffect } from 'react';
import './App.css';
import { AppBar, Button, CircularProgress, Container, LinearProgress, Toolbar } from '@material-ui/core';
import { TodolistsList } from '../features/TodolistsList';
import { ErrorSnackbar } from '../components/ErrorSnackbar/ErrorSnackbar';
import { useSelector } from 'react-redux';
import { appActions } from '../features/Application';
import { Route } from 'react-router-dom';
import { authActions, authSelectors, Login } from '../features/Auth';
import { selectIsInitialized, selectStatus } from '../features/Application/selectors';
import { useActions } from '../utils/redux-utils';

type PropsType = {
    demo?: boolean
}

function App({demo = false}: PropsType) {
    const status = useSelector(selectStatus)
    const isInitialized = useSelector(selectIsInitialized)
    const isLoggedIn = useSelector(authSelectors.selectIsLoggedIn)

    const {logout} = useActions(authActions)
    const {initializeApp} = useActions(appActions)

    useEffect(() => {
        if (!demo) {
            initializeApp()
        }
    }, [demo, initializeApp])

    const logoutHandler = useCallback(() => {
        logout()
    }, [logout])

    if (!isInitialized) {
        return <div
            style={{position: 'fixed', top: '30%', textAlign: 'center', width: '100%'}}>
            <CircularProgress/>
        </div>
    }

    return (
            <div className="App">
                <ErrorSnackbar/>
                <AppBar position="static">
                    <Toolbar style={{justifyContent: 'flex-end'}}>
                        {isLoggedIn && <Button color="inherit" onClick={logoutHandler}>Log out</Button>}
                    </Toolbar>
                    {status === 'loading' && <LinearProgress/>}
                </AppBar>
                <Container fixed>
                    <Route exact path={'/'} render={() => <TodolistsList demo={demo}/>}/>
                    <Route path={'/login'} render={() => <Login/>}/>
                </Container>
            </div>
    )
}

export default App
