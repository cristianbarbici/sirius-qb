import React, { useState, useEffect, useRef } from 'react'
import _ from 'lodash'
import { makeStyles } from '@material-ui/core/styles'
import { useSplatField } from '@splat/splat-react'
import FormRow from '../common/FormRow'
import SirTextField from '../common/SirTextField'
import SirReadOnlyField from '../common/SirReadOnlyField'
import { hexError } from '../../Styles/colors'
import { SPLATFIELD } from './splat/vars'

export const useStyles = makeStyles((theme) => ({
  root: {
    '& .MuiFormHelperText-contained': {
      textAlign: 'right',
      marginRight: theme.spacing(.5),
      color: 'rgba(0,0,0,.24)',
      fontSize: '12px',
      lineHeight: '14px',

      '& span:first-child': {
        color: 'rgba(0,0,0,.6)'
      }
    },

    '& .MuiOutlinedInput-root.Mui-error .MuiOutlinedInput-notchedOutline': {
      borderColor: hexError
    }
  }
}))

export default function BusinessTitle(props) {
  const label = "Business title";
  const maxLength = 40; // TODO: might be set from server
  const classes = useStyles()
  const [value, setValue] = useSplatField(SPLATFIELD.BUSINESSTITLE)
  const [count, setCount] = useState(0)
  const [err, setErr] = useState(false)
  const hasValue = !_.isEmpty(value)
  const [open, setOpen] = useState(!hasValue)
  const inputRef = useRef(null)
  const renderValue = value || ''

  const handleOnChange = (e) => {
    e.target.value.length === 0 ? setErr(true) : setErr(false)
    setValue(e.target.value)
  }

  const handleOnBlur = (e) => {
    if (e.target.value.length === 0) {
      setErr(true)
      setOpen(true)
    } else {
      setErr(false)
      setOpen(false)
    }
  }

  const handleOnKeyDown = (e) => {
    if ((e.key === 'Enter' || e.key === 'Escape') && e.target.value.length > 0) {
      setValue(e.target.value)
      setErr(false)
      setOpen(false)
    }
  }

  useEffect(() => {
    setCount(value.length)
  }, [value])

  useEffect(() => {
    if (open && inputRef.current) {
      inputRef.current.focus()
      inputRef.current.select()
    }
  }, [open])

  return (    
    <FormRow label={label} className={classes.root} error={err} valid={!open}>
      {!open ?
        <SirReadOnlyField value={renderValue} onClick={() => setOpen(!open)} /> :
        <SirTextField
          error={err}
          value={renderValue}
          onChange={handleOnChange}
          onBlur={handleOnBlur}
          onKeyDown={handleOnKeyDown}
          inputProps={{ maxLength: maxLength }}
          inputRef={inputRef}
          helperText={<><span>{count}</span> / <span>{maxLength}</span></>}
        />
      }
    </FormRow>
  )
}
