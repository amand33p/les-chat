import { useEffect, useState, useRef } from 'react';
import { useLazyQuery, useSubscription } from '@apollo/client';
import {
  GET_PRIVATE_MSGS,
  GET_GROUP_MSGS,
  GET_GLOBAL_MSGS,
  GET_ALL_USERS,
  GET_GROUPS,
  GET_GLOBAL_GROUP,
} from '../../graphql/queries';
import { NEW_MESSAGE } from '../../graphql/subscriptions';
import { useStateContext } from '../../context/state';
import { useAuthContext } from '../../context/auth';
import MessageBubble from './MessageBubble';
import ConversationHeader from './ConversationHeader';
import SendMessage from './SendMessage';
import LoadingSpinner from '../../components/LoadingSpinner';
import {
  sameDay,
  formatToYesterDay,
  getErrorMsg,
} from '../../utils/helperFuncs';

import { Typography, useMediaQuery } from '@material-ui/core';
import { useTheme } from '@material-ui/core/styles';
import { useConversationPageStyles } from '../../styles/muiStyles';

const Conversation = () => {
  const classes = useConversationPageStyles();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const messagesEndRef = useRef(null);
  const { selectedChat, notify } = useStateContext();
  const { user } = useAuthContext();
  const [messages, setMessages] = useState(null);

  const [
    fetchPrivateMsgs,
    { data: privateData, loading: loadingPrivate },
  ] = useLazyQuery(GET_PRIVATE_MSGS, {
    onError: (err) => {
      notify(getErrorMsg(err), 'error');
    },
  });
  const [
    fetchGroupMsgs,
    { data: groupData, loading: loadingGroup },
  ] = useLazyQuery(GET_GROUP_MSGS, {
    onError: (err) => {
      notify(getErrorMsg(err), 'error');
    },
  });
  const [
    fetchGlobalMsgs,
    { data: globalData, loading: loadingGlobal },
  ] = useLazyQuery(GET_GLOBAL_MSGS, {
    onError: (err) => {
      notify(getErrorMsg(err), 'error');
    },
  });

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
    onError: (err) => {
      notify(getErrorMsg(err), 'error');
    },
  });

  useEffect(() => {
    if (subscriptionError) {
      notify(getErrorMsg(subscriptionError), 'error');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [subscriptionError]);

  useEffect(() => {
    if (!selectedChat) return;
    if (selectedChat.chatType === 'private') {
      fetchPrivateMsgs({
        variables: { userId: selectedChat.chatData.id },
      });
    } else if (selectedChat.chatType === 'group') {
      fetchGroupMsgs({
        variables: { conversationId: selectedChat.chatData.id },
      });
    } else {
      fetchGlobalMsgs();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedChat]);

  useEffect(() => {
    if (!selectedChat) return;
    if (privateData && selectedChat.chatType === 'private') {
      setMessages(privateData.getPrivateMessages);
    } else if (groupData && selectedChat.chatType === 'group') {
      setMessages(groupData.getGroupMessages);
    } else if (globalData && selectedChat.chatType === 'public') {
      setMessages(globalData.getGlobalMessages);
    }
  }, [privateData, groupData, globalData, selectedChat]);

  const scrollToBottom = () => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView();
    }
  };

  useEffect(() => {
    scrollToBottom();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [messages]);

  if (!selectedChat && !isMobile)
    return (
      <div className={classes.root}>
        <div className={classes.noMessages}>
          <div className={classes.selectChatText}>
            <Typography>Select a chat to start messaging</Typography>
          </div>
        </div>
      </div>
    );

  const isGroupGlobalChat =
    selectedChat.chatType === 'public' || selectedChat.chatType === 'group';

  const dataToDisplay = () => {
    if (loadingPrivate || loadingGroup || loadingGlobal || !messages) {
      return (
        <div className={classes.conversationWrapper}>
          <LoadingSpinner size={80} marginTop={200} />
        </div>
      );
    } else if (messages.length === 0) {
      return (
        <div className={classes.noMessages}>
          <div className={classes.infoText}>
            <Typography>
              {selectedChat.chatType === 'private'
                ? `You're connected with ${selectedChat.chatData.username}. Start chatting now!`
                : 'Be the first one to message in the group.'}
            </Typography>
          </div>
        </div>
      );
    } else {
      return (
        <div className={classes.conversationWrapper}>
          {messages.map((message, index) => {
            const isSameDay =
              index !== 0
                ? sameDay(messages[index - 1].createdAt, message.createdAt)
                : false;

            const isSameUser =
              index !== 0 &&
              isSameDay &&
              messages[index - 1].senderId === message.senderId;

            return (
              <div key={message.id}>
                {!isSameDay && (
                  <div className={classes.dateInfoWrapper}>
                    <Typography variant="body2" className={classes.infoText}>
                      {formatToYesterDay(message.createdAt)}
                    </Typography>
                  </div>
                )}
                <div
                  className={
                    isSameUser
                      ? classes.msgMarginSameUser
                      : classes.msgMarginDiffUser
                  }
                >
                  {isGroupGlobalChat &&
                    !isSameUser &&
                    user.id !== message.senderId && (
                      <Typography variant="caption" color="secondary">
                        {message.user.username}
                      </Typography>
                    )}
                  <MessageBubble message={message} />
                </div>
              </div>
            );
          })}
          <div ref={messagesEndRef} />
        </div>
      );
    }
  };

  return (
    <div className={classes.root}>
      <ConversationHeader />
      {dataToDisplay()}
      <SendMessage />
    </div>
  );
};

export default Conversation;
