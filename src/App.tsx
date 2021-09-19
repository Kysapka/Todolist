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
import {addTodoListAC, removeTodoListAC, todoListsType} from "./reducers/TodolistReducer";
import {addEmptyTaskListAC, tasksType} from "./reducers/TasksReducer";
import {AppStateType} from './redux/Store';
import {useDispatch, useSelector} from 'react-redux';


const App = () => {
    const todolistState = useSelector<AppStateType, todoListsType>(state => state.todoLists)
    const tasksState = useSelector<AppStateType, tasksType>(state => state.tasks)

    const dispatch = useDispatch()

    const addTodoList = (title: string) => {
        let newID = v1()
        dispatch(addTodoListAC(title, newID))
        dispatch(addEmptyTaskListAC(newID))
    }
    const deleteTodoList = (todolistID: string) => {
        dispatch(removeTodoListAC(todolistID))
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
                        let tasksForTodolist = tasksState[tl.id]
                        if (tl.filter === "active") {
                            tasksForTodolist = tasksState[tl.id].filter(t => !t.isDone)
                        }
                        if (tl.filter === "completed") {
                            tasksForTodolist = tasksState[tl.id].filter(t => t.isDone)
                        }
                        return (
                            <Grid item xs={6} key={tl.id}>
                                <Paper elevation={3} style={{padding: 10, display: "flex", justifyContent: "center", minWidth: 120, maxWidth: 250}}>
                                    <Todolist
                                        todolistID={tl.id}
                                        title={tl.title}
                                        tasks={tasksForTodolist}
                                        filter={tl.filter}
                                        deleteTodoList={deleteTodoList}
                                        dispatch={dispatch}
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
