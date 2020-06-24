import React, {useState} from "react"
import FormRow from "../common/FormRow"
import SirAutocomplete from "../common/SirAutocomplete";
// import { useSplatProcessState } from "@splat/splat-react"
// import { useSplatField } from "@splat/splat-react"
import refData from '../../Data/SICS-refdata'

export default function Reinsurer(props) {
  const [value, setValue] = useState({}) //useSplatField('process_Reinsurer')
  // const processState = useSplatProcessState()
  // const reinsurerOptions = processState.ReinsurerOptions  // Name, Code, ReportingUnitCodes

  return (
    <FormRow label={"Reinsurer"}>
      <SirAutocomplete value={value} setValue={setValue} options={refData.reinsurerOptions} />
    </FormRow>
  )
}
