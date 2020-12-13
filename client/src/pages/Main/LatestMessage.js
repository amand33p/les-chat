import { formatRelativeTime } from '../../utils/helperFuncs';

import { Typography } from '@material-ui/core';
import { useLatestMessagesPageStyles } from '../../styles/muiStyles';
import { truncateString } from '../../utils/helperFuncs';

const LatestMessage = ({ body, type }) => {
  const classes = useLatestMessagesPageStyles();

  return (
    <div className={classes.chatInfo}>
      <div className={classes.nameAndDate}>
        <Typography variant="subtitle1" noWrap>
          {type === 'user'
            ? truncateString(body.username, 20)
            : truncateString(body.name, 20)}
        </Typography>
        <Typography variant="caption" className={classes.greyText}>
          {formatRelativeTime(body.latestMessage.createdAt)}
        </Typography>
      </div>

      <Typography variant="subtitle2" className={classes.greyText}>
        {truncateString(body.latestMessage.body, 30)}
      </Typography>
    </div>
  );
};

export default LatestMessage;
