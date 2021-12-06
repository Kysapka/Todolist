import React, { ChangeEvent, useCallback } from 'react';

import { Checkbox, IconButton } from '@material-ui/core';
import { Delete } from '@material-ui/icons';
import { taskStatuses } from 'api/todolists-api';
import { AppStateType, useAppDispatch } from 'app/store';
import { EditableSpan } from 'components/EditableSpan/EditableSpan';
import { useSelector } from 'react-redux';

import { removeTaskTC, TaskDomainType, updateTaskTC } from '../../TasksReducer';
import { TodoListDomenType } from '../../TodolistsReducer';

type TaskPropsType = {
  tId: string;
  todolistID: string;
};

export const Task = React.memo((props: TaskPropsType) => {
  const dispatch = useAppDispatch();
  const todoList = useSelector<AppStateType, TodoListDomenType>(
    state => state.todoLists.find(td => td.id === props.todolistID)!,
  );
  const task = useSelector<AppStateType, TaskDomainType>(
    state => state.tasks[props.todolistID].filter(tsk => tsk.id === props.tId)[0],
  );

  const changeTaskStatus = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      dispatch(
        updateTaskTC(props.todolistID, task.id, {
          status: e.currentTarget.checked ? taskStatuses.Completed : taskStatuses.New,
        }),
      );
    },
    [dispatch, props.todolistID, task.id],
  );

  const changeTaskTitle = useCallback(
    (title: string) => {
      dispatch(updateTaskTC(props.todolistID, task.id, { title }));
    },
    [dispatch, props.todolistID, task.id],
  );

  const removeTask = useCallback(() => {
    dispatch(removeTaskTC({ taskId: task.id, todoListId: props.todolistID }));
  }, [dispatch, props.todolistID, task.id]);

  return (
    <div className={task.status === taskStatuses.New ? 'is-done' : ''}>
      <Checkbox
        disabled={
          task.tsEntityStatus === 'loading' || todoList.tlEntityStatus === 'loading'
        }
        onChange={changeTaskStatus}
        checked={task.status === taskStatuses.Completed}
        color="primary"
      />
      <EditableSpan
        title={task.title}
        onChange={changeTaskTitle}
        disabled={
          task.tsEntityStatus === 'loading' || todoList.tlEntityStatus === 'loading'
        }
      />

      <IconButton
        onClick={removeTask}
        aria-label="delete task"
        color="default"
        disabled={
          task.tsEntityStatus === 'loading' || todoList.tlEntityStatus === 'loading'
        }
      >
        <Delete />
      </IconButton>
    </div>
  );
});
