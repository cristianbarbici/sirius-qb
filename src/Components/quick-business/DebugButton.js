import React from "react";
import Button from '@material-ui/core/Button';
import FormRow from "../common/FormRow";
import { useProcessState } from "../../SplatComponents/SplProcess";

export default function DebugButton(props) {

    const processState = useProcessState();

    const handleClick = (e) => {
        console.log(processState);
      };

    return (
        <FormRow>
            <Button onClick={handleClick}>Debug</Button>
        </FormRow>
    );
}