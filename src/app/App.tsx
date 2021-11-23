import React, { useEffect } from 'react';

import './App.css';
import { Container, LinearProgress } from '@material-ui/core';
import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import MenuIcon from '@material-ui/icons/Menu';
import { CircularProgress } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { Route, Routes } from 'react-router-dom';

import { ErrorSnackbar } from '../components/ErrorSnackbar/ErrorSnackbar';
import { logoutTC } from '../features/Login/AuthReducer';
import { Login } from '../features/Login/Login';
import { TodolistsList } from '../features/TodolistsList/TodolistsList';

import { initializeAppTC } from './AppReducer';
import { AppStateType, useAppSelector } from './store';

type PropsType = {
  demo?: boolean;
};

export const App = React.memo(({ demo = false }: PropsType) => {
  const status = useAppSelector(state => state.app.status);
  const isInitialized = useAppSelector(state => state.app.isInitialized);
  const isLoggedIn = useSelector<AppStateType, boolean>(state => state.auth.isLoggedIn);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(initializeAppTC());
  }, [dispatch]);

  if (!isInitialized) {
    return (
      <div style={{ position: 'fixed', top: '30%', textAlign: 'center', width: '100%' }}>
        <CircularProgress />
      </div>
    );
  }

  const logOutHandler = (): void => {
    dispatch(logoutTC());
  };

  return (
    <div>
      <ErrorSnackbar />
      <Container maxWidth="xl">
        <AppBar position="static" style={{ marginBottom: 30 }}>
          <Toolbar style={{ display: 'flex', justifyContent: 'space-between' }}>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <IconButton edge="start" color="inherit" aria-label="menu">
                <MenuIcon />
              </IconButton>
              <Typography variant="h6">My Todolist Project</Typography>
            </div>
            <Button color="inherit" onClick={logOutHandler} disabled={!isLoggedIn}>
              Log out
            </Button>
          </Toolbar>
          <div className="linearProgress">
            {status === 'loading' && <LinearProgress />}
          </div>
        </AppBar>
        <Routes>
          <Route path="/" element={<TodolistsList demo={demo} />} />
          <Route path="login" element={<Login />} />
          <Route path="*" element={<h1>404: PAGE NOT FOUND</h1>} />
        </Routes>
      </Container>
    </div>
  );
});
