import { Tab, Tabs } from '@material-ui/core';
import { useTabBarStyles } from '../styles/muiStyles';

const TabBar = ({ tab, setTab }) => {
  const classes = useTabBarStyles();

  const handleTabChange = (e, newValue) => {
    setTab(newValue);
  };

  return (
    <div className={classes.root}>
      <Tabs
        value={tab}
        indicatorColor="primary"
        textColor="primary"
        onChange={handleTabChange}
        variant="fullWidth"
        className={classes.tabs}
      >
        <Tab className={classes.tab} label="Chat" value="chat" />
        <Tab className={classes.tab} label="Users" value="users" />
        <Tab className={classes.tab} label="Groups" value="groups" />
      </Tabs>
    </div>
  );
};

export default TabBar;
