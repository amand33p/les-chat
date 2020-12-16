import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

import {
  TextField,
  Button,
  Typography,
  InputAdornment,
  IconButton,
  Link,
  Container,
} from '@material-ui/core';

const validationSchema = yup.object({
  name: yup
    .string()
    .required('Required')
    .max(30, 'Must be at most 30 characters')
    .min(3, 'Must be at least 3 characters'),
});

const EditGroupName = () => {
  const { register, handleSubmit, reset, errors } = useForm({
    mode: 'onChange',
    resolver: yupResolver(validationSchema),
  });

  return <form></form>;
};

export default EditGroupName;
