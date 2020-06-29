import React, { useRef, useState, useEffect } from "react"
import _ from "lodash"
import Autocomplete from '@material-ui/lab/Autocomplete'
import { makeStyles } from "@material-ui/core/styles"
import SirReadOnlyField from '../common/SirReadOnlyField'
import SirTextField from "./SirTextField"
import { hexError } from "../../Styles/colors"

export const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
  },
  autocomplete: { // ugly hack
    '& .MuiAutocomplete-inputRoot[class*="MuiOutlinedInput-root"][class*="MuiOutlinedInput-marginDense"]': {
      padding: 0
    },

    '& .MuiAutocomplete-inputRoot[class*="MuiOutlinedInput-root"] .MuiAutocomplete-input:first-child': {
      padding: theme.spacing(1, 2)
    },

    '& .MuiOutlinedInput-root.Mui-error .MuiOutlinedInput-notchedOutline': {
      borderColor: hexError
    }
  },
  option: {
    fontSize: theme.typography.pxToRem(14)
  },
}))


export default function SirAutocomplete(props) {
  const { value, setValue, options, open, setOpen } = props
  const classes = useStyles()
  const inputRef = useRef(null)
  const isEmpty = _.isEmpty(value)

  const validateValue = React.useCallback(() => {
    if (!isEmpty)
      setOpen(false)
    else
      setOpen(true)
  }, [value])

  const handleOnClick = () => setOpen(true)
  const handleOnBlur = () => validateValue()
  const handleOnChange = (event, value, reson) => setValue(value)

  useEffect(() => {
    const input = inputRef.current
    if (open && !isEmpty && input) {
      input.focus()
      input.select() // why dis do not wrk!?
    }
  }, [open])

  return (
    <>
      { !open ? 
        <SirReadOnlyField value={value.Name || ''} onClick={handleOnClick} /> :
        <div className={classes.root}>
          <Autocomplete
            className={classes.autocomplete}            
            classes={{ option: classes.option }}
            // TODO: autoHighlight
            openOnFocus
            size='small'

            options={options}
            getOptionLabel={(option) => option ? option.Name : ''}
            getOptionSelected={(option) => !isEmpty ? option.Name === value.Name : false}
            renderInput={(params) => <SirTextField inputRef={inputRef} {...params} placeholder={'Search...'} onBlur={handleOnBlur} />} 
            value={!isEmpty ? value : null}
            onChange={handleOnChange}
          />
        </div>
      }
    </>
  );
}
