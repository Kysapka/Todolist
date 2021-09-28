import React from 'react';
import './App.css';
import {Todolist} from './Todolist';
import {AddItemForm} from "./components/AddItemFormType";
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import {Container, Grid, Paper} from "@material-ui/core";
import {addTodoListAC, TodoListsType} from "./state/TodolistReducer";
import {AppStateType} from './state/Store';
import {useDispatch, useSelector} from 'react-redux';

export const App = () => {

    const dispatch = useDispatch()
    const todolistState = useSelector<AppStateType, TodoListsType>(state => state.todoLists)

    const addTodoList = (title: string) => {
        let action = (addTodoListAC(title))
        dispatch(action)
    }

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
                <Grid container style={{padding: 10, marginBottom: 30, display: "flex", justifyContent: "center"}}>
                    <AddItemForm addItem={addTodoList}/>
                </Grid>
                <Grid container spacing={2}>
                    {todolistState.map((tl) => {
                        return (
                            <Grid item xs={6} key={tl.id}>
                                <Paper elevation={3} style={{padding: 10, display: "flex", justifyContent: "center", minWidth: 120, maxWidth: 250}}>
                                    <Todolist
                                        todolistID={tl.id}
                                        // title={tl.title}
                                        // tasks={tasksForTodolist}
                                        filter={tl.filter}
                                    />
                                </Paper>
                            </Grid>
                        )
                    })}
                </Grid>
            </Container>
        </div>
    )}
