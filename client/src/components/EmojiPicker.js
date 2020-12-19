import { Popover, Button } from '@material-ui/core';
import { useEmojiPanelStyles } from '../styles/muiStyles';

const EmojiPicker = ({ anchorEl, setAnchorEl, handleEmojiAdd }) => {
  const classes = useEmojiPanelStyles();
  const emojis = ['😂', '😭', '❤️', '🤣', '😍', '😌', '🔥', '🤔', '😫', '🙄'];

  return (
    <div>
      <Popover
        open={anchorEl}
        anchorEl={anchorEl}
        onClose={() => setAnchorEl(false)}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
        transformOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        elevation={1}
      >
        <div className={classes.emojiWrapper}>
          {emojis.map((emoji) => (
            <Button
              onClick={() => handleEmojiAdd(emoji)}
              className={classes.emojiBtn}
            >
              {emoji}
            </Button>
          ))}
        </div>
      </Popover>
    </div>
  );
};

export default EmojiPicker;
