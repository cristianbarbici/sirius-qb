import React from "react"
import { makeStyles, useTheme } from "@material-ui/core/styles"
import BusinessTitle from "../Components/quick-business/BusinessTitle"
import TypeOfBusiness from "../Components/quick-business/TypeOfBusiness"
import TypeOfParticipation from "../Components/quick-business/TypeOfParticipation"
import IsCoinsurance from "../Components/quick-business/IsCoinsurance"
import ReportingUnit from "../Components/quick-business/ReportingUnit"
import Section from "../Components/common/Section"
import LifeCycleStatus from "../Components/quick-business/LifeCycleStatus"
import MainClassOfBusiness from "../Components/quick-business/MainClassOfBusiness"

export const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    maxWidth: theme.spacing(72),
    margin: `0 auto ${theme.spacing(6)}px`,
    backgroundColor: '#fdfdfd' // $hexPanelBg: #fdfdfd;
  }
}));

export default function CreateQuickBusiness(props) {
  const classes = useStyles();

  return (
    <div className={classes.root} noValidate autoComplete="off">
      <Section>
        <BusinessTitle />
      </Section>

      <TypeOfBusiness />

      <Section>
        <TypeOfParticipation />
      </Section>
      <Section>
        <ReportingUnit />
      </Section>
      <Section>
        <LifeCycleStatus />
      </Section>
      <Section>
        <MainClassOfBusiness />
      </Section>
      {/*

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
      */}
    </div>
  );
}
