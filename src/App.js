import React from 'react';
import logo from './sirius.svg';
import './App.css';
import SplProcess from "./SplatComponents/SplProcess";
import CreateQuickBusiness from "./Components/CreateQuickBusiness";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
      </header>
      <SplProcess name="ContractPOCoverview">
        <CreateQuickBusiness />
      </SplProcess>
    </div>
  );
}

export default App;
