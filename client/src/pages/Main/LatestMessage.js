import { formatRecentDate } from '../../utils/helperFuncs';
import { Typography } from '@material-ui/core';
import { useChatListStyles } from '../../styles/muiStyles';
import { truncateString } from '../../utils/helperFuncs';

const LatestMessage = ({ body, type }) => {
  const classes = useChatListStyles();

  return (
    <div className={classes.chatInfo}>
      <div className={classes.nameAndDate}>
        <Typography variant="subtitle1" noWrap>
          {type === 'user'
            ? truncateString(body.username, 10)
            : truncateString(body.name, 10)}
        </Typography>
        <Typography variant="caption" className={classes.greyText}>
          {formatRecentDate(body.latestMessage.createdAt)}
        </Typography>
      </div>

      <Typography variant="subtitle2" className={classes.greyText}>
        {truncateString(body.latestMessage.body, 30)}
      </Typography>
    </div>
  );
};

export default LatestMessage;
