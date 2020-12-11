import UsersAndGroups from './UsersAndGroups';
import Messages from './Messages';

import { useMainPageStyles } from '../../styles/muiStyles';

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
