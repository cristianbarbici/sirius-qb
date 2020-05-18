import React from "react";
import { useSplatFieldCtx } from "../SplatComponents/SplField";

export default function TextField(props) {
  const [ state, handler ] = useSplatFieldCtx();

  return (
    <div>
      {props.label}:
      <input
        type="text"
        value={state}
        id={props.id}
        onChange={handler}
      ></input>
    </div>
  );
}
