import { useEffect } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import LoginForm from './LoginForm';
import RegisterForm from './RegisterForm';
import Main from './Main/Main';
import { useAuthContext } from '../context/auth';
import { useStateContext } from '../context/state';

import { useSubscription } from '@apollo/client';
import { NEW_MESSAGE } from '../graphql/subscriptions';
import {
  GET_PRIVATE_MSGS,
  GET_GROUP_MSGS,
  GET_GLOBAL_MSGS,
} from '../graphql/queries';

const Routes = () => {
  const { user } = useAuthContext();
  //const { selectedChat } = useStateContext();
  const { error: subscriptionError } = useSubscription(NEW_MESSAGE, {
    onSubscriptionData: ({ client, subscriptionData }) => {
      const newMessage = subscriptionData.data.newMessage;
      let getMsgQuery;
      let getMsgVariables;
      let getMsgQueryName;

      if (newMessage.type === 'private') {
        const otherUser = newMessage.participants.filter(
          (p) => p !== user.id
        )[0];

        getMsgQuery = GET_PRIVATE_MSGS;
        getMsgVariables = { userId: otherUser };
        getMsgQueryName = 'getPrivateMessages';
      } else if (newMessage.type === 'group') {
        getMsgQuery = GET_GROUP_MSGS;
        getMsgVariables = { conversationId: newMessage.message.conversationId };
        getMsgQueryName = 'getGroupMessages';
      } else if (newMessage.type === 'public') {
        getMsgQuery = GET_GLOBAL_MSGS;
        getMsgVariables = null;
        getMsgQueryName = 'getGlobalMessages';
      }

      const conversationCache = client.readQuery({
        query: getMsgQuery,
        variables: getMsgVariables,
      });

      if (conversationCache) {
        const updatedConvoCache = [
          ...conversationCache[getMsgQueryName],
          newMessage.message,
        ];

        client.writeQuery({
          query: getMsgQuery,
          variables: getMsgVariables,
          data: {
            [getMsgQueryName]: updatedConvoCache,
          },
        });
      }
    },
  });

  useEffect(() => {
    if (subscriptionError) {
      console.log(subscriptionError);
    }
  }, [subscriptionError]);

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
