import { useState } from 'react';
import { Popover, Button, IconButton } from '@material-ui/core';
import { useEmojiPanelStyles } from '../styles/muiStyles';
import InsertEmoticonIcon from '@material-ui/icons/InsertEmoticon';

const EmojiPicker = ({ handleEmojiAdd, isModal }) => {
  const classes = useEmojiPanelStyles();
  const [anchorEl, setAnchorEl] = useState(null);
  const emojis = ['😂', '😭', '❤️', '🤣', '😍', '😌', '🔥', '🤔', '😫', '🙄'];

  return (
    <div>
      <IconButton
        size="small"
        color={anchorEl ? 'primary' : 'default'}
        onClick={(e) => setAnchorEl(e.currentTarget)}
      >
        <InsertEmoticonIcon fontSize={isModal ? 'default' : 'large'} />
      </IconButton>
      <Popover
        open={Boolean(anchorEl)}
        anchorEl={anchorEl}
        onClose={() => setAnchorEl(false)}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
        transformOrigin={{
          vertical: 'bottom',
          horizontal: isModal ? 'right' : 'left',
        }}
        elevation={1}
      >
        <div className={classes.emojiWrapper}>
          {emojis.map((emoji) => (
            <Button
              onClick={() => handleEmojiAdd(emoji)}
              className={classes.emojiBtn}
              key={emoji}
              color="primary"
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
