import { useEffect } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import LoginForm from './LoginForm';
import RegisterForm from './RegisterForm';
import Main from './Main/Main';
import { useAuthContext } from '../context/auth';

import { useSubscription } from '@apollo/client';
import { NEW_MESSAGE } from '../graphql/subscriptions';
import {
  GET_PRIVATE_MSGS,
  GET_GROUP_MSGS,
  GET_GLOBAL_MSGS,
  GET_ALL_USERS,
  GET_GROUPS,
  GET_GLOBAL_GROUP,
} from '../graphql/queries';

const Routes = () => {
  const { user } = useAuthContext();
  const { error: subscriptionError } = useSubscription(NEW_MESSAGE, {
    onSubscriptionData: ({ client, subscriptionData }) => {
      const newMessage = subscriptionData.data.newMessage;

      let getMsgQuery,
        getMsgVariables,
        getMsgQueryName,
        getLastMsgQuery,
        getLastMsgQueryName,
        lastMsgTargetId;

      if (newMessage.type === 'private') {
        const otherUserId = newMessage.participants.filter(
          (p) => p !== user.id
        )[0];

        getMsgQuery = GET_PRIVATE_MSGS;
        getMsgVariables = { userId: otherUserId };
        getMsgQueryName = 'getPrivateMessages';
        getLastMsgQuery = GET_ALL_USERS;
        getLastMsgQueryName = 'getAllUsers';
        lastMsgTargetId = otherUserId;
      } else if (newMessage.type === 'group') {
        const groupConversationId = newMessage.message.conversationId;

        getMsgQuery = GET_GROUP_MSGS;
        getMsgVariables = { conversationId: groupConversationId };
        getMsgQueryName = 'getGroupMessages';
        getLastMsgQuery = GET_GROUPS;
        getLastMsgQueryName = 'getGroups';
        lastMsgTargetId = groupConversationId;
      } else if (newMessage.type === 'public') {
        getMsgQuery = GET_GLOBAL_MSGS;
        getMsgVariables = null;
        getMsgQueryName = 'getGlobalMessages';
        getLastMsgQuery = GET_GLOBAL_GROUP;
        getLastMsgQueryName = 'getGlobalGroup';
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

      const lastMsgCache = client.readQuery({
        query: getLastMsgQuery,
      });

      if (lastMsgCache) {
        const updatedLastMsgCache =
          newMessage.type === 'public'
            ? {
                ...lastMsgCache[getLastMsgQueryName],
                latestMessage: newMessage.message,
              }
            : lastMsgCache[getLastMsgQueryName].map((l) =>
                l.id === lastMsgTargetId
                  ? { ...l, latestMessage: newMessage.message }
                  : l
              );

        client.writeQuery({
          query: getLastMsgQuery,
          data: {
            [getLastMsgQueryName]: updatedLastMsgCache,
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
