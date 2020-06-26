import { createMuiTheme } from "@material-ui/core/styles";
//import { pxFieldHeight } from "./colors";

// TODO: move to separate file
// vars
const hexPrimary = '#002C73'
const hexSecondary = '#0060A5'
const hexDefault = '#f2f2f2'

export const theme = createMuiTheme({
  palette: {
    primary: {
      main: hexSecondary
    },
    secondary: {
      main: hexSecondary
    },
    background: {

      paper: '#fcfcfc',
      default: hexDefault
    }
  },
  typography: {
    fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif",
    caption: {
      //letterSpacing: '.5px'
    }
  },
  shape: {
    borderRadius: 3
  },
  
  overrides: {
    MuiOutlinedInput: {
      // root: {
      //   '&.Mui-focused $notchedOutline': {
      //     borderColor: hexSecondary,
      //     borderWidth: 1
      //   },
      //   '&:hover $notchedOutline': {
      //     borderColor: 'rgba(0,0,0,.87)',
      //   }
      // },
      notchedOutline: {
        borderColor: 'rgba(0,0,0,.12)',
        transition: 'border 200ms cubic-bezier(0.4, 0, 0.2, 1)'
      },
    },
  /*
    MuiInputBase: {
      root: {
        //height: '48px',
        //padding: '0 12px 2px'
      },
      input: {
        //padding: 0
      }
    },

    MuiFilledInput: {
      root: {
        backgroundColor: 'transparent',

        '&:hover': {
          backgroundColor: 'rgba(0,0,0,.02)'
        }
      },
      input: {
        padding: '12px 14px'
      },
      inputHiddenLabel: {
        paddingTop: '12px',
        paddingBottom: '12px'
      }
    },
    MuiButtonGroup: {
      root: {

      },
      grouped: {
        padding: '0 .5rem',
        minHeight: '2rem',
        whiteSpace: 'nowrap',
        fontSize: '.775rem',
        color: 'rgba(0,0,0,.6)'
      }
    },
    MuiButton: {
      root: {

      },
      outlined: {
        borderColor: 'rgba(0,0,0,.12)',
      },
    },
  */  
  }
  
});