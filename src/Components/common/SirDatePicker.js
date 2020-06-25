import React from "react"
import clsx from 'clsx'
import { makeStyles } from "@material-ui/core/styles"
import { DesktopDatePicker, LocalizationProvider } from "@material-ui/pickers"
import MomentUtils from '@material-ui/pickers/adapter/moment'
import SirTextField from './SirTextField'

export const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    alignItems: "center",
    maxWidth: theme.spacing(18),
    position: 'relative',

    '& .MuiInputAdornment-positionEnd': {
      position: 'absolute',
      right: theme.spacing(1),
      transform: 'scale(.85)',
      opacity: .6,
      '&:hover': {
        opacity: 1
      }
    }
  },
  fullWidth: {
    maxWidth: 'unset'
  }
}));

// common ctrl depends on parent control to bind
export default function SirDatePicker(props) {
  const { 
    inputRef,
    error, 
    onEnter,
    fullWidth = false, 
    placeholder,
    value, 
    onChange, 
    onAccept
  } = props
  const classes = useStyles()

  const handleOnKeyDown = (e) => {
    if ((e.key === 'Enter' || e.key === 'Escape') && e.target.value.length > 0)
      onEnter(e.target.value)    
  }

  const renderInput = ({ ref, inputProps, InputProps }) => (
    <div className={clsx(classes.root, {[classes.fullWidth] : fullWidth})} ref={ref}>
      <SirTextField
        inputRef={inputRef} // used to set focus from parent
        error={error}
        onKeyDown={handleOnKeyDown}
        {...inputProps}
      />
      {InputProps?.endAdornment}
    </div>
  )

  return (    
    <LocalizationProvider dateAdapter={MomentUtils}>      
      <DesktopDatePicker
        autoOk
        inputFormat='YYYY-MM-DD'
        mask='____-__-__'
        renderInput={props => renderInput(props)}
        value={value}
        onChange={onChange}
        onAccept={onAccept}
        inputProps={placeholder ? { placeholder: placeholder } : null}
      />
    </LocalizationProvider>
  )
}
