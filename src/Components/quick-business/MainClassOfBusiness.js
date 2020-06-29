import React, {useState} from "react"
import _ from 'lodash'
import { useSplatField } from "@splat/splat-react"
import { useSplatProcessState } from "@splat/splat-react"
import SirField from "../common/SirField"
import SirListGroup from "../common/SirListGroup"
import {SPLATFIELD} from './splat/vars'

export default function MainClassOfBusiness(props) {
  const label = 'Main class of business'
  const processState = useSplatProcessState()
  const [value, setValue] = useSplatField(SPLATFIELD.MAINCLASSOFBUSINESS)
  const hasValue = !_.isEmpty(value)
  const mainClassOfBusinessOptions = processState.MainClassOfBusinessOptions
  const [open, setOpen] = useState(true)
  const editMode = open && hasValue
  const untouched = open && !hasValue

  return (
    <SirField label={label} valid={!open} hint={untouched ? 'Select an option' : (editMode ? 'Select to close' : null)}>
      <SirListGroup value={value} setValue={setValue} data={mainClassOfBusinessOptions} open={open} setOpen={setOpen} />
    </SirField>
  );
}
