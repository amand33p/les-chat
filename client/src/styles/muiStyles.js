import { makeStyles } from '@material-ui/core/styles';

export const useBodyStyles = makeStyles(
  (theme) => ({
    root: {
      width: '100vW',
      display: 'flex',
      flexDirection: 'column',
      flex: 1,
      minHeight: '100vH',
    },
  }),
  { index: 1 }
);

export const useNavStyles = makeStyles(
  (theme) => ({
    leftPortion: {
      flexGrow: 1,
      display: 'flex',
      alignItems: 'center',
    },
    logoWrapper: {
      marginRight: '1em',
      [theme.breakpoints.down('xs')]: {
        display: 'flex',
        alignItems: 'center',
      },
    },
    logo: {
      textTransform: 'none',
      fontSize: '1.3em',
      padding: '0.1em',
      marginRight: '0.3em',
    },
    appBar: {
      borderBottom: `3px solid ${theme.palette.primary.main}98`,
    },
    rightBtnWrapper: {
      display: 'flex',
      alignItems: 'center',
    },
    lastBtn: {
      marginLeft: '0.7em',
    },
    userInfo: {
      display: 'flex',
      alignItems: 'center',
      borderRight: `1px solid ${theme.palette.primary.main}50`,
      paddingRight: '0.8em',
    },
    avatar: {
      width: theme.spacing(3.8),
      height: theme.spacing(3.8),
      marginRight: '0.4em',
      borderRadius: 2,
    },
  }),
  { index: 1 }
);

export const useAuthFormStyles = makeStyles(
  (theme) => ({
    root: {
      padding: '15em',
      paddingTop: '10%',
      [theme.breakpoints.down('xs')]: {
        padding: '10% 0 0 0',
      },
    },
    form: {
      marginTop: '3em',
    },
    inputField: {
      marginBottom: '1.5em',
    },
    submitButton: {
      marginTop: '0.5em',
      height: '3.1em',
      fontSize: '1em',
      fontWeight: 500,
    },
    title: {
      textAlign: 'center',
      [theme.breakpoints.down('xs')]: {
        fontSize: '1.5em',
      },
    },
    footerText: {
      marginTop: '1em',
      textAlign: 'center',
    },
    link: {
      cursor: 'pointer',
    },
  }),
  { index: 1 }
);
