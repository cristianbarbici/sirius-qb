import React from "react";
import MomentUtils from "@date-io/moment";
import { MuiPickersUtilsProvider } from "@material-ui/pickers";
import { SplProcess } from "@splat/splat-react";
import CreateQuickBusiness from "./Process/CreateQuickBusiness";
import { ThemeProvider } from "@material-ui/core/styles";
import { theme } from "./Styles/theme";
import CssBaseline from "@material-ui/core/CssBaseline";
import Splat from "./Data/Splat-data";
import { logger } from "./SplatComponents/splatBackendReducer";

function App() {
  // make sure we can see in the console what kind of actions we are creating
  const middleware = [logger];

  return (
    <>
      <CssBaseline />
      <ThemeProvider theme={theme}>
        <div className="App">
          <MuiPickersUtilsProvider utils={MomentUtils}>
            <SplProcess
              state={Splat.state}
              middleware={middleware}
              name="ContractPOCoverview"
            >
              <CreateQuickBusiness />
            </SplProcess>
          </MuiPickersUtilsProvider>
        </div>
      </ThemeProvider>
    </>
  );
}

export default App;
