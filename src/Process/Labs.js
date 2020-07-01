import React, {useRef, useState} from "react"
import { makeStyles } from "@material-ui/core/styles"
import Section from "../Components/common/Section"
import SirDatePicker from "../Components/common/SirDatePicker";
import InsuredPeriod from "../Components/quick-business/InsuredPeriod";
import SearchableField from "../Components/quick-business/optional/SearchableField"
import { useSplatProcessState } from '@splat/splat-react'
import {SPLATFIELD} from '../Components/quick-business/splat/vars'
import SplatData from '../Data/Splat-data'
import SirButton from "../Components/common/SirButton";
import ReportingUnit from "../Components/quick-business/ReportingUnit";
import Currency from "../Components/quick-business/Currency";
import NrOfBusinesses from '../Components/quick-business/NrOfBusinesses'
import SirTextField from "../Components/common/SirTextField";
import SirField from "../Components/common/SirField";

export const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    maxWidth: theme.spacing(72),
    margin: '0 auto',
    padding: theme.spacing(3, 0),
    backgroundColor: theme.palette.background.paper
  },
}));


export default function Labs(props) {
  const classes = useStyles()
  const processState = useSplatProcessState()

  return (
    <div className={classes.root}>
      <Section>
        <SirField>
          <SirTextField></SirTextField>
        </SirField>
      </Section>
      <Section>
        <SearchableField label='Broker' splatField={SPLATFIELD.BROKER} data={SplatData.fakeCompanies} />
      </Section>
      <Section>
        <ReportingUnit />
      </Section>
      <Section>
        <Currency />
      </Section>
      <Section>
        <NrOfBusinesses />
      </Section>

    </div>
  )
}
