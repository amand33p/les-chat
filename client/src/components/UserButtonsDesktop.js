import { Button } from '@material-ui/core';

const UserButtonsDesktop = ({ user, handleLogout, isMobile }) => {
  if (isMobile) return null;

  return (
    <div>
      {user ? (
        <Button color="primary">Logout</Button>
      ) : (
        <div>
          <Button color="primary">Login</Button>
          <Button color="primary">Register</Button>
        </div>
      )}
    </div>
  );
};

export default UserButtonsDesktop;
