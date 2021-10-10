import React, {ChangeEvent, useCallback} from 'react';
import {changeTaskStatusAC, changeTaskTitleAC, removeTaskAC, TaskType} from "../state/TasksReducer";
import {Checkbox, IconButton} from "@material-ui/core";
import {EditableSpan} from "./EditableSpan";
import {Delete} from "@material-ui/icons";
import {useDispatch, useSelector} from "react-redux";
import {AppStateType} from "../state/Store";

type TaskPropsType = {
    tId: string
    todolistID: string
}

export const Task = React.memo((props: TaskPropsType) => {

    const dispatch = useDispatch()

    console.log('TASK COMPONENT RENDERED')

    const task = useSelector<AppStateType, TaskType>(state => state.tasks[props.todolistID].filter(task => task.id === props.tId)[0])

    // const {tasks } = useSelector<AppStateType, AppStateType>(state => state)
    // const task = tasks[props.todolistID].filter(task => task.id === props.tId)[0]

    const changeTaskStatus = useCallback((e: ChangeEvent<HTMLInputElement>) => {
        dispatch(changeTaskStatusAC(props.todolistID, task.id, e.currentTarget.checked))
    }, [dispatch, props.todolistID])

    const changeTaskTitle = useCallback((title: string) => {
        dispatch(changeTaskTitleAC(props.todolistID, task.id, title))
    },[dispatch, props.todolistID])

const removeTask  = useCallback( () => {
    dispatch(removeTaskAC(props.todolistID, task.id))
}, [dispatch, props.todolistID])

    return (
        <div className={task.isDone ? "is-done" : ""}>
            <Checkbox
                onChange={changeTaskStatus}
                checked={task.isDone}
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