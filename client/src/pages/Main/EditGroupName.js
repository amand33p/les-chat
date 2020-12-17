import { useForm } from 'react-hook-form';
import { useMutation } from '@apollo/client';
import { GET_GROUPS } from '../../graphql/queries';
import { EDIT_GROUP_NAME } from '../../graphql/mutations';
import { useStateContext } from '../../context/state';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

import { TextField, Button } from '@material-ui/core';
import { useGroupInfoStyles } from '../../styles/muiStyles';

const validationSchema = yup.object({
  name: yup
    .string()
    .required('Required')
    .max(30, 'Must be at most 30 characters')
    .min(3, 'Must be at least 3 characters'),
});

const EditGroupName = ({ setEditOpen }) => {
  const classes = useGroupInfoStyles();
  const { selectedChat, updateName } = useStateContext();
  const { register, handleSubmit, errors } = useForm({
    mode: 'onChange',
    resolver: yupResolver(validationSchema),
    defaultValues: {
      name: selectedChat.chatData.name,
    },
  });
  const [updateGroupName] = useMutation(EDIT_GROUP_NAME, {
    onError: (err) => {
      console.log(err);
    },
  });

  const handleEditName = ({ name }) => {
    updateGroupName({
      variables: { conversationId: selectedChat.chatData.id, name },
      update: (proxy, { data }) => {
        const returnedData = data.editGroupName;
        const dataInCache = proxy.readQuery({
          query: GET_GROUPS,
        });

        const updatedGroups = dataInCache.getGroups.map((g) =>
          g.id === returnedData.groupId ? { ...g, name: returnedData.name } : g
        );

        proxy.writeQuery({
          query: GET_GROUPS,
          data: { getGroups: updatedGroups },
        });

        setEditOpen(false);
        if (selectedChat.chatData.id === returnedData.groupId) {
          updateName(returnedData);
        }
      },
    });
  };

  return (
    <form onSubmit={handleSubmit(handleEditName)}>
      <TextField
        inputRef={register}
        name="name"
        required
        fullWidth
        type="text"
        placeholder="Enter group name"
        variant="outlined"
        size="small"
        error={'name' in errors}
        helperText={'name' in errors ? errors.name.message : ''}
      />
      <div className={classes.updateNameBtns}>
        <Button
          size="small"
          variant="outlined"
          color="primary"
          onClick={() => setEditOpen(false)}
        >
          Cancel
        </Button>
        <Button type="submit" size="small" variant="contained" color="primary">
          Update Group Name
        </Button>
      </div>
    </form>
  );
};

export default EditGroupName;
