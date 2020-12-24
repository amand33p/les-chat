import { createMuiTheme } from '@material-ui/core/styles';

const customTheme = (darkMode) =>
  createMuiTheme({
    palette: {
      type: darkMode ? 'dark' : 'light',
      primary: {
        main: darkMode ? '#ff548e' : '#ff4081',
      },
      secondary: {
        main: darkMode ? '#ffcedf' : '#930034',
      },
    },
    overrides: {
      MuiPopover: {
        paper: {
          borderRadius: 2,
        },
      },
      MuiButton: {
        root: {
          borderRadius: 4,
          textTransform: 'none',
          fontSize: '0.95em',
        },
      },
      MuiTypography: {
        root: {
          wordWrap: 'anywhere',
        },
      },
      MuiListItem: {
        root: {
          '&$selected': {
            borderRight: '5px solid #f4649f',
          },
        },
      },
      MuiAvatar: {
        colorDefault: {
          backgroundColor: '#d3d3d3',
          color: '#ff4081',
        },
      },
      MuiSelect: {
        select: {
          '&:focus': {
            display: 'flex',
            alignItems: 'center',
          },
        },
        selectMenu: {
          display: 'flex',
          alignItems: 'center',
        },
      },
    },
    props: {
      MuiButton: {
        disableElevation: true,
      },
    },
  });

export default customTheme;
