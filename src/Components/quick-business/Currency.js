import React, { useState } from 'react'
import _ from 'lodash'
import { makeStyles } from "@material-ui/core/styles"
import SirField from '../common/SirField'
import { useSplatField } from '@splat/splat-react'
import { useSplatProcessState } from '@splat/splat-react'
import Autocomplete, { createFilterOptions } from '@material-ui/lab/Autocomplete'
import SirTextField from '../common/SirTextField'
import SirReadOnlyField from '../common/SirReadOnlyField'
import SirButtonGroup from '../common/SirButtonGroup'
import {SPLATFIELD} from './splat/vars'
import CtrlActions from './ctrls/CtrlActions'

export const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    display: 'flex',
    alignItems: 'center'
  },
  autocomplete: {
    marginLeft: theme.spacing(3),
    flex: 1
  },
  option: {
    fontSize: theme.typography.pxToRem(14)
  }
}));

export default function Currency(props) {
  const label = 'Main currency'
  const classes = useStyles();
  
  const [value, setValue] = useSplatField(SPLATFIELD.CURRENCY)
  const hasValue = !_.isEmpty(value)
  const [open, setOpen] = useState(!hasValue)

  const processState = useSplatProcessState()
  const mainCurrencyOptions = processState.MainCurrencyOptions
  const commonCurrency = processState.CommonCurrency
  const editMode = open && hasValue
  const untouched = open && !hasValue

  const filterOptions = createFilterOptions({ stringify: (option) => option.Name + ' ' + option.Code })
  const handleRenderInput = params => <SirTextField {...params} placeholder='Search...' />
  const handleGetOptionLabel = option => hasValue ? option.Code : ''
  const handleGetOptionSelected = option => option && hasValue ? option.Code === value.Code : false
  const handleRenderOption = option => <div className={classes.option}>{option.Code}</div>
  const handleOpen = () => setOpen(!open)
  const handleAutocompleteChange = (event, value, reson) => {
    setValue(value)
    _.isEmpty(value) ? setOpen(true) : handleOpen()
  }
  const handleOnClick = (currency) => {
    setValue({Code: currency})
    handleOpen()
  }
  
  
  return (
    <SirField label={label} valid={!open} hint={untouched ? 'Select an option' : (editMode ? 'Select to close' : null)}>
      {!open ?
        <SirReadOnlyField value={value.Code || ''} onClick={handleOpen} /> :
        <div className={classes.root}>
          <SirButtonGroup data={commonCurrency} value={value} callbackClick={handleOnClick} />
          <Autocomplete
            // TODO: autoHighlight
            className={classes.autocomplete}
            openOnFocus

            filterOptions={filterOptions}
            options={mainCurrencyOptions}
            renderInput={handleRenderInput}
            renderOption={handleRenderOption}
            getOptionLabel={handleGetOptionLabel}
            getOptionSelected={handleGetOptionSelected}
            onChange={handleAutocompleteChange}
            value={hasValue ? value : null}
          />
          { editMode &&             
            <CtrlActions
              titleClear='Clear currency and start over' 
              callbackClear={() => setValue({})} 
              titleOk='Close edit mode' 
              callbackOk={() => setOpen(false)} 
            /> 
          }
        </div>
      }
    </SirField>
  );
}
