import React from "react"
import _ from "lodash"
import { makeStyles, useTheme } from '@material-ui/core/styles'
import Radio from "@material-ui/core/Radio"
import RadioGroup from "@material-ui/core/RadioGroup"
import FormControlLabel from "@material-ui/core/FormControlLabel"
import { useSplatField } from "@splat/splat-react"
import { useSplatProcessState } from "@splat/splat-react"
import FormRow from "../common/FormRow"

const maxRadioButtonHeight = 40

export const useStyles = makeStyles((theme) => ({
  radioGroup: {
    width: '100%',
  },
  radioButton: {
    maxHeight: maxRadioButtonHeight + 'px',
    width: '50%',

    '& .MuiFormControlLabel-label': {
      whiteSpace: 'nowrap',
      overflow: 'hidden',
      textOverflow: 'ellipsis'
    }
  }
}));

export default function TypeOfParticipation(props) {
  const label = 'Type of participation method'
  const processState = useSplatProcessState()
  const classes = useStyles();
  const [value, setValue] = useSplatField('process_TypeOfParticipation')
  const typeOfBusiness = processState.process_TypeOfBusiness
  const typeOfParticipationCodes = typeOfBusiness.TypeOfParticipationCodes || []
  const typeOfParticipationOptions = processState.TypeOfParticipationOptions
  const typeOfParticipationOptionsFiltered = _.filter(typeOfParticipationOptions,
    (item) => _.includes(typeOfParticipationCodes, item.Code)
  )
  const amount = typeOfParticipationOptionsFiltered.length
  const maxRadioGroupHeight = maxRadioButtonHeight * (amount + amount % 2) / 2

  const handleChange = (e) => {
    const selected = _.filter(
      typeOfParticipationOptions,
      (item) => item.Code === e.target.value
    )
    setValue(selected)
  }

  return (
    <FormRow label={label}>
      <RadioGroup
        aria-label="Type of participation"
        name="typeOfParticipation"
        className={classes.radioGroup}
        style={{ maxHeight: amount > 3 ? maxRadioGroupHeight : 'unset' }}
        value={value.Code}
        onChange={handleChange}
      >
        {_.map(
          _.orderBy(typeOfParticipationOptionsFiltered, 'Name'),
          function (el) {
            return (
              <FormControlLabel
                className={classes.radioButton}
                key={el.Code}
                value={el.Code}
                control={<Radio />}
                label={el.Name || '(None)'}
              />
            );
          }
        )}
      </RadioGroup>
    </FormRow>
  );
}
