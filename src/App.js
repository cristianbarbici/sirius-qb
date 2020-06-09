import React from "react";
import MomentUtils from "@date-io/moment";
import { MuiPickersUtilsProvider } from "@material-ui/pickers";
import SplProcess from "./SplatComponents/SplProcess";
import CreateQuickBusiness from "./Process/CreateQuickBusiness";
import { ThemeProvider } from '@material-ui/core/styles'
import {theme} from './Styles/theme'
import CssBaseline from '@material-ui/core/CssBaseline';

function App() {
  return (
    <>
      <CssBaseline />
      <ThemeProvider theme={theme}>
        <div className="App">
          <MuiPickersUtilsProvider utils={MomentUtils}>
            <SplProcess name="ContractPOCoverview">
              <CreateQuickBusiness />
            </SplProcess>
          </MuiPickersUtilsProvider>
        </div>
      </ThemeProvider>
    </>
  );
}

export default App;
