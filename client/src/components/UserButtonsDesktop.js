import { Link as RouterLink } from 'react-router-dom';

import { Button, Typography, Avatar } from '@material-ui/core';
import { useNavStyles } from '../styles/muiStyles';

const UserButtonsDesktop = ({ user, handleLogout, isMobile }) => {
  const classes = useNavStyles();

  if (isMobile) return null;

  return (
    <div>
      {user ? (
        <div className={classes.rightBtnWrapper}>
          <div className={classes.userInfo}>
            <Avatar
              alt={user.username}
              src={`https://secure.gravatar.com/avatar/${user.id}?s=150&d=retro`}
              className={classes.avatar}
            />
            <Typography color="secondary" variant="body1">
              {user.username}
            </Typography>
          </div>
          <Button
            color="primary"
            className={classes.lastBtn}
            onClick={handleLogout}
          >
            Logout
          </Button>
        </div>
      ) : (
        <div>
          <Button color="primary" component={RouterLink} to="/login">
            Login
          </Button>
          <Button
            color="primary"
            className={classes.lastBtn}
            component={RouterLink}
            to="/register"
          >
            Register
          </Button>
        </div>
      )}
    </div>
  );
};

export default UserButtonsDesktop;
