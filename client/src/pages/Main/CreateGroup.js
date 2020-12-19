import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useMutation, useQuery } from '@apollo/client';
import { GET_GROUPS, GET_ALL_USERS } from '../../graphql/queries';
import { CREATE_GROUP } from '../../graphql/mutations';
import { useStateContext } from '../../context/state';
import EmojiPicker from '../../components/EmojiPicker';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

import {
  TextField,
  Button,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Avatar,
  Chip,
  InputAdornment,
} from '@material-ui/core';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { useCreateGroupStyles } from '../../styles/muiStyles';

const validationSchema = yup.object({
  name: yup
    .string()
    .required('Required')
    .max(30, 'Must be at most 30 characters')
    .min(3, 'Must be at least 3 characters'),
});

const CreateGroup = ({ closeModal }) => {
  const classes = useCreateGroupStyles();
  const { selectChat } = useStateContext();
  const { register, handleSubmit, errors, setValue, getValues } = useForm({
    mode: 'onChange',
    resolver: yupResolver(validationSchema),
  });
  const [participants, setParticipants] = useState([]);

  const { data: userData } = useQuery(GET_ALL_USERS, {
    onError: (err) => {
      console.log(err);
    },
  });
  const [createNewGroup, { loading }] = useMutation(CREATE_GROUP, {
    onError: (err) => {
      console.log(err);
    },
  });

  const usersOnChange = (e, selectedOption) => {
    setParticipants(selectedOption.map((o) => o.id));
  };

  const handleEmojiAdd = (emoji) => {
    setValue('name', getValues('name').concat(emoji), { shouldDirty: true });
  };

  const handleCreateGroup = ({ name }) => {
    createNewGroup({
      variables: { name, participants },
      update: (proxy, { data }) => {
        const returnedData = data.createGroup;
        const dataInCache = proxy.readQuery({
          query: GET_GROUPS,
        });

        proxy.writeQuery({
          query: GET_GROUPS,
          data: { getGroups: [...dataInCache.getGroups, returnedData] },
        });

        selectChat(returnedData, 'group');
        closeModal();
      },
    });
  };

  return (
    <form onSubmit={handleSubmit(handleCreateGroup)}>
      <TextField
        inputRef={register}
        name="name"
        required
        fullWidth
        type="text"
        label="Group Name"
        variant="outlined"
        size="small"
        error={'name' in errors}
        helperText={'name' in errors ? errors.name.message : ''}
        className={classes.textField}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <EmojiPicker handleEmojiAdd={handleEmojiAdd} isModal={true} />
            </InputAdornment>
          ),
        }}
      />
      <Autocomplete
        multiple
        filterSelectedOptions
        onChange={usersOnChange}
        options={userData ? userData.getAllUsers : []}
        getOptionLabel={(option) => option.username}
        renderInput={(params) => (
          <TextField
            {...params}
            variant="outlined"
            label="Select Users"
            size="small"
          />
        )}
        renderOption={(option) => (
          <ListItem dense>
            <ListItemAvatar>
              <Avatar
                alt={option.username}
                src={`https://secure.gravatar.com/avatar/${option.id}?s=150&d=retro`}
              />
            </ListItemAvatar>
            <ListItemText primary={option.username} />
          </ListItem>
        )}
        renderTags={(value, getTagProps) =>
          value.map((option, index) => (
            <Chip
              avatar={
                <Avatar
                  alt={option.username}
                  src={`https://secure.gravatar.com/avatar/${option.id}?s=150&d=retro`}
                />
              }
              color="secondary"
              variant="outlined"
              label={option.username}
              {...getTagProps({ index })}
            />
          ))
        }
      />
      <Button
        size="large"
        color="primary"
        variant="contained"
        fullWidth
        className={classes.submitBtn}
        disabled={loading}
        type="submit"
      >
        Create New Group
      </Button>
    </form>
  );
};

export default CreateGroup;
