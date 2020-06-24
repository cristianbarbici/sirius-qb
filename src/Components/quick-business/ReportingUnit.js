import React, { useState, useEffect, useRef } from "react"
import clsx from 'clsx'
import _ from "lodash"
//import SearchIcon from '@material-ui/icons/Search'
import Autocomplete, { createFilterOptions } from '@material-ui/lab/Autocomplete'
import ListSubheader from '@material-ui/core/ListSubheader'
import { makeStyles, useTheme } from "@material-ui/core/styles"
// import { useSplatProcessState } from "@splat/splat-react"
// import { useSplatField } from "@splat/splat-react"
import FormRow from "../common/FormRow"
import SirTextField from "../common/SirTextField"
import SirReadOnlyField from '../common/SirReadOnlyField'
import refData from '../../Data/SICS-refdata'
import reportingUnitOptions from '../../Data/SICS-refdata'
import reinsurerOptions from '../../Data/SICS-refdata'


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
      borderColor: '#b22000'
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

export default function ReportingUnit(props) {
  const label = "Reporting unit"
  const theme = useTheme()
  const classes = useStyles(theme)
  const [value, setValue] = useState({}) //useSplatField("process_ReportingUnit")
  const isValueEmpty = _.isEmpty(value)
  // const processState = useSplatProcessState()
  const ruOptions = refData.reportingUnitOptions //processState.ReportingUnitOptions     // Name, Code, (add Reinsurer {Name, Code})
  const reinsurerOptions = refData.reinsurerOptions // processState.ReinsurerOptions  // Name, Code, ReportingUnitCodes
  
  const [err, setErr] = useState(false)
  const [open, setOpen] = useState(isValueEmpty)          // if there is a value close ...otherwise keep field open for input
  const [inputValue, setInputValue] = useState('')
  const [touched, setTouched] = useState(!isValueEmpty)   // set touched if value is present from back-end
  const [click, setClick] = useState(false)
  const inputRef = useRef(null)

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
  const handleGetOptionLabel = option => option && !isValueEmpty ? option.Name + ' (' + option.Code + ')' : ''

  // determine if option is selected
  const handleGetOptionSelected = option => option && !isValueEmpty ? option.Code === value.Code : false 
  
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
      variant="outlined"
      hiddenLabel
      placeholder={'Search...'}
      onBlur={handleOnBlur}
    />

  const validateValue = React.useCallback(() => {
    if (!_.isEmpty(value)) {
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

    setClick(false)
    validateValue()
  }

  const handleOnChange = (event, value, reson) => {
    // TODO: handle 'clear' differently if inputvalue does not match (?)
    if (_.isObject(value) || _.isNull(value)) {
      setValue(value)
      _.isNull(value) ? setOpen(true) : setOpen(false)
    }
  }

  const handleOnInputChange = (event, value, reson) => {
    if(event && event.keyCode === 13) {
      event.preventDefault()
      // TODO: try to find a match and set that option or set message that there is no match (?)
      setErr(true)
    } else {
      if (value.length === 0)
        setErr(true)
      else
        setErr(false)
      setInputValue(value)
    }
  }

  const handleOnClick = () => setClick(true)
  
  // used to decorate current set-up and will run only when there is no 'reinsurer' object on value
  // TODO: might not be needed if this is set on back-end
  useEffect(() => {
    if (!_.isEmpty(value) && _.isEmpty(value.reinsurer)) {
      setValue(addReinsurer(value));
    } 
  }) //, []) <<-- exaustive error but should be set according to doc to run only once

  // set open state when clicked
  useEffect(() => {
    if (click)
      setOpen(true)
  }, [click, setOpen])

  // focus input onClick
  useEffect(() => {
    if (click && open && inputRef.current) {
      // TODO: fix this hack with React.forwardRef?
      const input = inputRef.current //.querySelectorAll("input[type='text']")[0]
      input.focus()
      input.select()
    }
  }, [click, open])

  // validate when value is changed
  useEffect(() => {
    validateValue()
  }, [value, validateValue])
  

  return (
    <FormRow label={label} error={err} valid={!open}>
      { !open ? 
        <SirReadOnlyField value={handleGetOptionLabel(value)} onClick={handleOnClick} /> :
        <div className={classes.root}>
          <Autocomplete
            autoHighlight
            //openOnFocus
            blurOnSelect  // has an effect
            //popupIcon={<></>}
            size='small'
            className={classes.autocomplete}
            filterOptions={filterOptions}
            options={options}
            groupBy={handleGroupBy}
            //disableClearable={isValueEmpty}
            //freeSolo={isValueEmpty}
            // ref={inputRef}

            renderGroup={handleRenderGroup}
            renderOption={handleRenderOption}
            renderInput={handleRenderInput}

            getOptionLabel={handleGetOptionLabel}
            getOptionSelected={handleGetOptionSelected}

            value={!isValueEmpty ? value : null}
            onChange={handleOnChange}

            inputValue={inputValue}
            onInputChange={handleOnInputChange}
          />
        </div>
      }
    </FormRow>
  );
}
