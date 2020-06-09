import React from "react";
import SplField from "../SplatComponents/SplField";
import TextField from "../Components/TextField";
import SplAction from "../SplatComponents/SplAction";
import Button from "../Components/Button";
import { useStyles } from "../Hooks/useStyles";
import { useProcessState } from "../SplatComponents/SplProcess";
import Select from "../Components/Select";

import FormRow from "../Components/common/FormRow";
import BusinessTitle from "../Components/quick-business/BusinessTitle";
import TypeOfBusiness from "../Components/quick-business/TypeOfBusiness";
import TypeOfParticipation from "../Components/quick-business/TypeOfParticipation";
import IsCoinsurance from "../Components/quick-business/IsCoinsurance";
import InsuredPeriod from "../Components/quick-business/InsuredPeriod";
import DebugButton from "../Components/quick-business/DebugButton";
import ReportingUnit from "../Components/quick-business/ReportingUnit";

export default function CreateQuickBusiness(props) {
  const processState = useProcessState();
  const classes = useStyles();

  return (
    <form className={classes.root} noValidate autoComplete="off">
      
      <BusinessTitle />
      <TypeOfBusiness />
      {/* TODO: Hide/show IsCoinsurance and TypeOfParticipation based on TypeOfBusiness */}
      <IsCoinsurance />
      <TypeOfParticipation />
      
      <ReportingUnit />

      <InsuredPeriod />

      <FormRow>
        <SplField path="process_MainClassOfBusiness">
          <Select
            id="MainClassOfBusiness"
            label="Main class of business"
            options={processState.MainClassOfBusinessOptions}
            optionKey="Code"
            optionName="Name"
          />
        </SplField>
      </FormRow>

      <DebugButton />

      <FormRow>
        <SplAction name="CreateBusiness">
          <Button label="Create Business" />
        </SplAction>
        <SplAction name="Init">
          <Button label="Reset All" />
        </SplAction>
        <SplAction name="GenerateDummyData">
          <Button label="Generate" />
        </SplAction>
      </FormRow>
    </form>
  );
}
