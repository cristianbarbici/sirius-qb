import React, { useRef, useState, useEffect } from "react"
import _ from "lodash"
import Autocomplete from '@material-ui/lab/Autocomplete'
import { makeStyles } from "@material-ui/core/styles"
import SirReadOnlyField from '../common/SirReadOnlyField'
import SirTextField from "./SirTextField"

export const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
  },
  option: {
    fontSize: theme.typography.pxToRem(14)
  }
}))

export default function SirAutocomplete(props) {
  const { value, setValue, options, open, setOpen } = props
  const classes = useStyles()
  const inputRef = useRef(null)
  const hasValue = !_.isEmpty(value)
  const [inputValue, setInputValue] = useState('') // needed to select value when going from read-only to edit mode

  const handleOnClick = () => setOpen(true)
  const handleOnBlur = () => setOpen(!hasValue)
  const handleOnChange = (event, value, reson) => setValue(value)
  const handleOnInputChange = (event, value, reson) => setInputValue(value)
  // TODO: select onEnter
  // TODO: blur? onEscape

  useEffect(() => {
    const input = inputRef.current
    if (open && hasValue && input) {
      input.focus()
      input.select()
    }
  }, [open])

  return (
    <>
      { !open ? 
        <SirReadOnlyField value={value.Name || ''} onClick={handleOnClick} /> :
        <div className={classes.root}>
          <Autocomplete
            // TODO: autoHighlight          
            classes={{ option: classes.option }}
            openOnFocus

            options={options}
            getOptionLabel={(option) => option ? option.Name : ''}
            getOptionSelected={(option) => hasValue ? option.Name === value.Name : false}
            renderInput={(params) => <SirTextField inputRef={inputRef} {...params} placeholder={'Search...'} onBlur={handleOnBlur} />} 
            value={hasValue ? value : null}
            inputValue={inputValue}
            onChange={handleOnChange}
            onInputChange={handleOnInputChange}
          />
        </div>
      }
    </>
  );
}
