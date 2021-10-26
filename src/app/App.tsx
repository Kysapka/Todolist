import React from 'react';
import './App.css';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import {Container} from "@material-ui/core";
import {TodolistsList} from "../features/TodolistsList/TodolistsList";

export const App = React.memo(() => {
    return (
        <div>
            <Container fixed>
                <AppBar position="static" style={{marginBottom: 30}}>
                    <Toolbar style={{display: 'flex', justifyContent: 'space-between'}}>
                        <div style={{display: 'flex', alignItems: 'center'}}>
                            <IconButton edge="start" color="inherit" aria-label="menu">
                                <MenuIcon/>
                            </IconButton>
                            <Typography variant="h6" >
                                My Todolist Project
                            </Typography>
                        </div>
                        <Button color="inherit">Login</Button>
                    </Toolbar>
                </AppBar>
                <TodolistsList />
            </Container>
        </div>
    )})



