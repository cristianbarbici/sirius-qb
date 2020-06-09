import {createMuiTheme} from "@material-ui/core";

// TODO: move to separate file
// vars
const hexPrimary        = "#002C73";
const hexSecondary      = "#0060A5";

/*
$rgbSecondary: 0,96,165;
$hexError: #B00020;
$rgbError: rgb(176, 0, 32);
$rgbTextHigh: rgba(0,0,0,.87);
$rgbTextMedium: rgba(0,0,0,.6);
$rgbTextDisabled: rgba(0,0,0,.38);
$rgbTextHint: rgba(0,0,0,.24);
$rgbSeparator: rgba(0,0,0,.12);
$hexPanelBg: #fdfdfd;
*/


export const theme = createMuiTheme({
    palette: {
        primary: {
            main: hexPrimary
        },
        secondary: {
            main: hexSecondary
        }
    },
    typography: {
        caption: {
            letterSpacing: '.5px'
        }
    },
    shape: {
        borderRadius: 4
    },
    overrides: {
        MuiOutlinedInput: {
            root: {
                '&:hover $notchedOutline': {
                    borderColor: hexSecondary,
                }
            },
            notchedOutline: {
                borderColor: 'rgba(0,0,0,.12)',
                transition: 'border-color 200ms cubic-bezier(0.4, 0, 0.2, 1)'
            }
        },
    }
});