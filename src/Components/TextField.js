import React, { useContext } from "react";
import { SplFieldCtx } from "../SplatComponents/SplField";
import { navigateState, setState } from "../SplatComponents/SplProcess";

export default function TextField(props) {
  const fieldContext = useContext(SplFieldCtx);
  const splatFieldValue = () => navigateState(fieldContext.path, fieldContext.state);
  const handleSplatFieldValueChange = (event) => {    
    console.log("update " + fieldContext.path + " => " + event.target.value);
    setState(fieldContext.path, fieldContext.state, event.target.value);
  };

  return (
    <div>
      {props.label}:
      <input
        type="text"
        value={splatFieldValue()}
        id="{props.id}"
        onChange={handleSplatFieldValueChange}
      ></input>
    </div>
  );
}
