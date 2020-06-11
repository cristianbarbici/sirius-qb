import React from 'react'
import FormRow from '../common/FormRow'
import { useSplatField } from '@splat/splat-react'
import { useSplatProcessState } from '@splat/splat-react'
import SirListGroup from '../common/SirListGroup'

export default function TypeOfBusinessButtonGroup(props) {
  const label = 'Type of business'
  const processState = useSplatProcessState()
  const [value, setValue] = useSplatField('process_TypeOfBusiness')
  const typeOfBusinessOptions = processState.TypeOfBusinessOptions

  return (
    <FormRow label={label}>
      <SirListGroup value={value} setValue={setValue} data={typeOfBusinessOptions} />
    </FormRow>
  );
}
