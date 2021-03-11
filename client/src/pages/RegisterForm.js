import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link as RouterLink } from 'react-router-dom';
import { useApolloClient } from '@apollo/client';
import { useMutation } from '@apollo/client';
import { REGISTER_USER } from '../graphql/mutations';
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
import EnhancedEncryptionIcon from '@material-ui/icons/EnhancedEncryption';
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import VisibilityOffIcon from '@material-ui/icons/VisibilityOff';
import VisibilityIcon from '@material-ui/icons/Visibility';

const validationSchema = yup.object({
  username: yup
    .string()
    .required('Required')
    .max(20, 'Must be at most 20 characters')
    .min(3, 'Must be at least 3 characters')
    .matches(
      /^[a-zA-Z0-9-_]*$/,
      'Only alphanum, dash & underscore characters are allowed'
    ),
  password: yup
    .string()
    .required('Required')
    .min(6, 'Must be at least 6 characters'),
  confirmPassword: yup
    .string()
    .required('Required')
    .min(6, 'Must be at least 6 characters'),
});

const RegisterForm = () => {
  const [showPass, setShowPass] = useState(false);
  const [errorMsg, setErrorMsg] = useState(null);
  const [showConfPass, setShowConfPass] = useState(false);
  const classes = useAuthFormStyles();
  const { setUser } = useAuthContext();
  const { notify } = useStateContext();
  const { register, handleSubmit, reset, errors } = useForm({
    mode: 'onChange',
    resolver: yupResolver(validationSchema),
  });
  const client = useApolloClient();
  const [registerUser, { loading }] = useMutation(REGISTER_USER, {
    onError: (err) => {
      setErrorMsg(getErrorMsg(err));
    },
  });

  const onRegister = ({ username, password, confirmPassword }) => {
    if (password !== confirmPassword)
      return setErrorMsg('Both passwords need to match.');

    registerUser({
      variables: { username, password },
      update: (_, { data }) => {
        setUser(data.register);
        notify(
          `Welcome, ${data.register.username}! You've successfully registered.`
        );
        reset();
      },
    });
    client.clearStore();
  };

  return (
    <Container>
      <div className={classes.root}>
        <Typography variant="h4" color="secondary" className={classes.title}>
          Welcome to <strong>LesChat!</strong>
        </Typography>
        <form onSubmit={handleSubmit(onRegister)} className={classes.form}>
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
          <div className={classes.inputField}>
            <TextField
              required
              fullWidth
              inputRef={register}
              name="confirmPassword"
              type={showConfPass ? 'text' : 'password'}
              label="Confirm Password"
              variant="outlined"
              error={'confirmPassword' in errors}
              helperText={
                'confirmPassword' in errors
                  ? errors.confirmPassword.message
                  : ''
              }
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={() => setShowConfPass((prevState) => !prevState)}
                      size="small"
                    >
                      {showConfPass ? (
                        <VisibilityOffIcon color="secondary" />
                      ) : (
                        <VisibilityIcon color="secondary" />
                      )}
                    </IconButton>
                  </InputAdornment>
                ),
                startAdornment: (
                  <InputAdornment position="start">
                    <EnhancedEncryptionIcon color="primary" />
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
            startIcon={<PersonAddIcon />}
            type="submit"
            disabled={loading}
            className={classes.submitButton}
          >
            Sign Up
          </Button>
        </form>
        <Typography variant="body1" className={classes.footerText}>
          Already have an account?{' '}
          <Link className={classes.link} component={RouterLink} to="/login">
            Log In
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

export default RegisterForm;
