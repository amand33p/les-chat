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

export const useDialogStyles = makeStyles(
  (theme) => ({
    dialogWrapper: {
      paddingBottom: 20,
      overflow: 'hidden',
      [theme.breakpoints.down('xs')]: {
        padding: 0,
      },
    },
  }),
  { index: 1 }
);

export const useMainPageStyles = makeStyles(
  (theme) => ({
    root: {
      display: 'flex',
    },
    leftPanel: {
      width: '40%',
      borderRight: '1px solid #d3d3d390',
      borderLeft: '1px solid #d3d3d390',
      maxHeight: 'calc(100vH - 52px)',
      minHeight: 'calc(100vH - 52px)',
      overflowY: 'auto',
    },
  }),
  { index: 1 }
);

export const useTabBarStyles = makeStyles(
  (theme) => ({
    tabs: {
      borderBottom: '1px solid #d3d3d390',
    },
    tab: {
      minWidth: 50,
      minHeight: 56,
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

export const useChatListStyles = makeStyles(
  (theme) => ({
    root: {
      width: '100%',
    },
    listItem: {
      display: 'flex',
    },
    chatInfo: {
      width: '100%',
    },
    nameAndDate: {
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
      padding: '1em',
      paddingTop: '0em',
      overflowY: 'auto',
      flexGrow: 1,
      maxHeight: 'calc(100vH - 181px)',
      minHeight: 'calc(100vH - 181px)',
    },
    noMessages: {
      display: 'flex',
      height: 'calc(100vH - 181px)',
      padding: '1em',
      paddingTop: '0em',
    },
    dateInfoWrapper: {
      margin: '2em 0',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
    },
    infoText: {
      margin: 'auto auto 1em auto',
      backgroundColor: `${theme.palette.primary.main}18`,
      color: '#333',
      padding: '0.4em 0.8em',
      borderRadius: 8,
      border: `1px solid ${theme.palette.primary.main}40`,
    },
    msgMarginSameUser: {
      marginTop: '0.2em',
      marginBottom: '0.2em',
    },
    msgMarginDiffUser: {
      marginTop: '1.5em',
      marginBottom: '0.2em',
    },
    messageWrapper: {
      display: 'flex',
    },
    msgTime: {
      marginLeft: '1.5em',
      fontSize: '0.6em',
    },
    sentMsg: {
      padding: '0.4em 1em',
      backgroundColor: theme.palette.primary.main,
      color: '#fff',
      borderRadius: 10,
      marginLeft: 'auto',
      maxWidth: '90%',
      display: 'flex',
      alignItems: 'flex-end',
    },
    receivedMsg: {
      padding: '0.4em 1em',
      backgroundColor: '#e3e3e3',
      borderRadius: 10,
      marginRight: 'auto',
      maxWidth: '90%',
      display: 'flex',
      alignItems: 'flex-end',
    },
    msgText: {
      wordWrap: 'anywhere',
    },
    conversationHeader: {
      display: 'flex',
      padding: '0.5em 1em',
      borderBottom: '1px solid #d3d3d390',
      alignItems: 'center',
      justifyContent: 'space-between',
    },
    headerTitle: {
      display: 'flex',
      alignItems: 'center',
      padding: '0 0.4em',
    },
    rightHeaderBtns: {
      display: 'flex',
      alignItems: 'center',
    },
    titleText: {
      marginLeft: '0.8em',
      marginRight: '0.7em',
    },
    sendMsgForm: {
      display: 'flex',
    },
  }),
  { index: 1 }
);

export const useGroupInfoStyles = makeStyles(
  (theme) => ({
    topPart: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      flexDirection: 'column',
      textAlign: 'center',
    },
    groupIcon: {
      width: 60,
      height: 60,
    },
    groupName: {
      marginBottom: '0.5em',
      display: 'flex',
    },
    editBtn: {
      marginLeft: '0.8em',
    },
    membersListWrapper: {
      margin: '0 auto',
      width: '50%',
      border: '1px solid #d3d3d3',
      marginTop: '1.2em',
      [theme.breakpoints.down('sm')]: {
        width: '100%',
      },
    },
    membersList: {
      overflowY: 'auto',
      maxHeight: '250px',
      [theme.breakpoints.down('sm')]: {
        maxHeight: '200px',
      },
    },
    membersHeader: {
      textAlign: 'center',
      borderBottom: '1px solid #d3d3d3',
    },
    updateNameBtns: {
      marginTop: 2,
      display: 'flex',
      justifyContent: 'space-between',
    },
  }),
  { index: 1 }
);

export const useAddGroupMembersStyles = makeStyles(
  (theme) => ({
    addMemberBtn: {
      marginTop: '3em ',
    },
  }),
  { index: 1 }
);
