import React, { useState } from 'react'
import _ from 'lodash'
import clsx from 'clsx'
import { makeStyles } from '@material-ui/core/styles'
import FormRow from '../common/FormRow'
// import { useSplatField } from '@splat/splat-react'
// import { useSplatProcessState } from '@splat/splat-react'
import SirListGroup from '../common/SirListGroup'
import Section from '../common/Section'
import IsCoinsurance from './IsCoinsurance'
import TypeOfParticipation from './TypeOfParticipation'
import processState from '../../Data/SICS-refdata'

export const useStyles = makeStyles((theme) => ({
  twoCol: {
    flex: 1,
    paddingRight: 0
  }
}));

export default function TypeOfBusiness(props) {
  const label = 'Type of business'
  // const processState = useSplatProcessState()
  const classes = useStyles()
  const [value, setValue] = useState({}) //useSplatField('process_TypeOfBusiness')
  const hasValue = !_.isEmpty(value)
  const [open, setOpen] = useState(!hasValue)
  const typeOfBusinessOptions = processState.typeOfBusinessOptions
  const hasCoinsurance = !_.isEmpty(value) && (value.Code === 'DIRECT' || value.Code === 'NONPROPDIR')

  const callBackOpen = open => setOpen(open)

  return (
    <>
      <Section row={(hasCoinsurance && !open).toString()}>
        <FormRow 
          label={label} 
          className={clsx({ [classes.twoCol]: hasCoinsurance && !open })} 
          hint={hasValue ? '' : 'Select an option an all will be revealed'}
          valid={!open}
        >
          <SirListGroup value={value} setValue={setValue} data={typeOfBusinessOptions} callBack={callBackOpen} />
        </FormRow>
        {hasCoinsurance && !open ? <IsCoinsurance /> : null}
      </Section>
      {hasValue ?
        <Section>
          <TypeOfParticipation typeOfBusiness={value} />
        </Section> : null
      }
    </>
  );
}
