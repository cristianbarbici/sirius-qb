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
import SirField from "../Components/common/SirField"
import SearchableField from "../Components/quick-business/optional/SearchableField"
import { useSplatProcessState } from '@splat/splat-react'
import SirButton from "../Components/common/SirButton"
import {SPLATFIELD} from '../Components/quick-business/splat/vars'
import SplatData from '../Data/Splat-data'

export const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    maxWidth: theme.spacing(68),
    margin: `0 auto ${theme.spacing(6)}px`,
    padding: theme.spacing(3, 0),
    backgroundColor: theme.palette.background.paper
  },
  actions: {
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',

    '& > *': {
      // marginRight: theme.spacing(2)
    }
  }
}));

export default function CreateQuickBusiness(props) {
  const classes = useStyles()
  const processState = useSplatProcessState()
  // const brokers = processState.
  
  const isValid = false

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
          <SearchableField label='Broker' splatField={SPLATFIELD.BROKER} data={SplatData.fakeCompanies} />
          <SearchableField label='Insurer' splatField={SPLATFIELD.INSURED} data={SplatData.fakeCompanies} />
          {/* 
            Broker
            Insurer
            Nr.of businesses
          */}
        </SirExpansionPanel>
      </TypeOfBusinessPanel>

      <Section border='top'>
        <SirField>
          <div className={classes.actions}>
            <SirButton disabled={!isValid} variant='contained' color='primary' onClick={() => console.log(processState)}>Create</SirButton>
            {/* <SirButton>Cancel</SirButton> */}
          </div>
        </SirField>
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
