import React from "react"
import _ from "lodash"
import { useSplatField } from "@splat/splat-react"
import { useSplatProcessState } from "@splat/splat-react"
import FormRow from "../common/FormRow"
import SirListGroup from "../common/SirListGroup"

export default function TypeOfParticipation(props) {
  const label = 'Type of participation method'
  const processState = useSplatProcessState()
  const [value, setValue] = useSplatField('process_TypeOfParticipation')
  const typeOfBusiness = processState.process_TypeOfBusiness
  const typeOfParticipationCodes = typeOfBusiness.TypeOfParticipationCodes || []
  const typeOfParticipationOptions = processState.TypeOfParticipationOptions
  const typeOfParticipationOptionsFiltered = _.filter(typeOfParticipationOptions,
    (item) => _.includes(typeOfParticipationCodes, item.Code)
  )

  return (
    <FormRow label={label}>
      <SirListGroup value={value} setValue={setValue} data={typeOfParticipationOptionsFiltered} />
    </FormRow>
  );
}
