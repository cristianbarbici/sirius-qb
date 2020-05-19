import React from "react";
import logo from "./sirius.svg";
import "./App.css";
import MomentUtils from "@date-io/moment";
import { MuiPickersUtilsProvider } from "@material-ui/pickers";

import SplProcess from "./SplatComponents/SplProcess";
import CreateQuickBusiness from "./Components/CreateQuickBusiness";

function App() {
  return (
    <div className="App">
      <MuiPickersUtilsProvider utils={MomentUtils}>
        <header className="App-header">
          <h1 className="header">
            <span className="headerText">SPLAT + REACT&nbsp;&nbsp;</span>
          </h1>
          <img src={logo} className="App-logo" alt="logo" />
        </header>
        <SplProcess name="ContractPOCoverview">
          <CreateQuickBusiness />
        </SplProcess>
      </MuiPickersUtilsProvider>
    </div>
  );
}

export default App;
