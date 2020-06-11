import React, { useState } from 'react'
import _ from 'lodash'
import clsx from 'clsx'
import { makeStyles } from "@material-ui/core/styles"
import FormRow from '../common/FormRow'
import { useSplatField } from '@splat/splat-react'
import { useSplatProcessState } from '@splat/splat-react'
import Button from '@material-ui/core/Button'
import ButtonGroup from '@material-ui/core/ButtonGroup'
import { hexSecondary, rgbSecondary } from '../../Styles/colors'

import Autocomplete, { createFilterOptions } from '@material-ui/lab/Autocomplete'
import SirTextField from '../common/SirTextField'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import CheckIcon from '@material-ui/icons/Check'
import EditIcon from '@material-ui/icons/Edit'

const bgColor = `rgba(${rgbSecondary}, .12)`
const bgColorHover = `rgba(${rgbSecondary}, .2)`
const borderColor = `rgba(${rgbSecondary}, .38)`

export const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    display: 'flex',
    alignItems: 'center'
  },
  group: {
    margin: 0,

    '& $selected': {
      borderRightColor: borderColor,
    }
  },
  btn: {},
  selected: {
    backgroundColor: bgColor,
    color: hexSecondary,
    borderColor: borderColor,
    '&:hover': {
      backgroundColor: bgColorHover,
    }
  },
  autocomplete: { // not nice hack
    marginLeft: theme.spacing(3),
    flex: 1,

    '& .MuiAutocomplete-inputRoot[class*="MuiOutlinedInput-root"][class*="MuiOutlinedInput-marginDense"]': {
      padding: 0
    },

    '& .MuiAutocomplete-inputRoot[class*="MuiOutlinedInput-root"] .MuiAutocomplete-input:first-child': {
      padding: theme.spacing(1, 2)
    }
  },
  option: {
    fontSize: '14px'
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

export default function Currency(props) {
  const label = 'Main currency'
  const classes = useStyles();
  const processState = useSplatProcessState()
  const [value, setValue] = useSplatField('process_MainCurrency')
  const hasValue = !_.isEmpty(value)
  const [open, setOpen] = useState(!hasValue)
  const mainCurrencyOptions = processState.MainCurrencyOptions
  // TODO: get from somewhere..
  const commonCurrency = [
    {
      Name: "USD",
      Code: "USD",
      Currency: 'US Dollar',
      Order: 1
    },
    {
      Name: "SEK",
      Code: "SEK",
      Currency: 'Swedish Krona',
      Order: 2
    },
    {
      Name: "EUR",
      Code: "EUR",
      Currency: 'Euro',
      Order: 3
    },
  ]
  
  const commonButton = (currency) => {
    return (
      <Button
        key={currency.Code}
        className={clsx(classes.btn, { [classes.selected]: hasValue && currency.Code === value.Code })}
        onClick={() => handleButtonChange(currency)}
      >
        {currency.Code}
      </Button>
    )
  }

  const handleRenderInput = (params) => <SirTextField {...params} variant="outlined" hiddenLabel />
  const handleGetOptionLabel = (option) => hasValue ? option.Code : ''
  const handleGetOptionSelected = (option) => hasValue ? option.Code === value.Code : false
  const handleRenderOption = (option) => <div className={classes.option}>{option.Code}</div>
  const handleAutocompleteChange = (event, value, reson) => {
    setValue(value)
    _.isEmpty(value) ? setOpen(true) : handleOpen()
  }
  const handleButtonChange = (currency) => {
    setValue(currency)
    handleOpen()
  }
  const handleOpen = () => setOpen(!open)

  return (
    <FormRow label={label}>
      {!open ?
        <ListItem dense button className={clsx(classes.item, classes.editable)} onClick={handleOpen}>
          <ListItemText primary={value.Code || '(None)'} />
          <EditIcon className={classes.editIcon} />
          <CheckIcon className={classes.validIcon} />
        </ListItem> :
        <div className={classes.root}>
          <ButtonGroup className={classes.group}>
            {_.map(commonCurrency, curr => commonButton(curr))}
          </ButtonGroup>
          <Autocomplete
            size='small'
            className={classes.autocomplete}
            openOnFocus
            popupIcon={<></>}
            options={mainCurrencyOptions}
            disableClearable={!hasValue}
            freeSolo={!hasValue}
            renderInput={handleRenderInput}
            renderOption={handleRenderOption}
            getOptionLabel={handleGetOptionLabel}
            getOptionSelected={handleGetOptionSelected}
            onChange={handleAutocompleteChange}
            value={hasValue ? value : ''}
          />
        </div>
      }
    </FormRow>
  );
}
