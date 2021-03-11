import { Switch, Route, Redirect } from 'react-router-dom';
import LoginForm from './LoginForm';
import RegisterForm from './RegisterForm';
import Main from './Main/Main';
import MobileMain from './Main/MobileMain';
import { useAuthContext } from '../context/auth';

import { useMediaQuery } from '@material-ui/core';
import { useTheme } from '@material-ui/core/styles';

const Routes = () => {
  const { user } = useAuthContext();
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <Switch>
      <Route exact path="/">
        {user ? (
          isSmallScreen ? (
            <MobileMain />
          ) : (
            <Main />
          )
        ) : (
          <Redirect to="/login" />
        )}
      </Route>
      <Route exact path="/login">
        {!user ? <LoginForm /> : <Redirect to="/" />}
      </Route>
      <Route exact path="/register">
        {!user ? <RegisterForm /> : <Redirect to="/" />}
      </Route>
    </Switch>
  );
};

export default Routes;
