import React, { useState, useEffect, useRef } from "react"
import clsx from 'clsx'
import _ from "lodash"
import Autocomplete, { createFilterOptions } from '@material-ui/lab/Autocomplete'
import ListSubheader from '@material-ui/core/ListSubheader'
import { makeStyles, useTheme } from "@material-ui/core/styles"
import { useSplatProcessState } from "@splat/splat-react"
import { useSplatField } from "@splat/splat-react"
import SirField from "../common/SirField"
import SirTextField from "../common/SirTextField"
import SirReadOnlyField from '../common/SirReadOnlyField'
import {SPLATFIELD} from './splat/vars'
import { sleep } from '../../utils/utils'

export const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
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
    fontSize: theme.typography.pxToRem(14)
  },
  optionName: {},
  optionCode: {
    marginLeft: theme.spacing(1),
    color: 'rgba(0,0,0,.38)'
  },
}))

export default function ReportingUnit(props) {
  const label = "Reporting unit"
  const theme = useTheme()
  const classes = useStyles(theme)
  const [value, setValue] = useSplatField(SPLATFIELD.REPORTINGUNIT)
  const hasValue = !_.isEmpty(value)
  const processState = useSplatProcessState()
  const ruOptions = processState.ReportingUnitOptions     // Name, Code, (add Reinsurer {Name, Code})
  const reinsurerOptions = processState.ReinsurerOptions  // Name, Code, ReportingUnitCodes
  
  const [err, setErr] = useState(false)                   // since this is a required field
  const [open, setOpen] = useState(!hasValue)             // if there is a value close ...otherwise keep field open for input
  const [valid, setValid] = useState(!open)               // use to set presentation of wrapper
  const [inputValue, setInputValue] = useState('')        // has an impact on the input.select() - if it is not set the value is not selected in field
  const [touched, setTouched] = useState(hasValue)        // set touched if value is present from back-end - needed to not 
  const inputRef = useRef(null)

  // might be solved on server ..
  const addReinsurer = (option) => {
    const matchedReinsurer = _.head(
      _.filter(reinsurerOptions, (item) =>
        _.includes(item.ReportingUnitCodes, option.Code)
      )
    )
    const reinsurer = !_.isEmpty(matchedReinsurer)
      ? { Name: matchedReinsurer.Name, Code: matchedReinsurer.Code }
      : { Name: "Missing reinsurer", Code: "" }

    return {
      reinsurer: reinsurer,
      ...option,
    }
  }

  // might be already sorted ..
  const options = _.sortBy(
    _.map(ruOptions, option => addReinsurer(option)),
    [(item) => item.reinsurer.Name]
  )

  const filterOptions = createFilterOptions({
    stringify: (option) =>
      option.reinsurer.Code + ' ' + option.reinsurer.Name + ' ' + option.Name + ' ' + option.Code,
  })

  // data for group
  const handleGroupBy = option => option.reinsurer.Name + ';' + option.reinsurer.Code

  // rendered group
  const handleRenderGroup = (props) => { // TODO: needed if to add some styling to subheader or other values
    const { key, group, children } = props
    const reinsurer = group.split(';') // TODO: might be nice with a not so hacky solution
    return <li key={key}>
      <ListSubheader className={clsx(classes.reinsurer, 'MuiAutocomplete-groupLabel')} component='div'>
        <span className={classes.reinsurerCode}>{_.tail(reinsurer)}</span>
        <span className={classes.reinsurerName}>{_.head(reinsurer)}</span>
        <span className={classes.reinsurerAmount}>({children.length})</span>
      </ListSubheader>
      <ul className='MuiAutocomplete-groupUl'>
        {_.map(children, child => <li key={child.key} {...child.props}>{child.props.children}</li>)}
      </ul>
    </li>
  }
 
  // string value for a given option. It's used to fill the input (and the list box options if renderOption is not provided).
  // used for input display value
  const handleGetOptionLabel = option => option && hasValue ? option.Name + ' (' + option.Code + ')' : ''

  // determine if option is selected
  const handleGetOptionSelected = option => option && hasValue ? option.Code === value.Code : false 
  
  // render option element in list
  const handleRenderOption = option => 
    <div className={classes.option}>
      <span>{option.Name}</span><span className={classes.optionCode}>({option.Code})</span>
    </div>

  const handleRenderInput = params => 
    <SirTextField
      {...params}
      inputRef={inputRef}
      error={err}
      placeholder={'Search...'}
      onBlur={handleOnBlur}
    />

  const validateValue = React.useCallback(() => {
    if (!_.isEmpty(value)) {
      setValid(true)
      setOpen(false)
      setErr(false)
    } else {
      setOpen(true)
      if (touched)
        setErr(true)
    }
  }, [value, touched])

  const handleOnBlur = (e) => {
    if (!touched)
      setTouched(true)

    validateValue()
  }

  const handleOnChange = (event, value, reson) => {
    // TODO: handle 'clear' differently if inputvalue does not match (?)
    if (_.isObject(value) || _.isNull(value)) {
      setValue(value)
      _.isNull(value) ? setOpen(true) : setOpen(false)
    }
  }

  // changes when the input value changes from user key input
  // TODO: catch Enter and Escape (?)
  const handleOnInputChange = (event, value, reson) => {
    if (value.length === 0)
      setErr(true)
    else
      setErr(false)
    setInputValue(value)
  }

  // triggered when user clicks the read-only field
  const handleOnClick = () => {
    setValid(false)
    sleep().then(() => setOpen(true))
  }
  
  // used to decorate current set-up and will run only when there is no 'reinsurer' object on value
  // TODO: might not be needed if this is set on back-end
  useEffect(() => {
    if (!_.isEmpty(value) && _.isEmpty(value.reinsurer)) {
      setValue(addReinsurer(value));
    } 
  }) //, []) <<-- exaustive error but should be set according to doc to run only once

  // focus input value when ctrl is in edit mode
  useEffect(() => {
    const input = inputRef.current
    if (hasValue && open && input) {
      input.focus()
      input.select()
    }
  }, [open])

  // validate when value is changed
  useEffect(() => {
    validateValue()
  }, [value, validateValue])
  

  return (
    <SirField label={label} error={err} valid={valid}>
      { !open ? 
        <SirReadOnlyField value={handleGetOptionLabel(value)} onClick={handleOnClick} /> :
        <div className={classes.root}>
          <Autocomplete
            // TODO: autoHighlight
            blurOnSelect  // has an effect .. explain why this is needed
            openOnFocus

            filterOptions={filterOptions}
            options={options}
            groupBy={handleGroupBy}
            renderGroup={handleRenderGroup}
            renderOption={handleRenderOption}
            renderInput={handleRenderInput}
            getOptionLabel={handleGetOptionLabel}
            getOptionSelected={handleGetOptionSelected}
            value={hasValue ? value : null}
            onChange={handleOnChange}
            inputValue={inputValue}
            onInputChange={handleOnInputChange}
          />
        </div>
      }
    </SirField>
  );
}
