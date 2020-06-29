import React, {useRef, useState} from "react"
import { makeStyles } from "@material-ui/core/styles"
import Section from "../Components/common/Section"
import SirDatePicker from "../Components/common/SirDatePicker";
import InsuredPeriod from "../Components/quick-business/InsuredPeriod";
import SearchableField from "../Components/quick-business/optional/SearchableField"
import { useSplatProcessState } from '@splat/splat-react'
import {SPLATFIELD} from '../Components/quick-business/splat/vars'
import SplatData from '../Data/Splat-data'

export const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    maxWidth: theme.spacing(72),
    margin: '0 auto', // `0 auto ${theme.spacing(6)}px`,
    padding: theme.spacing(3, 0),
    backgroundColor: '#fdfdfd' // $hexPanelBg: #fdfdfd;
  },
  section: {
    margin: theme.spacing(4, 0)
  }
}));


export default function Labs(props) {
  const classes = useStyles()
  const processState = useSplatProcessState()

  return (
    <div className={classes.root}>
      <Section>
        <SearchableField label='Broker' splatField={SPLATFIELD.BROKER} data={SplatData.fakeCompanies} />
      </Section>
    </div>
  )
}
