import { 
  fontFamily,
  brdRadius,
  hexSecondary,
  hexPaper,
  hexDefaultBg, 
  fontSizeTextField,
  pxFieldHeight,
  hexError
} from './vars'

import { createMuiTheme } from "@material-ui/core/styles";

// use to get access to default values and mixins
const defaultTheme = createMuiTheme()

// sirius custom theme
export const theme = createMuiTheme({
  palette: {
    primary: {
      main: hexSecondary
    },
    secondary: {
      main: hexSecondary
    },
    background: {
      paper: hexPaper,
      default: hexDefaultBg
    },
    error: {
      main: hexError
    }
  },
  shape: {
    borderRadius: brdRadius
  },
  typography: {
    fontFamily: fontFamily
  },
  overrides: {
    MuiOutlinedInput: {
      root: {
        fontSize: defaultTheme.typography.pxToRem(fontSizeTextField),
        height: defaultTheme.typography.pxToRem(pxFieldHeight),
      },
      input: {
        height: 'unset',
        padding: defaultTheme.spacing(1, 2)
      },
      notchedOutline: {
        borderColor: 'rgba(0,0,0,.12)',
        transition: 'border 200ms cubic-bezier(0.4, 0, 0.2, 1)'
      }
    },
    MuiAutocomplete: {
      root: {},
      inputRoot: {
        '&[class*="MuiOutlinedInput-root"]': {
          padding: 0,

          '& .MuiAutocomplete-input:first-child': {
            padding: defaultTheme.spacing(1, 2)
          }
        }
      },
      endAdornment: {},
      clearIndicator: {
        fontSize: defaultTheme.typography.pxToRem(20),
        color: defaultTheme.palette.text.disabled,
        '&:hover': {
          color: defaultTheme.palette.text.primary
        }
      },
      popupIndicator: {
        fontSize: defaultTheme.typography.pxToRem(20),
        color: defaultTheme.palette.text.disabled,
        '&:hover': {
          color: defaultTheme.palette.text.primary
        }
      }
    }
  }
})