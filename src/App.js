import React from "react";
import logo from "./sirius.svg";
import "./App.css";
import MomentUtils from "@date-io/moment";
import { MuiPickersUtilsProvider } from "@material-ui/pickers";

import SplProcess from "./SplatComponents/SplProcess";
import CreateQuickBusiness from "./Components/CreateQuickBusiness";
import SplStartProcess from "./SplatComponents/SplStartProcess";
import { initSplatComms } from "./lib/splatComms";

import { ThemeProvider } from '@material-ui/core/styles'
import {theme} from './Styles/theme'
import CssBaseline from '@material-ui/core/CssBaseline';

function App() {
  initSplatComms();
  return (
    <>
      <CssBaseline />
      <ThemeProvider theme={theme}>
        <div className="App">
          <MuiPickersUtilsProvider utils={MomentUtils}>
            <header className="App-header">
              <h1 className="header">
                <span className="headerText">SPLAT + REACT&nbsp;&nbsp;</span>
              </h1>
              <img src={logo} className="App-logo" alt="logo" />
            </header>
            <SplStartProcess
              name="ContractPOCoverview"
              label="Start Contract POC"
            >
              <div style={{ background: "#fde" }}>
                <CreateQuickBusiness />
              </div>
            </SplStartProcess>
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
