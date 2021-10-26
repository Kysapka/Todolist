import React, {ChangeEvent, useCallback} from 'react';
import {removeTaskTC, updateTaskTC} from "../state/TasksReducer";
import {Checkbox, IconButton} from "@material-ui/core";
import {EditableSpan} from "./EditableSpan";
import {Delete} from "@material-ui/icons";
import {useDispatch, useSelector} from "react-redux";
import {AppStateType} from "../state/Store";
import {taskStatuses, TaskType} from "../api/todolists-api";

type TaskPropsType = {
    tId: string
    todolistID: string
}


export const Task = React.memo((props: TaskPropsType) => {

    const dispatch = useDispatch()
    const task = useSelector<AppStateType, TaskType>(state => state.tasks[props.todolistID].filter(task => task.id === props.tId)[0])

    const changeTaskStatus = useCallback((e: ChangeEvent<HTMLInputElement>) => {
        dispatch(updateTaskTC(props.todolistID, task.id, {
            status: e.currentTarget.checked ? taskStatuses.Completed : taskStatuses.New
        }))
    }, [dispatch, props.todolistID, task.id])
    const changeTaskTitle = useCallback((title: string) => {
        dispatch(updateTaskTC(props.todolistID, task.id, {title}))
    }, [dispatch, props.todolistID, task.id])
    const removeTask = useCallback(() => {
        dispatch(removeTaskTC(props.todolistID, task.id))
    }, [dispatch, props.todolistID, task.id])

    return (
        <div className={task.status === taskStatuses.New ? "is-done" : ""}>
            <Checkbox
                onChange={changeTaskStatus}
                checked={task.status === taskStatuses.Completed}
                color="primary"
            />
            <EditableSpan title={task.title}
                          onChange={changeTaskTitle}/>
            <IconButton onClick={removeTask} aria-label="delete task" color="default">
                <Delete/>
            </IconButton>
        </div>
    );
});

export default Task;