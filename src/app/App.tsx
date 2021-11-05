import React from 'react';
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
import {useSelector} from "react-redux";
import {RequestStatusType} from "./AppReducer";
import {AppStateType} from "./store";
import {Login} from "../features/Login/Login";
import {Route, Routes} from "react-router-dom";

type PropsType = {
    demo?: boolean
}

export const App = React.memo(({demo = false}: PropsType) => {

    const status = useSelector<AppStateType, RequestStatusType>(state => state.app.status)

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
                        <Button color="inherit">Login</Button>
                    </Toolbar>
                    <div className={'linearProgress'}>
                        {status === 'loading' && <LinearProgress/>}
                    </div>
                </AppBar>
                <Routes>
                    <Route path={'/'} element={<TodolistsList demo={demo}/>} />
                    <Route path={'/login'} element={<Login />} />
                    <Route path={ '*' } element={<h1>404: PAGE NOT FOUND</h1>}/>
                    {/*<TodolistsList demo={demo}/>*/}
                </Routes>

            </Container>
        </div>
    )
})



