import React from 'react';

import Button from '@mui/material/Button';
import Checkbox from '@mui/material/Checkbox';
import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormGroup from '@mui/material/FormGroup';
import FormLabel from '@mui/material/FormLabel';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import { useFormik } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

import { AppStateType } from '../../app/store';

import { loginTC } from './AuthReducer';

export const Login = (): React.ReactElement => {
  const dispatch = useDispatch();
  const isLoggedIn = useSelector<AppStateType, boolean>(state => state.auth.isLoggedIn);

  type FormikErrorType = {
    email?: string;
    password?: string;
    rememberMe?: boolean;
  };

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
      rememberMe: false,
    },
    validate: values => {
      const errors: FormikErrorType = {};
      if (!values.email) {
        errors.email = 'e-mail required';
      } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
        errors.email = 'Invalid email address';
      }
      if (!values.password) {
        errors.password = 'password required';
      } else if (values.password.length < 2) {
        errors.password = 'password required min 2 symbols';
      }
      return errors;
    },
    onSubmit: async (values, formikHelpers) => {
      debugger;
      const action = await dispatch(loginTC(values));
      formikHelpers.setFieldError('email', 'FAKE ERROR');
      formik.resetForm();
    },
  });

  if (isLoggedIn) {
    return <Navigate to="/" />;
  }

  return (
    <Grid container justifyContent="center">
      <Grid item justifyContent="center">
        <form onSubmit={formik.handleSubmit}>
          <FormControl>
            <FormLabel>
              <p>
                To log in get registered
                <a
                  href="https://social-network.samuraijs.com/"
                  target="_blank"
                  rel="noreferrer"
                >
                  {' '}
                  here
                </a>
              </p>
              <p>or use common test account credentials:</p>
              <p>Email: free@samuraijs.com</p>
              <p>Password: free</p>
            </FormLabel>
            <FormGroup>
              <TextField
                {...formik.getFieldProps('email')}
                onBlur={formik.handleBlur}
                label="Email"
                margin="normal"
                error={!!formik.errors.email && formik.touched.email}
                helperText={
                  !!formik.errors.email && formik.touched.email && formik.errors.email
                }
              />
              <TextField
                {...formik.getFieldProps('password')}
                onBlur={formik.handleBlur}
                type="password"
                label="Password"
                margin="normal"
                error={!!formik.errors.password && formik.touched.password}
                helperText={
                  !!formik.errors.password &&
                  formik.touched.password &&
                  formik.errors.password
                }
              />
              <FormControlLabel
                label="Remember me"
                control={
                  <Checkbox
                    name="rememberMe"
                    onChange={formik.handleChange}
                    value={formik.values.rememberMe}
                  />
                }
              />
              <Button type="submit" variant="contained" color="primary">
                Login
              </Button>
            </FormGroup>
          </FormControl>
        </form>
      </Grid>
    </Grid>
  );
};
