import React from 'react'
import { useSplatProcessState } from '@splat/splat-react'
import { useSplatField } from '@splat/splat-react'
import FormRow from '../common/FormRow'
import SirRadioGroup from '../common/SirRadioGroup'

export default function LifeCycleStatus(props) {
  const label = 'Life cycle status'
  const processState = useSplatProcessState()
  const [value, setValue] = useSplatField('process_LifeCycleStatus')
  const lifeCycleStatusOptions = processState.LifeCycleStatusOptions

  return (
    <FormRow label={label}>
      <SirRadioGroup value={value} setValue={setValue} data={lifeCycleStatusOptions} />
    </FormRow>
  );
}
