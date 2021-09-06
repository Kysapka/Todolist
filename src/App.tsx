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
import {AppState} from "./redux/Store";

export type FilterValuesType = "all" | "active" | "completed";

function App() {

    const rootState = AppState.getState()
    console.log(rootState)

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

    // const todolistID_1 = v1()
    // const todolistID_2 = v1()
    //
    // type todoListsType = Array<{ id: string, title: string, filter: FilterValuesType }>


    // let initTodoListState: todoListsType = JSON.parse(localStorage.getItem('TDL')!)
    // let initTasksState: tasksType = JSON.parse(localStorage.getItem('TSK')!)

    // const [todoLists, setTodoLists] = useState<todoListsType>(
    //     initTodoListState ? initTodoListState : []
    //     //     [
    //     //     {id: todolistID_1, title: "What to learn", filter: "all"},
    //     //     {id: todolistID_2, title: "What to bye", filter: "all"}
    //     // ]
    // )

    // type tasksType = {
    //     [todolistID: string]: Array<{ id: string, title: string, isDone: boolean }>
    // }


    // const [tasks, setTasks] = useState<tasksType>(
    //     initTasksState ? initTasksState : {}
    //         {
    //         [todolistID_1]: [
    //             {id: v1(), title: "HTML&CSS", isDone: true},
    //             {id: v1(), title: "JS", isDone: true},
    //             {id: v1(), title: "ReactJS", isDone: false},
    //             {id: v1(), title: "Rest API", isDone: false},
    //             {id: v1(), title: "GraphQL", isDone: false},
    //         ],
    //         [todolistID_2]: [
    //             {id: v1(), title: "Fish", isDone: true},
    //             {id: v1(), title: "Meet", isDone: false},
    //             {id: v1(), title: "Books", isDone: false},
    //             {id: v1(), title: "Milk", isDone: true},
    //             {id: v1(), title: "Water", isDone: false},
    //         ],
    //     }
    // )

    function changeFilter(todolistID: string, value: FilterValuesType) {
        // setTodoLists(todoLists.map(tl => tl.id === todolistID ? {...tl, filter: value} : tl))
    }

    function addTask(todolistID: string, title: string) {
        // let newTask = {...tasks, [todolistID]: [...tasks[todolistID], {id: v1(), title, isDone: false}]}
        // setTasks(newTask)
        // localStorage.removeItem('TSK')
        // localStorage.setItem('TSK', JSON.stringify(newTask))
    }
    // function removeTask(todolistID: string, id: string) {
    //     let updatedTasks = {...tasks, [todolistID]: tasks[todolistID].filter(ts => ts.id !== id)}
    //     setTasks({...updatedTasks})
    //     localStorage.removeItem('TSK')
    //     localStorage.setItem('TSK', JSON.stringify(updatedTasks))
    // }

    function changeStatus(todolistID: string, taskId: string, isDone: boolean) {
        // setTasks({...tasks, [todolistID]: tasks[todolistID].map(ts => ts.id === taskId ? {...ts, isDone} : ts)})
        // //Дописать синх. с localstorage
    }

    const addTodoList = (title: string) => {
        // const todolistID = v1()
        // let newTodoList: todoListsType = [{id: todolistID, title, filter: "all"}, ...todoLists]
        // setTodoLists(newTodoList)
        // setTasks({...tasks, [todolistID]: []})
        // localStorage.removeItem('TDL')
        // localStorage.setItem('TDL', JSON.stringify(newTodoList))
    }
    const deleteTodoList = (todolistID: string) => {
        // let updatedTodoList = [...todoLists.filter(tl => tl.id !== todolistID)]
        // setTodoLists(updatedTodoList)
        // delete tasks[todolistID]
        // setTasks({...tasks})
        // localStorage.removeItem(`TDL`)
        // localStorage.setItem('TDL', JSON.stringify(updatedTodoList))
        // localStorage.removeItem('TSK')
        // localStorage.setItem('TSK', JSON.stringify({...tasks}))
    }
    const changeTodoListTitle = (todolistID: string, title: string) => {
        // setTodoLists(todoLists.map(tl => tl.id === todolistID ? {...tl, title} : tl))
    }
    const changeTaskTitle = (todolistID: string, taskID: string, title: string) => {
        // setTasks({...tasks, [todolistID]: tasks[todolistID].map(ts => ts.id === taskID ? {...ts, title} : ts)})
    }




    return (
        <div>
            <Container fixed>
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
                                            addTask={addTask}
                                            // removeTask={removeTask}
                                            filter={tl.filter}
                                            changeFilter={changeFilter}
                                            changeTaskStatus={changeStatus}
                                            changeTodoListTitle={changeTodoListTitle}
                                            changeTaskTitle={changeTaskTitle}
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
