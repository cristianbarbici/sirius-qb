import React, { useState, useEffect, useRef } from "react"
import clsx from 'clsx'
import _ from "lodash"
//import SearchIcon from '@material-ui/icons/Search'
import Autocomplete, { createFilterOptions } from '@material-ui/lab/Autocomplete'
import ListSubheader from '@material-ui/core/ListSubheader'
import { makeStyles, useTheme } from "@material-ui/core/styles"
import { useSplatProcessState } from "@splat/splat-react"
import { useSplatField } from "@splat/splat-react"
import FormRow from "../common/FormRow"
import SirTextField from "../common/SirTextField"
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import CheckIcon from '@material-ui/icons/Check'
import EditIcon from '@material-ui/icons/Edit'

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
  const [value, setValue] = useSplatField("process_ReportingUnit")
  const processState = useSplatProcessState()
  const ruOptions = processState.ReportingUnitOptions // Name, Code, (add Reinsurer {Name, Code})
  const reinsurerOptions = processState.ReinsurerOptions // Name, Code, ReportingUnitCodes
  const [err, setErr] = useState(false)
  const hasValue = !_.isEmpty(value)
  const [open, setOpen] = useState(!hasValue)
  //const inputRef = useRef()


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
    ruOptions.map((option) => addReinsurer(option)),
    [(item) => item.reinsurer.Name]
  )

  const filterOptions = createFilterOptions({
    stringify: (option) =>
      option.reinsurer.Code + ' ' + option.reinsurer.Name + ' ' + option.Name + ' ' + option.Code,
  })

  const isValueEmpty = _.isEmpty(value)
  const handleOnChange = (event, value, reson) => setValue(value)
  const handleOnInputChange = (event, value, reson) => value.length === 0 ? setErr(true) : setErr(false)
  const handleGroupBy = (option) => option.reinsurer.Name + ';' + option.reinsurer.Code                                                    // group label
  const handleGetOptionLabel = (option) => isValueEmpty ? '' : option.Name + ' (' + option.Code + ')'                                             // Used to determine the string value for a given option. It's used to fill the input (and the list box options if renderOption is not provided).
  const handleGetOptionSelected = (option) => isValueEmpty ? false : option.Code === value.Code
  const handleOnBlur = (e) => {
    console.log('handleOnBlur', e)
    if (e.target.value.length === 0) {
      setErr(true)
      setOpen(true)
    } else {
      setErr(false)
      setOpen(false)
    }
  }
  const handleRenderInput = (params) =>
    <SirTextField
      {...params}
      error={err}
      variant="outlined"
      hiddenLabel
      placeholder={'Search...'}
      onBlur={handleOnBlur}
    /> // InputProps={{ startAdornment: <SearchIcon /> }}
  const handleRenderOption = (option) => <div className={classes.option}><span>{option.Name}</span><span className={classes.optionCode}>({option.Code})</span></div>
  const handleRenderGroup = (props) => { // TODO: needed if to add some styling to subheader or other values
    const { key, group, children } = props
    const reinsurer = group.split(';')
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

  // run only once, disregard console warning react-hooks/exhaustive-deps
  useEffect(() => {
    if (!_.isEmpty(value) && !value.reinsurer) {
      setValue(addReinsurer(value));
    }
  }, [])

  // useEffect(() => {
  //   if (open && inputRef.current) { 
  //     inputRef.current.focus()
  //     inputRef.current.select()
  //   }
  // }, [open])

  return (
    <FormRow label={label}>
      {/* {!open && !_.isEmpty(value) ?
        <ListItem dense button className={clsx(classes.item, classes.editable)} onClick={() => setOpen(true)}>
          <ListItemText primary={_.isEmpty(value) ? '' : value} />
          <EditIcon className={classes.editIcon} />
          <CheckIcon className={classes.validIcon} />
        </ListItem> : */}
        <div className={classes.root}>
          <Autocomplete
            //ref={inputRef}
            size='small'
            className={classes.autocomplete}
            openOnFocus
            popupIcon={<></>}
            options={options}
            filterOptions={filterOptions}
            value={isValueEmpty ? '' : value}
            disableClearable={isValueEmpty}
            freeSolo={isValueEmpty}
            onChange={handleOnChange}
            onInputChange={handleOnInputChange}
            groupBy={handleGroupBy}
            getOptionLabel={handleGetOptionLabel}
            getOptionSelected={handleGetOptionSelected}
            renderInput={handleRenderInput}
            renderOption={handleRenderOption}
            renderGroup={handleRenderGroup}
          />
        </div>
      {/* */}
    </FormRow>
  );
}
