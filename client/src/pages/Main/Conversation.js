import { useEffect, useState } from 'react';
import { useLazyQuery } from '@apollo/client';
import {
  GET_PRIVATE_MSGS,
  GET_GROUP_MSGS,
  GET_GLOBAL_MSGS,
} from '../../graphql/queries';
import { useStateContext } from '../../context/state';
import Message from '../../components/Message';
import ConversationHeader from '../../components/ConversationHeader';

import { useConversationPageStyles } from '../../styles/muiStyles';

const Conversation = () => {
  const classes = useConversationPageStyles();
  const { selectedChat } = useStateContext();
  const [messages, setMessages] = useState(null);
  const [fetchPrivateMsgs, { loadingPrivate }] = useLazyQuery(
    GET_PRIVATE_MSGS,
    {
      fetchPolicy: 'network-only',
      onError: (err) => {
        console.log(err);
      },
      onCompleted: ({ getPrivateMessages: fetchedData }) => {
        setMessages(fetchedData);
      },
    }
  );
  const [fetchGroupMsgs, { loadingGroup }] = useLazyQuery(GET_GROUP_MSGS, {
    fetchPolicy: 'network-only',
    onError: (err) => {
      console.log(err);
    },
    onCompleted: ({ getGroupMessages: fetchedData }) => {
      setMessages(fetchedData);
    },
  });
  const [fetchGlobalMsgs, { loadingGlobal }] = useLazyQuery(GET_GLOBAL_MSGS, {
    fetchPolicy: 'network-only',
    onError: (err) => {
      console.log(err);
    },
    onCompleted: ({ getGlobalMessages: fetchedData }) => {
      setMessages(fetchedData);
    },
  });

  useEffect(() => {
    if (!selectedChat) {
      return;
    }

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

  if (!messages || loadingPrivate || loadingGroup || loadingGlobal) {
    return <div>loading...</div>;
  }

  return (
    <div className={classes.root}>
      <ConversationHeader selectedChat={selectedChat} />
      <div className={classes.conversationWrapper}>
        {messages.map((message) => (
          <Message key={message.id} message={message} />
        ))}
      </div>
    </div>
  );
};

export default Conversation;
