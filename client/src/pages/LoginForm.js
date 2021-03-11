import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link as RouterLink } from 'react-router-dom';
import { useApolloClient } from '@apollo/client';
import { useMutation } from '@apollo/client';
import { LOGIN_USER } from '../graphql/mutations';
import { useAuthContext } from '../context/auth';
import { useStateContext } from '../context/state';
import ErrorMessage from '../components/ErrorMessage';
import DemoCredsBox from '../components/DemoCredsBox';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { getErrorMsg } from '../utils/helperFuncs';

import {
  TextField,
  Button,
  Typography,
  InputAdornment,
  IconButton,
  Link,
  Container,
} from '@material-ui/core';
import { useAuthFormStyles } from '../styles/muiStyles';
import PersonIcon from '@material-ui/icons/Person';
import LockIcon from '@material-ui/icons/Lock';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import VisibilityOffIcon from '@material-ui/icons/VisibilityOff';
import VisibilityIcon from '@material-ui/icons/Visibility';

const validationSchema = yup.object({
  username: yup.string().required('Required'),
  password: yup.string().required('Required'),
});

const LoginForm = () => {
  const [showPass, setShowPass] = useState(false);
  const [errorMsg, setErrorMsg] = useState(null);
  const classes = useAuthFormStyles();
  const { setUser } = useAuthContext();
  const { notify } = useStateContext();
  const { register, handleSubmit, reset, errors } = useForm({
    mode: 'onChange',
    resolver: yupResolver(validationSchema),
  });
  const client = useApolloClient();
  const [loginUser, { loading }] = useMutation(LOGIN_USER, {
    onError: (err) => {
      setErrorMsg(getErrorMsg(err));
    },
  });

  const onLogin = ({ username, password }) => {
    loginUser({
      variables: { username, password },
      update: (_, { data }) => {
        setUser(data.login);
        notify(`Welcome, ${data.login.username}! You're logged in.`);
        reset();
      },
    });
    client.clearStore();
  };

  return (
    <Container>
      <div className={classes.root}>
        <Typography variant="h4" color="secondary" className={classes.title}>
          Login to your <strong>LesChat!</strong> account
        </Typography>
        <form onSubmit={handleSubmit(onLogin)} className={classes.form}>
          <div className={classes.inputField}>
            <TextField
              required
              fullWidth
              inputRef={register}
              name="username"
              type="text"
              label="Username"
              variant="outlined"
              error={'username' in errors}
              helperText={'username' in errors ? errors.username.message : ''}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <PersonIcon color="primary" />
                  </InputAdornment>
                ),
              }}
            />
          </div>
          <div className={classes.inputField}>
            <TextField
              required
              fullWidth
              inputRef={register}
              name="password"
              type={showPass ? 'text' : 'password'}
              label="Password"
              variant="outlined"
              error={'password' in errors}
              helperText={'password' in errors ? errors.password.message : ''}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={() => setShowPass((prevState) => !prevState)}
                      size="small"
                    >
                      {showPass ? (
                        <VisibilityOffIcon color="secondary" />
                      ) : (
                        <VisibilityIcon color="secondary" />
                      )}
                    </IconButton>
                  </InputAdornment>
                ),
                startAdornment: (
                  <InputAdornment position="start">
                    <LockIcon color="primary" />
                  </InputAdornment>
                ),
              }}
            />
          </div>
          <Button
            color="primary"
            variant="contained"
            size="large"
            fullWidth
            startIcon={<ExitToAppIcon />}
            type="submit"
            disabled={loading}
            className={classes.submitButton}
          >
            Log In
          </Button>
        </form>
        <Typography variant="body1" className={classes.footerText}>
          Don’t have an account?{' '}
          <Link className={classes.link} component={RouterLink} to="/register">
            Sign Up
          </Link>
        </Typography>
        <ErrorMessage
          errorMsg={errorMsg}
          clearErrorMsg={() => setErrorMsg(null)}
        />
        <DemoCredsBox />
      </div>
    </Container>
  );
};

export default LoginForm;
