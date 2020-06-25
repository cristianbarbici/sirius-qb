import React from "react"
import { makeStyles } from "@material-ui/core/styles"
import BusinessTitle from "../Components/quick-business/BusinessTitle"
import TypeOfBusiness from "../Components/quick-business/TypeOfBusiness"
import ReportingUnit from "../Components/quick-business/ReportingUnit"
import Section from "../Components/common/Section"
import LifeCycleStatus from "../Components/quick-business/LifeCycleStatus"
import MainClassOfBusiness from "../Components/quick-business/MainClassOfBusiness"
import Currency from "../Components/quick-business/Currency"
import Reinsurer from "../Components/quick-business/optional/Reinsurer"
import InsuredPeriod from "../Components/quick-business/InsuredPeriod"

export const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    maxWidth: theme.spacing(68),
    margin: `0 auto ${theme.spacing(6)}px`,
    padding: theme.spacing(3, 0),
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
        <ReportingUnit />
      </Section>

      <Section>
        <InsuredPeriod />
      </Section>

      <Section>
        <LifeCycleStatus />
      </Section>

      <Section>
        <MainClassOfBusiness />
      </Section>

      <Section>
        <Currency />
      </Section>



      {/*
      <Section>
        <Reinsurer />
      </Section>
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
