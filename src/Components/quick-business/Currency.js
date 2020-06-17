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
import SirReadOnlyField from '../common/SirReadOnlyField'

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
  }
}));

export default function Currency(props) {
  const label = 'Main currency'
  const classes = useStyles();
  const processState = useSplatProcessState()
  const [value, setValue] = useSplatField('process_MainCurrency')
  const hasValue = !_.isEmpty(value)
  const [open, setOpen] = useState(!hasValue)
  const mainCurrencyOptions = processState.MainCurrencyOptions
  // TODO: get from back-end
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

  const filterOptions = createFilterOptions({
    stringify: (option) => option.Name + ' ' + option.Code
  })

  const handleRenderInput = params => <SirTextField {...params} variant="outlined" hiddenLabel placeholder='Search...' />
  const handleGetOptionLabel = option => hasValue ? option.Code : ''
  const handleGetOptionSelected = option => option && hasValue ? option.Code === value.Code : false
  const handleRenderOption = option => <div className={classes.option}>{option.Code}</div>
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
        <SirReadOnlyField value={value.Code || ''} onClick={handleOpen} /> :
        <div className={classes.root}>
          <ButtonGroup className={classes.group}>
            {_.map(commonCurrency, curr => commonButton(curr))}
          </ButtonGroup>
          <Autocomplete
            size='small'
            className={classes.autocomplete}
            openOnFocus
            filterOptions={filterOptions}
            options={mainCurrencyOptions}
            disableClearable={!hasValue}
            freeSolo={!hasValue}
            
            renderInput={handleRenderInput}
            renderOption={handleRenderOption}
            getOptionLabel={handleGetOptionLabel}
            getOptionSelected={handleGetOptionSelected}
            onChange={handleAutocompleteChange}
            value={value}
          />
        </div>
      }
    </FormRow>
  );
}
