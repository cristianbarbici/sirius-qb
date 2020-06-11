import React from "react";
import Switch from "@material-ui/core/Switch";
import { useSplatField } from "@splat/splat-react";
import FormRow from "../common/FormRow";

export default function IsCoinsurance(props) {
  const [value, setValue] = useSplatField("process_IsCoinsurance");

  const handleChange = (e) => {
    setValue(!value);
  };

  return (
    <FormRow label={"Is coinsurance"}>
      <Switch size='small' checked={value} onChange={handleChange} />
    </FormRow>
  );
}
