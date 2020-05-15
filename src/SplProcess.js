import React, { useState } from 'react';
import splat from './Splat-data'
export const SplProcessCtx = React.createContext({ loaded: false });

export default function SplProcess(props) {
  const [state] = useState(splat.state);

  return (
    <SplProcessCtx.Provider value={state}>
      {props.children}
    </SplProcessCtx.Provider>
  );
}
