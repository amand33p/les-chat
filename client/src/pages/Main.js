import UsersAndGroups from '../components/UsersAndGroups';
import Messages from '../components/Messages';

import { useMainPageStyles } from '../styles/muiStyles';

const Main = () => {
  const classes = useMainPageStyles();

  return (
    <div className={classes.root}>
      <div className={classes.recentMsgPanel}>
        <UsersAndGroups />
      </div>
      <Messages />
    </div>
  );
};

export default Main;
