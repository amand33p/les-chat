import { useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import DialogBox from './DialogBox';
import CreateGroup from '../pages/Main/CreateGroup';
import DarkModeSwitch from './DarkModeSwitch';

import { IconButton, Menu, MenuItem, Avatar } from '@material-ui/core';
import { useMenuStyles } from '../styles/muiStyles';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import PowerSettingsNewIcon from '@material-ui/icons/PowerSettingsNew';
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import PeopleAltIcon from '@material-ui/icons/PeopleAlt';

const MobileUserMenu = ({ user, handleLogout, isMobile }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [createGroupModal, setCreateGroupModal] = useState(false);
  const classes = useMenuStyles();

  const handleOpenMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setAnchorEl(null);
  };

  const handleLogoutClick = () => {
    handleLogout();
    handleCloseMenu();
  };

  const handleCreateGroupModal = () => {
    setCreateGroupModal(true);
    handleCloseMenu();
  };

  if (!isMobile) return null;

  return (
    <div>
      <DarkModeSwitch />
      {user ? (
        <IconButton onClick={handleOpenMenu} className={classes.userBtnMob}>
          <Avatar
            alt={user.username}
            src={`https://secure.gravatar.com/avatar/${user.id}?s=150&d=retro`}
            className={classes.avatar}
            variant="rounded"
          />
          <MoreVertIcon color="primary" />
        </IconButton>
      ) : (
        <IconButton
          onClick={handleOpenMenu}
          color="primary"
          className={classes.moreBtn}
        >
          <MoreVertIcon color="primary" />
        </IconButton>
      )}
      <Menu
        anchorEl={anchorEl}
        getContentAnchorEl={null}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        keepMounted
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        open={Boolean(anchorEl)}
        onClose={handleCloseMenu}
        marginThreshold={0}
        elevation={1}
      >
        {user ? (
          <div>
            <DialogBox
              title="Create A Group"
              modalOpen={createGroupModal}
              setModalOpen={setCreateGroupModal}
              triggerButton={
                <MenuItem onClick={handleCreateGroupModal}>
                  <PeopleAltIcon className={classes.menuIcon} />
                  Create Group
                </MenuItem>
              }
              children={
                <CreateGroup closeModal={() => setCreateGroupModal(false)} />
              }
            />
            <MenuItem onClick={handleLogoutClick}>
              <PowerSettingsNewIcon className={classes.menuIcon} />
              Logout: {user.username}
            </MenuItem>
          </div>
        ) : (
          <div>
            <MenuItem
              component={RouterLink}
              to="/login"
              onClick={handleCloseMenu}
            >
              <ExitToAppIcon className={classes.menuIcon} />
              Log In
            </MenuItem>
            <MenuItem
              component={RouterLink}
              to="/register"
              onClick={handleCloseMenu}
            >
              <PersonAddIcon className={classes.menuIcon} />
              Sign Up
            </MenuItem>
          </div>
        )}
      </Menu>
    </div>
  );
};

export default MobileUserMenu;
