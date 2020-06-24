import React, {useState} from "react"
import _ from "lodash"
import { useSplatField } from "@splat/splat-react"
// import { useSplatProcessState } from "@splat/splat-react"
import FormRow from "../common/FormRow"
import SirListGroup from "../common/SirListGroup"
import processState from '../../Data/SICS-refdata'

export default function TypeOfParticipation(props) {
  const { typeOfBusiness } = props
  const label = 'Type of participation method'
  // const processState = useSplatProcessState()
  const [value, setValue] = useState({}) //useSplatField('process_TypeOfParticipation')
  // const typeOfBusiness = processState.process_TypeOfBusiness
  const typeOfParticipationCodes = typeOfBusiness.TypeOfParticipationCodes || []
  const typeOfParticipationOptions = processState.typeOfParticipationOptions
  const typeOfParticipationOptionsFiltered = _.filter(typeOfParticipationOptions,
    (item) => _.includes(typeOfParticipationCodes, item.Code)
  )

  const [open, setOpen] = useState(true)
  const callBackOpen = open => setOpen(open)

  return (
    <FormRow label={label} valid={!open}>
      <SirListGroup value={value} setValue={setValue} data={typeOfParticipationOptionsFiltered} callBack={callBackOpen} />
    </FormRow>
  );
}
