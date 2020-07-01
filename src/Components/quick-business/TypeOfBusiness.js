import React, { useState } from 'react'
import _ from 'lodash'
import clsx from 'clsx'
import { makeStyles } from '@material-ui/core/styles'
import SirField from '../common/SirField'
import { useSplatField } from '@splat/splat-react'
import { useSplatProcessState } from '@splat/splat-react'
import SirListGroup from '../common/SirListGroup'
import Section from '../common/Section'
import IsCoinsurance from './IsCoinsurance'
import TypeOfParticipation from './TypeOfParticipation'
import {SPLATFIELD} from './splat/vars'
import { hexValid } from '../../Styles/vars'
import CheckIcon from '@material-ui/icons/Check'

export const useStyles = makeStyles((theme) => ({
  section: {
    flexDirection: 'row',
    alignItems: 'center',
    width: `calc(100% - ${theme.spacing(4.5)}px)`
  },
  formRow: {
    flex: 1,
    paddingRight: 0
  },
  validIcon: {
    marginLeft: theme.spacing(2),
    marginTop: theme.spacing(3),
    color: hexValid
  },
}));

export default function TypeOfBusiness(props) {
  const label = 'Type of business'
  const processState = useSplatProcessState()
  const classes = useStyles()
  const [value, setValue] = useSplatField(SPLATFIELD.TYPEOFBUSINESS)
  const [valueParticipation, setValueParticipation] = useSplatField(SPLATFIELD.TYPEOFPARTICIPATION)
  const hasValue = !_.isEmpty(value)
  const [open, setOpen] = useState(!hasValue)
  const typeOfBusinessOptions = processState.TypeOfBusinessOptions
  const hasCoinsurance = hasValue && (value.Code === 'DIRECT' || value.Code === 'NONPROPDIR')
  const callbackSetValue = newValue => {
    if (newValue !== value) {
      setValueParticipation({})
      setValue(newValue)
    }
  }
  const editMode = open && hasValue
  const untouched = open && !hasValue
  const hasCoinsuranceClosed = hasCoinsurance && !open

  return (
    <>
      <Section className={clsx({ [classes.section]: hasCoinsuranceClosed })}>
        <SirField 
          label={label} 
          className={clsx({ [classes.formRow]: hasCoinsuranceClosed })} 
          hint={untouched ? 'Select an option' : (editMode ? 'Select to close' : null)}
          valid={!open}
          edit={hasValue && open}
        >
          <SirListGroup value={value} setValue={callbackSetValue} data={typeOfBusinessOptions} open={open} setOpen={setOpen} hideValidationIcon={hasCoinsuranceClosed} />
        </SirField>
        { hasCoinsuranceClosed ? 
          <>
            <IsCoinsurance />
            <CheckIcon className={classes.validIcon} fontSize='small' />
          </> : 
          null}
      </Section>
      {hasValue && <TypeOfParticipation />}
    </>
  );
}
