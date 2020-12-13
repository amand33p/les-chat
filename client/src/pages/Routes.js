import { useEffect } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import LoginForm from './LoginForm';
import RegisterForm from './RegisterForm';
import Main from './Main/Main';
import { useAuthContext } from '../context/auth';

import { useSubscription } from '@apollo/client';
import { NEW_MESSAGE } from '../graphql/subscriptions';

const Routes = () => {
  const { user } = useAuthContext();
  const { error } = useSubscription(NEW_MESSAGE, {
    onSubscriptionData: ({ client, subscriptionData }) => {
      console.log(subscriptionData);
    },
  });

  useEffect(() => {
    if (error) {
      console.log(error);
    }
  }, [error]);

  return (
    <Switch>
      <Route exact path="/">
        {user ? <Main /> : <Redirect to="/register" />}
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
