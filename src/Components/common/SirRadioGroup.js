import React, { useState, useEffect } from 'react'
import _ from 'lodash'
import { makeStyles } from '@material-ui/core/styles'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import Radio from '@material-ui/core/Radio'
import RadioGroup from '@material-ui/core/RadioGroup'

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
  },
  selected: {
    fontSize: '1rem',
    paddingLeft: theme.spacing(.5),
  }
}));

export default function SirRadioGroup(props) {
  const { data, value, setValue } = props
  const hasValue = !_.isEmpty(value)
  const classes = useStyles()
  const [open, setOpen] = useState(hasValue)
  const amount = data.length
  const maxRadioGroupHeight = maxRadioButtonHeight * (amount + amount % 2) / 2

  const handleChange = (e) => {
    const selected = _.head(_.filter(
      data,
      (item) => item.Code === e.target.value
    ))
    setValue(selected)
    setOpen(!open)
  }

  return (
    open ? 
      <div role="button" className={classes.selected} onClick={() => setOpen(!open)}>{value.Name || '(None)'}</div> : 
      <RadioGroup
        className={classes.radioGroup}
        style={{ maxHeight: amount > 3 ? maxRadioGroupHeight : 'unset' }}
        value={value.Code || ''}
        onChange={handleChange}
      >
        {_.map(
          _.orderBy(data, 'Name'),
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
  )
}