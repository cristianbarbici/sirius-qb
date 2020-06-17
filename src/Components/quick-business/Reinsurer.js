import React from "react"
import FormRow from "../common/FormRow"
import SirAutocomplete from "../common/SirAutocomplete";
import { useSplatProcessState } from "@splat/splat-react"
import { useSplatField } from "@splat/splat-react"

export default function Reinsurer(props) {
  const [value, setValue] = useSplatField('process_Reinsurer')
  const processState = useSplatProcessState()
  const reinsurerOptions = processState.ReinsurerOptions  // Name, Code, ReportingUnitCodes

  return (
    <FormRow label={"Reinsurer"}>
      <SirAutocomplete value={value} setValue={setValue} options={reinsurerOptions} />
    </FormRow>
  )
}
