import { useEffect, useState, useRef } from 'react';
import { useLazyQuery } from '@apollo/client';
import {
  GET_PRIVATE_MSGS,
  GET_GROUP_MSGS,
  GET_GLOBAL_MSGS,
} from '../../graphql/queries';
import { useStateContext } from '../../context/state';
import MessageBubble from './MessageBubble';
import ConversationHeader from './ConversationHeader';
import SendMessage from './SendMessage';

import { useConversationPageStyles } from '../../styles/muiStyles';

const Conversation = () => {
  const classes = useConversationPageStyles();
  const messagesEndRef = useRef(null);
  const { selectedChat } = useStateContext();
  const [messages, setMessages] = useState(null);
  const [
    fetchPrivateMsgs,
    { data: privateData, loading: loadingPrivate },
  ] = useLazyQuery(GET_PRIVATE_MSGS, {
    onError: (err) => {
      console.log(err);
    },
  });
  const [
    fetchGroupMsgs,
    { data: groupData, loading: loadingGroup },
  ] = useLazyQuery(GET_GROUP_MSGS, {
    onError: (err) => {
      console.log(err);
    },
  });
  const [
    fetchGlobalMsgs,
    { data: globalData, loading: loadingGlobal },
  ] = useLazyQuery(GET_GLOBAL_MSGS, {
    onError: (err) => {
      console.log(err);
    },
  });

  useEffect(() => {
    if (!selectedChat) return;

    if (selectedChat.chatType === 'private') {
      fetchPrivateMsgs({
        variables: { userId: selectedChat.chatData.id },
        update: () => {},
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

  if (!messages || loadingPrivate || loadingGroup || loadingGlobal) {
    return <div className={classes.root}>loading...</div>;
  }

  return (
    <div className={classes.root}>
      <ConversationHeader selectedChat={selectedChat} />
      <div className={classes.conversationWrapper}>
        {messages.map((message) => (
          <MessageBubble key={message.id} message={message} />
        ))}
        <div ref={messagesEndRef} />
      </div>

      <SendMessage />
    </div>
  );
};

export default Conversation;
