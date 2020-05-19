import React from "react";
import { useSplatActionCtx } from "../SplatComponents/SplAction";

export default function Button(props) {
  const [disabled, handleClick] = useSplatActionCtx();

  return (
    <button type="button" disabled={disabled} onClick={handleClick}>
      {props.label}
    </button>
  );
}
