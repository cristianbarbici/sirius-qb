import React from "react"
import Switch from "@material-ui/core/Switch"
import { useSplatField } from "@splat/splat-react"
import FormRow from "../common/FormRow"

export default function IsCoinsurance(props) {
  const [value, setValue] = useSplatField("process_IsCoinsurance")
  //const [valueTOB] = useSplatField('process_TypeOfBusiness')

  //if (_.isEmpty(valueTOB) || valueTOB.Code === 'DIRECT' || valueTOB.Code === 'NONPROPDIR')
  //  return null

  const handleChange = (e) => {
    setValue(!value);
  }

  return (
    <FormRow label={"Is coinsurance"}>
      <Switch size='small' checked={value} onChange={handleChange} />
    </FormRow>
  )
}
