import React from "react"
import _ from 'lodash'
// import clsx from 'clsx'
import { makeStyles } from "@material-ui/core/styles"
import BusinessTitle from "../Components/quick-business/BusinessTitle"
import TypeOfBusiness from "../Components/quick-business/TypeOfBusiness"
import ReportingUnit from "../Components/quick-business/ReportingUnit"
import Section from "../Components/common/Section"
import LifeCycleStatus from "../Components/quick-business/LifeCycleStatus"
import MainClassOfBusiness from "../Components/quick-business/MainClassOfBusiness"
import Currency from "../Components/quick-business/Currency"
import InsuredPeriod from "../Components/quick-business/InsuredPeriod"
import SirExpansionPanel from "../Components/common/SirExpansionPanel"
import TypeOfBusinessPanel from "../Components/quick-business/ctrls/TypeOfBusinessPanel"
import FormRow from "../Components/common/FormRow"
import { Button } from "@material-ui/core"
import Reinsurer from "../Components/quick-business/optional/Reinsurer"


export const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    maxWidth: theme.spacing(68),
    margin: `0 auto ${theme.spacing(6)}px`,
    padding: theme.spacing(3, 0),
    backgroundColor: theme.palette.background.paper
  }
}));

export default function CreateQuickBusiness(props) {
  const classes = useStyles()

  return (
    <div className={classes.root}>
      <BusinessTitle />
      <TypeOfBusiness />
      <TypeOfBusinessPanel>
        <ReportingUnit />
        <InsuredPeriod />
        <LifeCycleStatus />
        <MainClassOfBusiness />
        <Currency />


        <SirExpansionPanel>
          <Reinsurer />
        </SirExpansionPanel>
      </TypeOfBusinessPanel>

      <Section border='top'>
        <FormRow>
          <Button>Create Business</Button>
          <Button>Cancel</Button>
        </FormRow>
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
  )
}
