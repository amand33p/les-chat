import { Switch, Route, Redirect } from 'react-router-dom';
import LoginForm from './LoginForm';
import RegisterForm from './RegisterForm';
import { useAuthContext } from '../context/auth';

const Routes = () => {
  const { user } = useAuthContext();

  return (
    <Switch>
      <Route exact path="/">
        {user ? <h1>Home</h1> : <Redirect to="/register" />}
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
