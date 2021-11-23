import React, { useCallback } from 'react';

import { Button, IconButton, Typography } from '@material-ui/core';
import { Delete } from '@material-ui/icons';
import { useDispatch, useSelector } from 'react-redux';

import { taskStatuses, TaskType } from '../../../api/todolists-api';
import { AppStateType } from '../../../app/store';
import { AddItemForm } from '../../../components/AddItemForm/AddItemForm';
import { EditableSpan } from '../../../components/EditableSpan/EditableSpan';
import { addTaskTC } from '../TasksReducer';
import {
  changeTodoListFilterAC,
  changeTodoListTitleTC,
  FilterValuesType,
  removeTodoListTC,
  TodoListDomenType,
} from '../TodolistReducer';

import { Task } from './Task/Task';

type PropsType = {
  todolistID: string;
  filter: FilterValuesType;
  demo?: boolean;
};

export const Todolist = React.memo(({ demo = false, ...props }: PropsType) => {
  const dispatch = useDispatch();
  const todoList = useSelector<AppStateType, TodoListDomenType>(
    state => state.todoLists.find(td => td.id === props.todolistID)!,
  );
  const tasksState = useSelector<AppStateType, TaskType[]>(
    state => state.tasks[props.todolistID],
  );

  // useEffect(() => {
  //     if (demo) {
  //         return;
  //     }
  //     dispatch(fetchTasksTC(props.todolistID))
  // }, [dispatch, props.todolistID])

  let tasks = tasksState;
  if (todoList.filter === 'active') {
    tasks = tasksState.filter(t => t.status === taskStatuses.New);
  }
  if (todoList.filter === 'completed') {
    tasks = tasksState.filter(t => t.status === taskStatuses.Completed);
  }

  const onChangeTDlFilter = useCallback(
    (filterValue: FilterValuesType) => {
      dispatch(
        changeTodoListFilterAC({ todolistID: props.todolistID, filter: filterValue }),
      );
    },
    [dispatch, props.todolistID],
  );
  const onChangeTDlTitle = useCallback(
    (title: string) => {
      dispatch(changeTodoListTitleTC(props.todolistID, title));
    },
    [dispatch, props.todolistID],
  );
  const onDeleteTDl = useCallback(() => {
    dispatch(removeTodoListTC(props.todolistID));
  }, [dispatch, props.todolistID]);
  const addTaskHandler = useCallback(
    (title: string) => {
      dispatch(addTaskTC(title, props.todolistID));
    },
    [dispatch, props.todolistID],
  );

  return (
    <div>
      <Typography variant="h2" component="span">
        <EditableSpan
          title={todoList.title}
          onChange={onChangeTDlTitle}
          disabled={todoList.tlEntityStatus === 'loading'}
        />
        <IconButton
          color="default"
          aria-label="delete Todolist"
          onClick={onDeleteTDl}
          disabled={todoList.tlEntityStatus === 'loading'}
        >
          <Delete />
        </IconButton>
      </Typography>
      <AddItemForm
        addItem={addTaskHandler}
        disabled={todoList.tlEntityStatus === 'loading'}
      />
      <div>
        {tasks.map(t => (
          <Task key={t.id} tId={t.id} todolistID={props.todolistID} />
        ))}
      </div>
      <div>
        <Button
          size="small"
          variant={props.filter === 'all' ? 'outlined' : 'text'}
          color="default"
          onClick={() => onChangeTDlFilter('all')}
        >
          All
        </Button>
        <Button
          size="small"
          variant={props.filter === 'active' ? 'outlined' : 'text'}
          color="primary"
          onClick={() => onChangeTDlFilter('active')}
        >
          Active
        </Button>
        <Button
          size="small"
          variant={props.filter === 'completed' ? 'outlined' : 'text'}
          color="secondary"
          onClick={() => onChangeTDlFilter('completed')}
        >
          Completed
        </Button>
      </div>
    </div>
  );
});
