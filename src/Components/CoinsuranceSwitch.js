import React from "react";
import { FormGroup, FormControlLabel } from "@material-ui/core";
import Switch from "@material-ui/core/Switch";
import { useSplatFieldCtx, eventTargetChecked } from "../SplatComponents/SplField";

export default function CoinsuranceSwitch(props) {
  const [state, switchHandler] = useSplatFieldCtx(eventTargetChecked);
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
