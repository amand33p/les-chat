import { formatDateAgo } from '../utils/helperFuncs';

import { Typography } from '@material-ui/core';
import { useUsersGroupsPageStyles } from '../styles/muiStyles';

const LatestMessage = ({ body, type }) => {
  const classes = useUsersGroupsPageStyles();

  return (
    <div className={classes.chatInfo}>
      <Typography variant="subtitle1" noWrap>
        {type === 'user' ? body.username : body.name}
      </Typography>
      <div className={classes.latestMsgRow}>
        <Typography variant="subtitle2" noWrap className={classes.greyText}>
          {body.latestMessage.body}
        </Typography>
        <Typography variant="caption" className={classes.greyText}>
          {`${formatDateAgo(body.latestMessage.createdAt)} ago`}
        </Typography>
      </div>
    </div>
  );
};

export default LatestMessage;
