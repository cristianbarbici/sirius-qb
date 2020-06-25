import React, {useState} from 'react'
import _ from 'lodash'
import { useSplatProcessState } from '@splat/splat-react'
import { useSplatField } from '@splat/splat-react'
import FormRow from '../common/FormRow'
import SirListGroup from '../common/SirListGroup'
import {SPLATFIELD} from './splat/vars'

export default function LifeCycleStatus(props) {
  const label = 'Life cycle status'
  const processState = useSplatProcessState()
  const [value, setValue] = useSplatField(SPLATFIELD.LIFECYCLESTATUS)
  const hasValue = !_.isEmpty(value)
  const lifeCycleStatusOptions = processState.LifeCycleStatusOptions
  const [open, setOpen] = useState(true)
  const editMode = open && hasValue
  const untouched = open && !hasValue

  return (
    <FormRow label={label} valid={!open} hint={untouched ? 'Select an option' : (editMode ? 'Select to close' : null)}>
      <SirListGroup value={value} setValue={setValue} data={lifeCycleStatusOptions} open={open} setOpen={setOpen} />
    </FormRow>
  );
}
