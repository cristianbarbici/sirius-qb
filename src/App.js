import React from "react";
import CssBaseline from "@material-ui/core/CssBaseline";

import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom"

import { SplProcess } from "@splat/splat-react";
import { ThemeProvider } from "@material-ui/core/styles";
import { theme } from "./Styles/theme";
import Splat from "./Data/Splat-data";
import { logger } from "./SplatComponents/splatBackendReducer";
import CreateQuickBusiness from "./Process/CreateQuickBusiness";
// import TestTOB from "./Process/TestTOB"
import Labs from './Process/Labs'

function App() {
  // make sure we can see in the console what kind of actions we are creating
  const middleware = [logger];

  return (
    <>
      <CssBaseline />
      <ThemeProvider theme={theme}>
        <SplProcess
          state={{ typeData: Splat.typeData, state: Splat.state, instanceUri: Splat.event.origin, lastKnownEventId: Splat.event.eventId }}
          middleware={middleware}
          name="ContractPOCoverview"
        >
          <Router>
            <Switch>
              
              {/* <Route path="/test">
                <TestTOB />
              </Route> */}
              
              <Route path='/labs'>
                <Labs />
              </Route>
              
              <Route path="/">
                <CreateQuickBusiness />
              </Route>
              
            </Switch>
          </Router>
        </SplProcess>
      </ThemeProvider>
    </>
  );
}

export default App;
