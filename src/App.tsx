import React from 'react';
import './App.css';
import {Todolist} from './Todolist';
import {v1} from 'uuid';
import {AddItemForm} from "./components/AddItemForm";

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import {Container, Grid, Paper} from "@material-ui/core";
import {AppState} from "./redux/Store";
import {addTodoListAC, removeTodoListAC} from "./reducers/TodolistReducer";
import {addEmptyTaskListAC, removeEmptyTaskListAC} from "./reducers/TasksReducer";

const App = () => {

    const rootState = AppState.getState()
    const dispatch = AppState.dispatch

    const addTodoList = (title: string) => {
        let newID = v1()
        dispatch(addTodoListAC(title, newID))
        dispatch(addEmptyTaskListAC(newID))
    }
    const deleteTodoList = (todolistID: string) => {
        dispatch(removeTodoListAC(todolistID))
        dispatch(removeEmptyTaskListAC(todolistID))
    }

    return (
        <div>
            <Container fixed>
                <AppBar position="static" style={{marginBottom: 20}}>
                    <Toolbar>
                        <IconButton edge="start" color="inherit" aria-label="menu">
                            <MenuIcon/>
                        </IconButton>
                        <Typography variant="h6" >
                            My Todolist Project
                        </Typography>
                        <Button color="inherit" style={{flex: 1}}>Login</Button>
                    </Toolbar>
                </AppBar>

                <Grid container style={{padding: 20}}>
                    <AddItemForm addItem={addTodoList}/>
                </Grid>
                <Grid container spacing={3}>
                        {rootState.todoLists.map((tl) => {

                            let tasksForTodolist = rootState.tasks[tl.id]

                            if (tl.filter === "active") {
                                tasksForTodolist = rootState.tasks[tl.id].filter(t => !t.isDone)
                            }
                            if (tl.filter === "completed") {
                                tasksForTodolist = rootState.tasks[tl.id].filter(t => t.isDone)
                            }

                            return (
                                <Grid item xs={3}>
                                    <Paper style={{padding: 10, display: "flex", justifyContent: "center"}}>
                                        <Todolist
                                            todolistID={tl.id}
                                            title={tl.title}
                                            tasks={tasksForTodolist}
                                            filter={tl.filter}
                                            deleteTodoList={deleteTodoList}
                                            dispatch={AppState.dispatch.bind(AppState)}
                                        />
                                    </Paper>
                                </Grid>

                            )
                        })}
                </Grid>

            </Container>
        </div>
    )
        ;
}

export default App;
