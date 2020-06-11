import React, { useEffect } from "react"
import clsx from 'clsx'
import _ from "lodash"
import TextField from "@material-ui/core/TextField"
import Autocomplete, { createFilterOptions } from "@material-ui/lab/Autocomplete"
import ListSubheader from '@material-ui/core/ListSubheader'
import { makeStyles, useTheme } from "@material-ui/core/styles"
import { useSplatProcessState } from "@splat/splat-react"
import { useSplatField } from "@splat/splat-react"
import FormRow from "../common/FormRow"
import SirTextField from "../common/SirTextField"

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
    }
  },
  reinsurer: {
    display: 'flex',
    alignItems: 'center'
  },
  reinsurerName: {},
  reinsurerCode: {
    marginLeft: theme.spacing(1),
    fontWeight: 400,
    flex: 1,
    color: 'rgba(0,0,0,.38)'
  },
  reinsurerAmount: {
    color: 'rgba(0,0,0,.24)'
  },
  option: {},
  optionName: {},
  optionCode: {
    marginLeft: theme.spacing(1),
    color: 'rgba(0,0,0,.38)'
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

  const handleChange = (event, value, reson) => {
    setValue(value)
  }



  const isValueEmpty = _.isEmpty(value)

  const handleGroupBy = (option) => option.reinsurer.Name + ';' + option.reinsurer.Code                                                    // group label
  const handleGetOptionLabel = (option) => isValueEmpty ? '' : option.Name + ' (' + option.Code + ')'                                             // Used to determine the string value for a given option. It's used to fill the input (and the list box options if renderOption is not provided).
  const handleGetOptionSelected = (option) => isValueEmpty ? false : option.Code === value.Code
  const handleRenderInput = (params) => <SirTextField {...params} variant="outlined" hiddenLabel />
  const handleRenderOption = (option) => <div><span>{option.Name}</span><span className={classes.optionCode}>({option.Code})</span></div>
  const handleRenderGroup = (props) => { // TODO: needed if to add some styling to subheader or other values
    const { key, group, children } = props
    const reinsurer = group.split(';')
    return <li key={key}>
      <ListSubheader className={clsx(classes.reinsurer, 'MuiAutocomplete-groupLabel')} component='div'>
        <span className={classes.reinsurerName}>{_.head(reinsurer)}</span>
        <span className={classes.reinsurerCode}>({_.tail(reinsurer)})</span>
        <span className={classes.reinsurerAmount}>#{children.length}</span>
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

  return (
    <FormRow label={label}>
      <div className={classes.root}>
        <Autocomplete
          debug
          size='small'
          className={classes.autocomplete}
          openOnFocus
          options={options}
          filterOptions={filterOptions}
          value={isValueEmpty ? '' : value}
          disableClearable={isValueEmpty}
          freeSolo={isValueEmpty}
          forcePopupIcon
          onChange={handleChange}
          groupBy={handleGroupBy}
          getOptionLabel={handleGetOptionLabel}
          getOptionSelected={handleGetOptionSelected}
          renderInput={handleRenderInput}
          renderOption={handleRenderOption}
          renderGroup={handleRenderGroup}
        />
      </div>
    </FormRow>
  );
}
