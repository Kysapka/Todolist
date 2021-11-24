import React, { ReactElement, useCallback, useEffect } from 'react';

import { Grid, Paper } from '@material-ui/core';
import { AppStateType } from 'app/store';
import { AddItemForm } from 'components/AddItemForm/AddItemForm';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

import { addTodoListTC, fetchTodolistsTC } from './thunks/TodolistsThunks';
import { Todolist } from './Todolist/Todolist';
import { TodoListsType } from './TodolistsReducer';

type PropsType = {
  demo?: boolean;
};

export const TodolistsList = ({ demo = false }: PropsType): ReactElement => {
  const dispatch = useDispatch();
  const todolistState = useSelector<AppStateType, TodoListsType>(
    state => state.todoLists,
  );
  const isLoggedIn = useSelector<AppStateType, boolean>(state => state.auth.isLoggedIn);

  useEffect(() => {
    if (demo || !isLoggedIn) {
      return;
    }
    dispatch(fetchTodolistsTC());
  }, [dispatch, demo, isLoggedIn]);

  const addTodoList = useCallback(
    (title: string) => {
      dispatch(addTodoListTC(title));
    },
    [dispatch],
  );

  if (!isLoggedIn) {
    return <Navigate to="/login" />;
  }

  return (
    <>
      <Grid
        container
        style={{
          padding: 10,
          marginBottom: 30,
          display: 'flex',
          justifyContent: 'center',
        }}
      >
        <AddItemForm addItem={addTodoList} />
      </Grid>
      <Grid container spacing={2}>
        {todolistState.map(tl => (
          <Grid item xs={3} key={tl.id}>
            <Paper
              elevation={3}
              style={{
                padding: 10,
                display: 'flex',
                justifyContent: 'center',
                minWidth: 150,
                maxWidth: 300,
              }}
            >
              <Todolist todolistID={tl.id} filter={tl.filter} demo={demo} />
            </Paper>
          </Grid>
        ))}
      </Grid>
    </>
  );
};
