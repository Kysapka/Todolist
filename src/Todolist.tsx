import React, {ChangeEvent} from 'react';
import {FilterValuesType} from './App';
import {AddItemForm} from "./components/AddItemForm";
import {EditableSpan} from "./EditableSpan";
import {Button, Checkbox, IconButton, Typography} from "@material-ui/core";
import {Delete} from "@material-ui/icons";

type TaskType = {
    id: string
    title: string
    isDone: boolean
}

type PropsType = {
    todolistID: string
    title: string
    deleteTodoList: (todolistID: string) => void
    tasks: Array<TaskType>
    removeTask: (todolistID: string, taskId: string) => void
    changeFilter: (todolistID: string, value: FilterValuesType) => void
    addTask: (todolistID: string, title: string) => void
    changeTaskStatus: (todolistID: string, taskId: string, isDone: boolean) => void
    changeTodoListTitle: (todolistID: string, title: string) => void
    changeTaskTitle: (todolistID: string, taskId: string, title: string) => void
    filter: FilterValuesType
}

export function Todolist(props: PropsType) {

    const onAllClickHandler = () => props.changeFilter(props.todolistID, "all");
    const onActiveClickHandler = () => props.changeFilter(props.todolistID, "active");
    const onCompletedClickHandler = () => props.changeFilter(props.todolistID, "completed");

    const onDeleteTodolistHandler = () => {
        props.deleteTodoList(props.todolistID)
    }

    const addTaskHandler = (title: string) => {
        props.addTask(props.todolistID, title)
    }

    return <div>
        <Typography variant="h2" component="span">
            <EditableSpan title={props.title} onChange={(title) => {
                props.changeTodoListTitle(props.todolistID, title)
            }}/>
            <IconButton color="secondary" aria-label="delete Todolist" onClick={onDeleteTodolistHandler}>
                <Delete/>
            </IconButton>
        </Typography>
        <AddItemForm addItem={addTaskHandler}/>

        <ul>
            {
                props.tasks.map(t => {
                    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
                        props.changeTaskStatus(props.todolistID, t.id, e.currentTarget.checked);
                    }
                    return (
                        <li key={t.id} className={t.isDone ? "is-done" : ""}>
                            <Checkbox
                                onChange={onChangeHandler}
                                defaultChecked={t.isDone}
                                color="primary"
                                inputProps={{'aria-label': 'secondary checkbox'}}
                            />
                            <EditableSpan title={t.title}
                                          onChange={(title) => props.changeTaskTitle(props.todolistID, t.id, title)}/>
                            <IconButton aria-label="delete task" color="primary">
                                <Delete/>
                            </IconButton>
                        </li>
                    )
                })
            }
        </ul>
        <div>
            <Button size="small" variant={props.filter === 'all' ? "contained" : "outlined"}  color={props.filter === 'all' ? "secondary" : "primary"} onClick={onAllClickHandler}>All</Button>
            <Button size="small" variant={props.filter === 'active' ? "contained" : "outlined"} color={props.filter === 'active' ? "secondary" : "primary"} onClick={onActiveClickHandler}>Active</Button>
            <Button size="small" variant={props.filter === 'completed' ? "contained" : "outlined"} color={props.filter === 'completed' ? "secondary" : "primary"} onClick={onCompletedClickHandler}>Completed</Button>

        </div>
    </div>
}