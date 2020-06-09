import React, { useEffect } from "react"
import _ from 'lodash'
import TextField from '@material-ui/core/TextField';
import Autocomplete, { createFilterOptions } from '@material-ui/lab/Autocomplete';
import { makeStyles, useTheme } from '@material-ui/core/styles'
import { useProcessState } from "../../SplatComponents/SplProcess"
import { useSplatField } from "../../SplatComponents/SplField";
import FormRow from "../common/FormRow"

export const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%'
  },
  field: {
    width: '100%'
  }
}))

export default function ReportingUnit(props) {
  const label = 'Reporting unit'
  const theme = useTheme()
  const classes = useStyles(theme)
  const [value, setValue] = useSplatField("process_ReportingUnit")

  const processState = useProcessState()
  const ruOptions = processState.ReportingUnitOptions                       // Name, Code, (add Reinsurer {Name, Code})
  const reinsurerOptions = processState.ReinsurerOptions                    // Name, Code, ReportingUnitCodes

  const addReinsurer = (option) => {
    const matchedReinsurer = _.head(_.filter(reinsurerOptions, item => _.includes(item.ReportingUnitCodes, option.Code)))
    const reinsurer = 
      !_.isEmpty(matchedReinsurer) ? 
      { Name: matchedReinsurer.Name, Code: matchedReinsurer.Code } : 
      { Name: 'Missing reinsurer', Code: '' }

    return {
      reinsurer: reinsurer,
      ...option,
    }
  }

  const options = _.sortBy(ruOptions.map((option) => addReinsurer(option)), [item => item.reinsurer.Name])

  const handleChange = (event, value, reson) => {
    setValue(value) // { Name: value.Name, Code: value.Code }
  };

  const filterOptions = createFilterOptions({
    stringify: (option) => option.reinsurer.Name + ' ' + option.Name + ' ' + option.Code
  });

  useEffect(() => {
    if (!value.reinsurer) {
      setValue(addReinsurer(value))
    }
  }, [])

  return (
    <FormRow label={label}>
      <div className={classes.root}>
        <Autocomplete
          openOnFocus
          options={options}
          filterOptions={filterOptions}
          groupBy={option => option.reinsurer.Name}
          getOptionLabel={option => option.Name}
          getOptionSelected={option => option.Code === value.Code}
          renderInput={(params) => <TextField {...params} variant="filled" />} // helperText={value.reinsurer && value.reinsurer.Name}
          renderOption={option => option.Name}
          onChange={handleChange}
          value={value}
        />
      </div>
    </FormRow>
  )
}