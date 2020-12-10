import UsersAndGroups from '../components/UsersAndGroups';

import { useMainPageStyles } from '../styles/muiStyles';

const Main = () => {
  const classes = useMainPageStyles();

  return (
    <div className={classes.root}>
      <div className={classes.recentMsgPanel}>
        <UsersAndGroups />
      </div>
    </div>
  );
};

export default Main;
