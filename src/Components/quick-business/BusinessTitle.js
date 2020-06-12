import React, { useState, useEffect, useRef } from "react"
import _ from 'lodash'
import clsx from 'clsx'
import { makeStyles } from "@material-ui/core/styles"
import { useSplatField } from "@splat/splat-react"
import FormRow from "../common/FormRow"
import SirTextField from "../common/SirTextField"
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import CheckIcon from '@material-ui/icons/Check'
import EditIcon from '@material-ui/icons/Edit'

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
      borderColor: '#b22000'
    }
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
}))

export default function BusinessTitle(props) {
  const label = "Business title";
  const maxLength = 40; // TODO: might be set from server
  const classes = useStyles()
  const [value, setValue] = useSplatField("process_BusinessLayer.BusinessTitle")
  const [count, setCount] = useState(0)
  const [err, setErr] = useState(false)
  const hasValue = !_.isEmpty(value)
  const [open, setOpen] = useState(!hasValue)
  const inputRef = useRef()

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
    <FormRow label={label} className={classes.root}>
      {!open ?
        <ListItem dense button className={clsx(classes.item, classes.editable)} onClick={() => setOpen(true)}>
          <ListItemText primary={value || ''} />
          <EditIcon className={classes.editIcon} />
          <CheckIcon className={classes.validIcon} />
        </ListItem> :
        <SirTextField
          error={err}
          value={value || ''}
          onChange={handleOnChange}
          onBlur={handleOnBlur}
          inputProps={{
            maxLength: maxLength,
          }}
          inputRef={inputRef}
          helperText={<><span>{count}</span> / <span>{maxLength}</span></>}
        />
      }
    </FormRow>
  );
}
