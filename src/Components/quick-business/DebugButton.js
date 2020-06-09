import React from "react";
import Button from "@material-ui/core/Button";
import FormRow from "../common/FormRow";
import { useSplatProcessState } from "@splat/splat-react";

export default function DebugButton(props) {
  const processState = useSplatProcessState();

  const handleClick = (e) => {
    console.log(processState);
  };

  return (
    <FormRow>
      <Button onClick={handleClick}>Debug</Button>
    </FormRow>
  );
}
