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




export const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
  },
  field: {
    width: "100%",
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

  const handleChange = (event, value, reson) => {
    setValue(value)
  }

  const filterOptions = createFilterOptions({
    stringify: (option) =>
      option.reinsurer.Code + ' ' + option.reinsurer.Name + ' ' + option.Name + ' ' + option.Code,
  })

  // run only once, disregard console warning react-hooks/exhaustive-deps
  useEffect(() => {
    if (!value.reinsurer) {
      setValue(addReinsurer(value));
    }
  }, [])

  // TODO: needed if to add some styling to subheader or other values
  const handleRenderGroup = (props) => {
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

  return (
    <FormRow label={label}>
      <div className={classes.root}>
        <Autocomplete
          debug
          openOnFocus
          options={options}
          filterOptions={filterOptions}
          groupBy={option => option.reinsurer.Name + ';' + option.reinsurer.Code}
          getOptionLabel={option => option.Name + ' (' + option.Code + ')'}
          getOptionSelected={option => option && value ? option.Code === value.Code : false}
          renderInput={(params) => <TextField {...params} variant="filled" />} // helperText={value.reinsurer && value.reinsurer.Name}
          renderOption={option => <div><span>{option.Name}</span><span className={classes.optionCode}>({option.Code})</span></div>}
          renderGroup={handleRenderGroup}
          onChange={handleChange}
          value={value}
        />
      </div>
    </FormRow>
  );
}
