import React, {useState} from 'react';
import './App.css';
import {Todolist} from './Todolist';
import {v1} from 'uuid';
import {AddItemForm} from "./components/AddItemForm";


import {createStyles, makeStyles, Theme} from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import {Box, Container, Grid, Paper} from "@material-ui/core";

export type FilterValuesType = "all" | "active" | "completed";

function App() {

    const useStyles = makeStyles((theme: Theme) =>
        createStyles({
            root: {
                flexGrow: 1,
            },
            menuButton: {
                marginRight: theme.spacing(2),
            },
            title: {
                flexGrow: 1,
            },
        }),
    );
    const classes = useStyles();

    const todolistID_1 = v1()
    const todolistID_2 = v1()

    type todoListsType = Array<{ id: string, title: string, filter: FilterValuesType }>

    const [todoLists, setTodoLists] = useState<todoListsType>([
        {id: todolistID_1, title: "What to learn", filter: "all"},
        {id: todolistID_2, title: "What to bye", filter: "all"}
    ])

    type tasksType = {
        [todolistID: string]: Array<{ id: string, title: string, isDone: boolean }>
    }

    const [tasks, setTasks] = useState<tasksType>({
        [todolistID_1]: [
            {id: v1(), title: "HTML&CSS", isDone: true},
            {id: v1(), title: "JS", isDone: true},
            {id: v1(), title: "ReactJS", isDone: false},
            {id: v1(), title: "Rest API", isDone: false},
            {id: v1(), title: "GraphQL", isDone: false},
        ],
        [todolistID_2]: [
            {id: v1(), title: "Fish", isDone: true},
            {id: v1(), title: "Meet", isDone: false},
            {id: v1(), title: "Books", isDone: false},
            {id: v1(), title: "Milk", isDone: true},
            {id: v1(), title: "Water", isDone: false},
        ],
    })

    function changeFilter(todolistID: string, value: FilterValuesType) {
        setTodoLists(todoLists.map(tl => tl.id === todolistID ? {...tl, filter: value} : tl))
    }

    function addTask(todolistID: string, title: string) {
        setTasks({...tasks, [todolistID]: [{id: v1(), title, isDone: false}, ...tasks[todolistID]]})
    }

    function removeTask(todolistID: string, id: string) {
        setTasks({...tasks, [todolistID]: tasks[todolistID].filter(ts => ts.id !== id)})

    }

    function changeStatus(todolistID: string, taskId: string, isDone: boolean) {
        setTasks({...tasks, [todolistID]: tasks[todolistID].map(ts => ts.id === taskId ? {...ts, isDone} : ts)})
    }

    const addTodoList = (title: string) => {
        const todolistID = v1()
        setTodoLists([{id: todolistID, title, filter: "all"}, ...todoLists])
        setTasks({...tasks, [todolistID]: []})
    }
    const deleteTodoList = (todolistID: string) => {
        setTodoLists([...todoLists.filter(tl => tl.id !== todolistID)])
        delete tasks[todolistID]
        setTasks({...tasks})
    }
    const changeTodoListTitle = (todolistID: string, title: string) => {
        setTodoLists(todoLists.map(tl => tl.id === todolistID ? {...tl, title} : tl))
    }
    const changeTaskTitle = (todolistID: string, taskID: string, title: string) => {
        setTasks({...tasks, [todolistID]: tasks[todolistID].map(ts => ts.id === taskID ? {...ts, title} : ts)})
    }

    return (
        <div>
            <AppBar position="static" style={{marginBottom: 20}}>
                <Toolbar>
                    <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
                        <MenuIcon/>
                    </IconButton>
                    <Typography variant="h6" className={classes.title}>
                        My Todolist Project
                    </Typography>
                    <Button color="inherit">Login</Button>
                </Toolbar>
            </AppBar>

            <Box component="div" mt={5}>
                <Container fixed>
                    <div style={{marginBottom: 20}}>
                        <AddItemForm addItem={addTodoList}/>
                    </div>
                    <Grid container spacing={3}>
                        {todoLists.map((tl) => {

                            let tasksForTodolist = tasks[tl.id]

                            if (tl.filter === "active") {
                                tasksForTodolist = tasks[tl.id].filter(t => !t.isDone)
                            }
                            if (tl.filter === "completed") {
                                tasksForTodolist = tasks[tl.id].filter(t => t.isDone)
                            }

                            return (
                                <Grid item xs={3}>
                                    <Paper style={{padding: 5, display: "flex", justifyContent: "center"}}>
                                        <Todolist
                                            todolistID={tl.id}
                                            title={tl.title}
                                            tasks={tasksForTodolist}
                                            addTask={addTask}
                                            removeTask={removeTask}
                                            filter={tl.filter}
                                            changeFilter={changeFilter}
                                            changeTaskStatus={changeStatus}
                                            changeTodoListTitle={changeTodoListTitle}
                                            changeTaskTitle={changeTaskTitle}
                                            deleteTodoList={deleteTodoList}/>
                                    </Paper>
                                </Grid>

                            )
                        })}
                    </Grid>
                </Container>
            </Box>


        </div>
    );
}

export default App;
