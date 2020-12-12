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
    logoBtn: {
      textTransform: 'none',
      fontSize: '1.2em',
      padding: '0.1em',
      marginRight: '0.3em',
      [theme.breakpoints.down('xs')]: {
        fontSize: '1em',
        marginLeft: '0.6em',
      },
    },
    appBar: {
      borderBottom: `3px solid ${theme.palette.primary.main}98`,
    },
    svgImage: {
      width: '28px',
      marginRight: '5px',
      [theme.breakpoints.down('xs')]: {
        width: '20px',
      },
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

export const useMenuStyles = makeStyles(
  (theme) => ({
    avatar: {
      marginRight: '0.2em',
      width: theme.spacing(2.8),
      height: theme.spacing(2.8),
    },
    moreBtn: {
      padding: '0.35em',
    },
    userBtnMob: {
      padding: '0.35em',
    },
    menuIcon: {
      marginRight: '8px',
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

export const useMainPageStyles = makeStyles(
  (theme) => ({
    root: {
      display: 'flex',
    },
    recentMsgPanel: {
      width: '40%',
      borderRight: '1px solid #d3d3d390',
      borderLeft: '1px solid #d3d3d390',
      height: 'calc(100vH - 52px)',
    },
  }),
  { index: 1 }
);

export const useLatestMessagesPageStyles = makeStyles(
  (theme) => ({
    root: {
      width: '100%',
      overflowY: 'auto',
    },
    listItem: {
      display: 'flex',
    },
    chatInfo: {
      width: '100%',
    },
    latestMsgRow: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    greyText: {
      color: '#555555',
    },
  }),
  { index: 1 }
);

export const useConversationPageStyles = makeStyles(
  (theme) => ({
    root: {
      width: '100%',
      borderRight: '1px solid #d3d3d390',
      display: 'flex',
      flexDirection: 'column',
    },
    conversationWrapper: {
      paddingTop: '1em',
      padding: '2em',
      overflowY: 'auto',
      flexGrow: 1,
      maxHeight: 'calc(100vH - 214px)',
    },
    messageWrapper: {
      display: 'flex',
      margin: '1em 0',
    },
    sentMsg: {
      padding: '0.6em 1em',
      backgroundColor: theme.palette.primary.main,
      color: '#fff',
      borderRadius: 20,
      marginLeft: 'auto',
      maxWidth: '90%',
    },
    receivedMsg: {
      padding: '0.6em 1em',
      backgroundColor: '#e3e3e3',
      borderRadius: 20,
      marginRight: 'auto',
      maxWidth: '90%',
    },
    msgText: {
      wordWrap: 'anywhere',
    },
    conversationHeader: {
      display: 'flex',
      padding: '0.5em 1em',
      borderBottom: '1px solid #d3d3d390',
      alignItems: 'center',
    },
    titleText: {
      marginLeft: '0.8em',
    },
    sendMsgForm: {
      display: 'flex',
    },
  }),
  { index: 1 }
);
