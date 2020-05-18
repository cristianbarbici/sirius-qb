import React, { useContext, useCallback } from "react";
import { useSplatFieldCtx, SplFieldCtx } from "../SplatComponents/SplField";
import { SplProcessCtx } from "../SplatComponents/SplProcess";


export default function TextField(props) {
  const { reducer } = useContext(SplProcessCtx);
  const { path } = useContext(SplFieldCtx);
  const eventHandler = useCallback(
    (event) =>
      reducer({ type: "update", path: path, value: event.target.value }),
    [path, reducer]
  );
  const [ state ] = useSplatFieldCtx();

  return (
    <div>
      {props.label}:
      <input
        type="text"
        value={state}
        id={props.id}
        onChange={eventHandler}
      ></input>
    </div>
  );
}
