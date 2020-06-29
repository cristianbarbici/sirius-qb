import React from "react";
import Button from "@material-ui/core/Button";
import SirField from "../../common/SirField";
import { useSplatProcessState } from "@splat/splat-react";

export default function DebugButton(props) {
  const processState = useSplatProcessState();

  const handleClick = (e) => {
    console.log(processState);
  };

  return (
    <SirField>
      <Button onClick={handleClick}>Debug</Button>
    </SirField>
  );
}
