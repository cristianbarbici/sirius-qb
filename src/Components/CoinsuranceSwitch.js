import React from "react";
import { FormGroup, FormControlLabel } from "@material-ui/core";
import Switch from "@material-ui/core/Switch";
import { useSplatFieldCtx } from "../SplatComponents/SplField";

export default function CoinsuranceSwitch(props) {
  const [state, handler] = useSplatFieldCtx();
  const switchHandler = (event) =>
    handler({ target: { value: event.target.checked} });
  return (
    <FormGroup row>
      <FormControlLabel
        control={
          <Switch
            checked={state}
            onChange={switchHandler}
            name="coinsuranceSwitch"
          />
        }
        label="Is Coinsurance"
      />
    </FormGroup>
  );
}
