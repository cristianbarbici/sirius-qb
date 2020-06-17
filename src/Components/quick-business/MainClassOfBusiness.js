import React from "react"
import { useSplatField } from "@splat/splat-react"
import { useSplatProcessState } from "@splat/splat-react"
import FormRow from "../common/FormRow"
import SirListGroup from "../common/SirListGroup"

export default function MainClassOfBusiness(props) {
  const label = 'Main class of business'
  const processState = useSplatProcessState()
  const [value, setValue] = useSplatField('process_MainClassOfBusiness')
  const mainClassOfBusinessOptions = processState.MainClassOfBusinessOptions

  return (
    <FormRow label={label}>
      <SirListGroup value={value} setValue={setValue} data={mainClassOfBusinessOptions} />
    </FormRow>
  );
}
