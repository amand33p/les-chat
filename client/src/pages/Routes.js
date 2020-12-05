import { Switch, Route } from 'react-router-dom';
import LoginForm from './LoginForm';
import RegisterForm from './RegisterForm';

const Routes = () => {
  return (
    <Switch>
      <Route exact path="/">
        <h1>Home</h1>
      </Route>
      <Route exact path="/login">
        <LoginForm />
      </Route>
      <Route exact path="/register">
        <RegisterForm />
      </Route>
    </Switch>
  );
};

export default Routes;
