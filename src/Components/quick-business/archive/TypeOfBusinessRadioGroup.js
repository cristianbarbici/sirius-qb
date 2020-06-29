import React from 'react'
import SirField from '../../common/SirField'
import { useSplatField } from '@splat/splat-react'
import { useSplatProcessState } from '@splat/splat-react'
import SirRadioGroup from './SirRadioGroup'

export default function TypeOfBusinessButtonGroup(props) {
  const label = 'Type of business'
  const processState = useSplatProcessState()
  const [value, setValue] = useSplatField('process_TypeOfBusiness')
  const typeOfBusinessOptions = processState.TypeOfBusinessOptions

  return (
    <SirField label={label}>
      <SirRadioGroup value={value} setValue={setValue} data={typeOfBusinessOptions} />
    </SirField>
  )
}