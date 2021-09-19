import React, {ChangeEvent} from 'react';
import {AddItemForm} from "./components/AddItemForm";
import {EditableSpan} from "./EditableSpan";
import {Button, Checkbox, IconButton, Typography} from "@material-ui/core";
import {Delete} from "@material-ui/icons";
import {
    addTaskAC,
    changeTaskStatusAC,
    changeTaskTitleAC,
    removeTaskAC,
    TasksActionsTypes
} from "./reducers/TasksReducer";
import {changeTodoListFilterAC, changeTodoListTitleAC, TodoListActionsTypes, FilterValuesType} from "./reducers/TodolistReducer";

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
    filter: FilterValuesType
    dispatch: (action: TodoListActionsTypes | TasksActionsTypes) => void
}

export const Todolist = React.memo((props: PropsType) => {

    const onAllClickHandler = () => props.dispatch(changeTodoListFilterAC(props.todolistID,"all"))
    const onActiveClickHandler = () => props.dispatch(changeTodoListFilterAC(props.todolistID,"active"))
    const onCompletedClickHandler = () => props.dispatch(changeTodoListFilterAC(props.todolistID,"completed"))


    const onChangeTodoListHandler = (title: string) => {
        props.dispatch(changeTodoListTitleAC(props.todolistID, title))
    }
    const onDeleteTodolistHandler = () => {
        props.deleteTodoList(props.todolistID)
    }
    const onChangeTaskName = (todolistID: string, tID: string, title: string) => {
        props.dispatch(changeTaskTitleAC(todolistID, tID, title))
    }
    const addTaskHandler = (title: string) => {
        props.dispatch(addTaskAC(props.todolistID, title))
    }
    const removeTaskHandler = (todoListID: string, tID: string) => {
        props.dispatch(removeTaskAC(todoListID, tID))
    }


    return <div>
        <Typography variant="h2" component="span">
            <EditableSpan title={props.title} onChange={(title) => onChangeTodoListHandler(title)}/>
            <IconButton color="default" aria-label="delete Todolist" onClick={onDeleteTodolistHandler}>
                <Delete/>
            </IconButton>
        </Typography>
        <AddItemForm addItem={addTaskHandler}/>
        <div>
            {
                props.tasks.map(t => {
                    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
                        props.dispatch(changeTaskStatusAC(props.todolistID, t.id, e.currentTarget.checked))
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
            <Button size="small" variant={props.filter === 'all' ? "outlined" : "text"}  color="default" onClick={onAllClickHandler}>All</Button>
            <Button size="small" variant={props.filter === 'active' ? "outlined" : "text"} color="primary" onClick={onActiveClickHandler}>Active</Button>
            <Button size="small" variant={props.filter === 'completed' ? "outlined" : "text"} color="secondary" onClick={onCompletedClickHandler}>Completed</Button>

        </div>
    </div>
})