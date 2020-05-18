import React, { useContext, useState } from "react";
import { SplFieldCtx } from "../SplatComponents/SplField";
import { navigateState } from "../SplatComponents/SplProcess";

export default function TextField(props) {
  const fieldContext = useContext(SplFieldCtx);
  const [state, setState] = useState(
    navigateState(fieldContext.path, fieldContext.state)
  );
  const handleSplatFieldValueChange = (event) => {    
    console.log("update " + fieldContext.path + " => " + event.target.value);
    setState(event.target.value);
  };

  return (
    <div>
      {props.label}:
      <input
        type="text"
        value={state}
        id="{props.id}"
        onChange={handleSplatFieldValueChange}
      ></input>
    </div>
  );
}
