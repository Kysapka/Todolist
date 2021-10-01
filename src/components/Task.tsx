import React, {ChangeEvent} from 'react';
import {changeTaskStatusAC, changeTaskTitleAC, TaskType} from "../state/TasksReducer";
import {Checkbox, IconButton} from "@material-ui/core";
import {EditableSpan} from "./EditableSpan";
import {Delete} from "@material-ui/icons";
import {useDispatch, useSelector} from "react-redux";
import {AppStateType} from "../state/Store";

type TaskPropsType = {
    tId: string
    todolistID: string
    isDone: boolean
    title: string
    onChangeStatusHandler: (e: ChangeEvent<HTMLInputElement>) => void
    changeTaskName: (todolistID: string, tID: string, title: string) => void
    removeTask: (todolistID: string, tId: string) => void
}

export const Task = (props: TaskPropsType) => {

    const dispatch = useDispatch()
    const tasksState = useSelector<AppStateType, TaskType[]>(state => state.tasks[props.todolistID])

    return (
        <div className={props.isDone ? "is-done" : ""}>
            <Checkbox
                onChange={props.onChangeStatusHandler}
                checked={props.isDone}
                color="primary"
            />
            <EditableSpan title={props.title}
                          onChange={(title) => props.changeTaskName(props.todolistID, props.tId, props.title)}/>
            <IconButton onClick={() => {props.removeTask(props.todolistID, props.tId)}} aria-label="delete task" color="default">
                <Delete/>
            </IconButton>
        </div>
    );
};

export default Task;