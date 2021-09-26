import React, {ChangeEvent} from 'react';
import {AddItemForm} from "./components/AddItemFormType";
import {EditableSpan} from "./EditableSpan";
import {Button, Checkbox, IconButton, Typography} from "@material-ui/core";
import {Delete} from "@material-ui/icons";
import {
    addTaskAC,
    changeTaskStatusAC,
    changeTaskTitleAC,
    removeTaskAC,
} from "./state/TasksReducer";
import {changeTodoListFilterAC,changeTodoListTitleAC,FilterValuesType,removeTodoListAC,TodolistType} from "./state/TodolistReducer";
import {useDispatch, useSelector} from "react-redux";
import {AppStateType} from "./state/Store";

type TaskType = {
    id: string
    title: string
    isDone: boolean
}
type PropsType = {
    todolistID: string
    // title: string
    // tasks: Array<TaskType>
    filter: FilterValuesType
}

export const Todolist = React.memo((props: PropsType) => {

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


    const onChangeTDlFilter = (filterValue: FilterValuesType) => {
      dispatch(changeTodoListFilterAC(props.todolistID,filterValue))
    }

    const onChangeTDlTitle = (title: string) => {
        dispatch(changeTodoListTitleAC(props.todolistID, title))
    }
    const onDeleteTDl = () => {
        dispatch(removeTodoListAC(props.todolistID))
    }

    const onChangeTaskName = (todolistID: string, tID: string, title: string) => {
        dispatch(changeTaskTitleAC(todolistID, tID, title))
    }
    const addTaskHandler = (title: string) => {
        dispatch(addTaskAC(props.todolistID, title))
    }
    const removeTaskHandler = (todoListID: string, tID: string) => {
        dispatch(removeTaskAC(todoListID, tID))
    }

    return <div>
        <Typography variant="h2" component="span">
            <EditableSpan title={todoList.title} onChange={(title) => onChangeTDlTitle(title)}/>
            <IconButton color="default" aria-label="delete Todolist" onClick={onDeleteTDl}>
                <Delete/>
            </IconButton>
        </Typography>
        <AddItemForm addItem={addTaskHandler}/>
        <div>
            {
                tasks.map(t => {
                    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
                        dispatch(changeTaskStatusAC(props.todolistID, t.id, e.currentTarget.checked))
                    }
                    return (
                        <div key={t.id} className={t.isDone ? "is-done" : ""}>
                            <Checkbox
                                onChange={onChangeHandler}
                                checked={t.isDone}
                                color="primary"
                            />
                            <EditableSpan title={t.title}
                                          onChange={(title) => onChangeTaskName(props.todolistID, t.id, title)}/>
                            <IconButton onClick={() => {removeTaskHandler(props.todolistID, t.id)}} aria-label="delete task" color="default">
                                <Delete/>
                            </IconButton>
                        </div>
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