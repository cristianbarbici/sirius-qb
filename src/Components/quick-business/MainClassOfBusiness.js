import React, {useState} from "react"
import { useSplatField } from "@splat/splat-react"
import { useSplatProcessState } from "@splat/splat-react"
import FormRow from "../common/FormRow"
import SirListGroup from "../common/SirListGroup"
import refData from '../../Data/SICS-refdata'

export default function MainClassOfBusiness(props) {
  const label = 'Main class of business'
  const processState = useSplatProcessState()
  const [value, setValue] = useState({}) //useSplatField('process_MainClassOfBusiness')
  //const mainClassOfBusinessOptions = processState.MainClassOfBusinessOptions
  const [open, setOpen] = useState(true)
  const callBackOpen = open => setOpen(open)

  return (
    <FormRow label={label} valid={!open}>
      <SirListGroup value={value} setValue={setValue} data={refData.mainClassOfBusinessOptions} callBack={callBackOpen} />
    </FormRow>
  );
}
