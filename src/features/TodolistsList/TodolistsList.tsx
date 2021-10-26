import {useDispatch, useSelector} from "react-redux";
import {AppStateType} from "../../state/Store";
import {addTodoListTC, fetchTodolistsTC, TodoListsType} from "../../state/TodolistReducer";
import React, {useCallback, useEffect} from "react";
import {Grid, Paper} from "@material-ui/core";
import {AddItemForm} from "../../components/AddItemForm/AddItemForm";
import {Todolist} from "./Todolist/Todolist";

export const TodolistsList = () => {

    const dispatch = useDispatch()
    const todolistState = useSelector<AppStateType, TodoListsType>(state => state.todoLists)

    useEffect(() => {
        dispatch(fetchTodolistsTC())
    }, [dispatch])

    const addTodoList = useCallback((title: string) => {
        dispatch(addTodoListTC(title))
    }, [dispatch])

    return <>
        <Grid container style={{padding: 10, marginBottom: 30, display: "flex", justifyContent: "center"}}>
            <AddItemForm addItem={addTodoList}/>
        </Grid>
        <Grid container spacing={2}>
            {todolistState.map((tl) => {
                return (
                    <Grid item xs={6} key={tl.id}>
                        <Paper elevation={3} style={{padding: 10, display: "flex", justifyContent: "center", minWidth: 150, maxWidth: 300}}>
                            <Todolist
                                todolistID={tl.id}
                                filter={tl.filter}
                            />
                        </Paper>
                    </Grid>)
            })}
        </Grid>
    </>
}