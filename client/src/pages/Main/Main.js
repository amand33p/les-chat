import LatestMessages from './LatestMessages';
import Conversation from './Conversation';

import { Container } from '@material-ui/core';
import { useMainPageStyles } from '../../styles/muiStyles';

const Main = () => {
  const classes = useMainPageStyles();

  return (
    <Container>
      <div className={classes.root}>
        <div className={classes.recentMsgPanel}>
          <LatestMessages />
        </div>
        <Conversation />
      </div>
    </Container>
  );
};

export default Main;
