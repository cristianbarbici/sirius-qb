import React, {useState} from 'react'
// import { useSplatProcessState } from '@splat/splat-react'
// import { useSplatField } from '@splat/splat-react'
import FormRow from '../common/FormRow'
import SirListGroup from '../common/SirListGroup'
import refData from '../../Data/SICS-refdata'

export default function LifeCycleStatus(props) {
  const label = 'Life cycle status'
  // const processState = useSplatProcessState()
  const [value, setValue] = useState({}) //useSplatField('process_LifeCycleStatus')
  // const lifeCycleStatusOptions = processState.LifeCycleStatusOptions
  const [open, setOpen] = useState(true)
  const callBackOpen = open => setOpen(open)

  return (
    <FormRow label={label} valid={!open}>
      <SirListGroup value={value} setValue={setValue} data={refData.lifeCycleStatusOptions} callBack={callBackOpen} />
    </FormRow>
  );
}
