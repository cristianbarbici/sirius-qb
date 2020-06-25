import React, { useRef, useState, useEffect } from "react"
import _ from "lodash"
//import SearchIcon from '@material-ui/icons/Search'
import Autocomplete from '@material-ui/lab/Autocomplete'
import { makeStyles } from "@material-ui/core/styles"
import SirReadOnlyField from '../common/SirReadOnlyField'
import SirTextField from "./SirTextField"
import { hexError } from "../../Styles/colors"

export const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
  },
  autocomplete: { // not nice hack
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
  reinsurer: {
    display: 'flex',
    alignItems: 'center',
    lineHeight: 1.43,
    fontSize: '12px',
    padding: theme.spacing(2, 1, 1, 1)
  },
  reinsurerCode: {
    fontWeight: 400,
    color: 'rgba(0,0,0,.38)',
    marginRight: theme.spacing(1)
  },
  reinsurerName: {
    flex: 1,
  },
  reinsurerAmount: {
    fontWeight: 400,
    color: 'rgba(0,0,0,.24)'
  },
  option: {
    fontSize: '14px'
  },
  optionName: {},
  optionCode: {
    marginLeft: theme.spacing(1),
    color: 'rgba(0,0,0,.38)'
  },
  item: {
    display: 'inline-flex',
    width: `calc(50% - ${theme.spacing(1)}px)`,
    borderRadius: 3,
    border: 'solid 1px rgba(0,0,0,.06)',
    margin: theme.spacing(.5),

    '& .MuiListItemText-root .MuiListItemText-primary': {
      whiteSpace: 'nowrap',
      overflow: 'hidden',
      textOverflow: 'ellipsis'
    },

    '& .MuiSvgIcon-root': {
      opacity: 0,
      color: 'rgba(0,0,0,.24)',
      fontSize: '1.25rem',
      transition: 'opacity 200ms cubic-bezier(0.4, 0, 0.2, 1)'
    }
  },
  validIcon: {
    opacity: 0
  },
  editIcon: {
    opacity: 0,
    marginRight: theme.spacing(1)
  },
  editable: {
    width: '100%',
    backgroundColor: 'rgba(0,0,0,.02)',
    margin: 0,

    '& $validIcon': {
      opacity: 1
    },

    '& $editIcon': {
      opacity: 0
    },

    '&:hover': {
      '& $editIcon': {
        opacity: 1
      }
    }
  },
}));


// TODO: props where options = [{ Name, Code }]
export default function SirAutocomplete(props) {
  const { value, setValue, options } = props              // TODO: required, group?
  const classes = useStyles()
  const inputRef = useRef(null)
  const isEmpty = _.isEmpty(value)
  const [open, setOpen] = useState(isEmpty)               // if there is a value close ...otherwise keep field open for input
  const [click, setClick] = useState(false)

  const validateValue = React.useCallback(() => {
    if (!_.isEmpty(value)) {
      setOpen(false)
    } else {
      setOpen(true)
    }
  }, [value])

  const handleOnClick = () => setClick(true)
  const handleOnBlur = (e) => {
    setClick(false)
    validateValue()
  }

  const handleOnChange = (event, value, reson) => {
    setValue(value)
    if (!_.isEmpty(value)) {
      setOpen(false)
      setClick(false)
    }
  }

  useEffect(() => {
    if (click)
      setOpen(true)
  }, [click, setOpen])

  useEffect(() => {
    if (click && open && inputRef.current) {
      // TODO: fix this hack with React.forwardRef?
      const input = inputRef.current //.querySelectorAll("input[type='text']")[0]
      input.focus()
      input.select()
    }
  }, [click, open])

  return (
    <>
      { !open ? 
        <SirReadOnlyField value={value.Name || ''} onClick={handleOnClick} /> :
        <div className={classes.root}>
          <Autocomplete
            autoHighlight
            openOnFocus
            //blurOnSelect  // does not select all input value for some reason
            size='small'
            className={classes.autocomplete}
            popupIcon={<></>}
            options={options}
            getOptionLabel={(option) => option ? option.Name : ''}
            getOptionSelected={(option) => !isEmpty ? option.Name === value.Name : false}
            renderInput={(params) => <SirTextField inputRef={inputRef} {...params} placeholder={'Search...'} onBlur={handleOnBlur} />} // variant and hiddenLabel is already true..
            value={!isEmpty ? value : null}
            onChange={handleOnChange}
          />
        </div>
      }
    </>
  );
}
