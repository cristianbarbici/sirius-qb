import React, {useState} from "react"
import _ from 'lodash'
import SirField from "../../common/SirField"
import SirAutocomplete from "../../common/SirAutocomplete";
import { useSplatField } from "@splat/splat-react"
import { sleep } from '../../../utils/utils'

export default function Reinsurer(props) {
  const { label, splatField, data } = props
  const [value, setValue] = useSplatField(splatField)
  const hasValue = !_.isEmpty(value)
  const [open, setOpen] = useState(!hasValue)
  const [valid, setValid] = useState(!open)

  const callbackSetOpen = (value) => {
    setValid(!value)
    if (value)
      sleep(150).then(() => setOpen(true)) // need to wait a bit in order for the menu to show at the correct place
    else
      setOpen(false)
  }

  const callbackSetValue = (value) => {
    setValue(value)
    setValid(value)
    setOpen(!value)
  }

  return (
    <SirField label={label} valid={valid}>
      <SirAutocomplete value={value} setValue={callbackSetValue} options={data} open={open} setOpen={callbackSetOpen} />
    </SirField>
  )
}
