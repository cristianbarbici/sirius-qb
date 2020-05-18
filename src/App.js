import React from 'react';
import logo from './factor10-logo.svg';
import './App.css';
import CtxApp from "./Components/CtxApp";
import SplProcess from "./SplatComponents/SplProcess";
import CreateQuickBusiness from "./Components/CreateQuickBusiness";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <CtxApp />
        <img src={logo} className="App-logo" alt="logo" />
        <SplProcess>
          <CreateQuickBusiness />
        </SplProcess>
      </header>
    </div>
  );
}

export default App;
