import { useState } from 'react';
import TabBar from '../../components/TabBar';
import LatestMessages from './LatestMessages';
import Users from './Users';
import Groups from './Groups';
import Conversation from './Conversation';
import { useStateContext } from '../../context/state';

const MobileMain = () => {
  const { selectedChat } = useStateContext();
  const [tab, setTab] = useState('chat');

  return (
    <div>
      {!selectedChat ? (
        <div>
          <TabBar tab={tab} setTab={setTab} />
          <div>
            {tab === 'chat' ? (
              <LatestMessages />
            ) : tab === 'users' ? (
              <Users />
            ) : (
              <Groups />
            )}
          </div>
        </div>
      ) : (
        <Conversation />
      )}
    </div>
  );
};

export default MobileMain;
