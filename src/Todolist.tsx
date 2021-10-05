import React, {ChangeEvent, useCallback} from 'react';
import {AddItemForm} from "./components/AddItemForm";
import {EditableSpan} from "./components/EditableSpan";
import {Button, Checkbox, IconButton, Typography} from "@material-ui/core";
import {Delete} from "@material-ui/icons";
import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC,} from "./state/TasksReducer";
import {changeTodoListFilterAC,changeTodoListTitleAC,FilterValuesType,removeTodoListAC,TodolistType} from "./state/TodolistReducer";
import {useDispatch, useSelector} from "react-redux";
import {AppStateType} from "./state/Store";
import Task from "./components/Task";

type TaskType = {
    id: string
    title: string
    isDone: boolean
}
type PropsType = {
    todolistID: string
    filter: FilterValuesType
}

export const Todolist = React.memo((props: PropsType) => {

    console.log("Todolist called")

    const dispatch = useDispatch()
    const todoList = useSelector<AppStateType, TodolistType>(state => state.todoLists.find(td => td.id === props.todolistID)!)
    const tasksState = useSelector<AppStateType, TaskType[]>(state => state.tasks[props.todolistID])


    let tasks = tasksState
    if (todoList.filter === "active") {
        tasks = tasksState.filter(t => !t.isDone)
    }
    if (todoList.filter === "completed") {
        tasks = tasksState.filter(t => t.isDone)
    }


    const onChangeTDlFilter = useCallback((filterValue: FilterValuesType) => {
      dispatch(changeTodoListFilterAC(props.todolistID,filterValue))
    },[dispatch, props.todolistID])

    const onChangeTDlTitle = useCallback((title: string) => {
        dispatch(changeTodoListTitleAC(props.todolistID, title))
    }, [dispatch, props.todolistID])

    const onDeleteTDl = useCallback(() => {
        dispatch(removeTodoListAC(props.todolistID))
    },[dispatch, props.todolistID])

    // const onChangeTaskName = useCallback((todolistID: string, tID: string, title: string) => {
    //     dispatch(changeTaskTitleAC(todolistID, tID, title))
    // },[dispatch])

    const addTaskHandler = useCallback((title: string) => {
        dispatch(addTaskAC(props.todolistID, title))
    }, [dispatch, props.todolistID])

    // const removeTaskHandler = useCallback((todoListID: string, tID: string) => {
    //     dispatch(removeTaskAC(todoListID, tID))
    // },[dispatch])

    return <div>
        <Typography variant="h2" component="span">
            <EditableSpan title={todoList.title} onChange={onChangeTDlTitle}/>
            <IconButton color="default" aria-label="delete Todolist" onClick={onDeleteTDl}>
                <Delete/>
            </IconButton>
        </Typography>
        <AddItemForm addItem={addTaskHandler}/>

        <div>
            {
                tasks.map(t => {
                    return (

                        <Task key={t.id}
                              tId={t.id}
                              todolistID={props.todolistID}
                        />
                    )
                })
            }
        </div>


        <div>
            <Button size="small" variant={props.filter === 'all' ? "outlined" : "text"}  color="default" onClick={()=>onChangeTDlFilter('all')}>All</Button>
            <Button size="small" variant={props.filter === 'active' ? "outlined" : "text"} color="primary" onClick={()=>onChangeTDlFilter('active')}>Active</Button>
            <Button size="small" variant={props.filter === 'completed' ? "outlined" : "text"} color="secondary" onClick={()=>onChangeTDlFilter('completed')}>Completed</Button>

        </div>
    </div>
})