import React, {useState, useEffect} from "react"
import _ from "lodash"
import { useSplatField } from "@splat/splat-react"
import { useSplatProcessState } from "@splat/splat-react"
import SirField from "../common/SirField"
import SirListGroup from "../common/SirListGroup"
import {SPLATFIELD} from './splat/vars'

export default function TypeOfParticipation(props) {
  const label = 'Type of participation method'
  const processState = useSplatProcessState()
  const [value, setValue] = useSplatField(SPLATFIELD.TYPEOFPARTICIPATION)
  const hasValue = !_.isEmpty(value)
  const typeOfBusiness = processState.process_TypeOfBusiness
  const typeOfParticipationCodes = typeOfBusiness.TypeOfParticipationCodes || []
  const typeOfParticipationOptions = processState.TypeOfParticipationOptions
  const typeOfParticipationOptionsFiltered = _.filter(typeOfParticipationOptions,
    (item) => _.includes(typeOfParticipationCodes, item.Code)
  )
  const [open, setOpen] = useState(!hasValue)
  const editMode = open && hasValue
  const untouched = open && !hasValue

  // needed for when type-of-business is reset
  useEffect(() => {
    if (!hasValue)
      setOpen(true)
  }, [value])

  return (
    <SirField label={label} valid={!open} hint={untouched ? 'Select an option' : (editMode ? 'Select to close' : null)}>
      <SirListGroup value={value} setValue={setValue} data={typeOfParticipationOptionsFiltered} open={open} setOpen={setOpen} />
    </SirField>
  );
}
