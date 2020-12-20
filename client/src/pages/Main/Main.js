import { useState } from 'react';
import TabBar from '../../components/TabBar';
import LatestMessages from './LatestMessages';
import Users from './Users';
import Groups from './Groups';
import Conversation from './Conversation';

import { Container } from '@material-ui/core';
import { useMainPageStyles } from '../../styles/muiStyles';

const Main = () => {
  const classes = useMainPageStyles();
  const [tab, setTab] = useState('chat');

  return (
    <Container>
      <div className={classes.root}>
        <div className={classes.leftPanel}>
          <TabBar tab={tab} setTab={setTab} />
          <div className={classes.leftPanelContent}>
            {tab === 'chat' ? (
              <LatestMessages />
            ) : tab === 'users' ? (
              <Users />
            ) : (
              <Groups />
            )}
          </div>
        </div>
        <Conversation />
      </div>
    </Container>
  );
};

export default Main;
