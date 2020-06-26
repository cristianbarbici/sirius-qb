import React from "react"
import _ from 'lodash'
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
import { useSplatField } from '@splat/splat-react'
import {SPLATFIELD} from '../Components/quick-business/splat/vars'
import FormRow from "../Components/common/FormRow"
import Button from '@material-ui/core/Button'

export const useStylesTOBPanel = makeStyles((theme) => ({
  root: {
    display: 'flex',
    justifyContent: 'center',
    backgroundColor: '#ecf3f5',
    borderRadius: 6,
    margin: theme.spacing(0, 4, 2),
    padding: theme.spacing(4, 4.5),
    color: 'rgba(0,0,0,.3)',
    position: 'relative',
    fontSize: '.8rem',
    fontWeight: 600,
    '& > span': {
      margin: theme.spacing(0, .5),
      color: 'rgba(0,0,0,.42)'
    },
    '&:before': {
      position: 'absolute',
      content: '""',
      width: theme.spacing(3),
      height: theme.spacing(3),
      borderRadius: 3,
      backgroundColor: '#ecf3f5',
      left: '50%',
      top: 0,
      transform: 'translate(-50%, -25%) rotate(45deg)'
    }
  },
  rowSection: {
    flexDirection: 'row',
    alignItems: 'center',
    // width: `calc(100% - ${theme.spacing(4.5)}px)`
  },
}));

function TOBPanel(props) {
  const { children } = props
  const classes = useStylesTOBPanel()
  const [value, setValue] = useSplatField(SPLATFIELD.TYPEOFBUSINESS)
  const hasValue = !_.isEmpty(value)

  return (
    <div>
      { hasValue ? children : 
        <div className={classes.root}>
          Select <span>Type of business</span> to reveal more fields.
        </div>
      }
    </div>
  )
}

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

      <TOBPanel>
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
      </TOBPanel>

      {/* <Section>
        <FormRow className={classes.rowSection}>
          <Button>Create Business</Button>
          <Button>Cancel</Button>
        </FormRow>
      </Section> */}


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
