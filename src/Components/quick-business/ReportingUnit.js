import React, { useEffect } from "react";
import _ from "lodash";
import TextField from "@material-ui/core/TextField";
import Autocomplete, {
  createFilterOptions,
} from "@material-ui/lab/Autocomplete";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import { useSplatProcessState } from "@splat/splat-react";
import { useSplatField } from "@splat/splat-react";
import FormRow from "../common/FormRow";

import ListSubheader from '@material-ui/core/ListSubheader';
import List from '@material-ui/core/List';

export const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
  },
  field: {
    width: "100%",
  },
}));

export default function ReportingUnit(props) {
  const label = "Reporting unit";
  const theme = useTheme();
  const classes = useStyles(theme);
  const [value, setValue] = useSplatField("process_ReportingUnit");

  const processState = useSplatProcessState();
  const ruOptions = processState.ReportingUnitOptions; // Name, Code, (add Reinsurer {Name, Code})
  const reinsurerOptions = processState.ReinsurerOptions; // Name, Code, ReportingUnitCodes

  const addReinsurer = (option) => {
    const matchedReinsurer = _.head(
      _.filter(reinsurerOptions, (item) =>
        _.includes(item.ReportingUnitCodes, option.Code)
      )
    );
    const reinsurer = !_.isEmpty(matchedReinsurer)
      ? { Name: matchedReinsurer.Name, Code: matchedReinsurer.Code }
      : { Name: "Missing reinsurer", Code: "" };

    return {
      reinsurer: reinsurer,
      ...option,
    };
  };

  const options = _.sortBy(
    ruOptions.map((option) => addReinsurer(option)),
    [(item) => item.reinsurer.Name]
  );

  const handleChange = (props) => {
    console.log('handleChange', props)
    const { event, value, reson } = props
    setValue(value) // { Name: value.Name, Code: value.Code }
  };

  const filterOptions = createFilterOptions({
    stringify: (option) =>
      option.reinsurer.Name + " " + option.Name + " " + option.Code,
  });

  useEffect(() => {
    if (!value.reinsurer) {
      setValue(addReinsurer(value));
    }
  }, []);


  const handleRenderGroup = (props) => {
    const { key, group, children } = props;
    console.log(children);
    return <li key={key}>
      <ListSubheader component='div'>{group}</ListSubheader>
    </li>
    
    {/*
    
      <div class="MuiListSubheader-root MuiListSubheader-sticky MuiListSubheader-gutters">Geoforma</div>
      <div class="MuiListSubheader-root MuiAutocomplete-groupLabel MuiListSubheader-sticky MuiListSubheader-gutters">Boink</div>

      .MuiAutocomplete-groupLabel
      top: -8px;
      background-color: #fff;
    */}
  }

  return (
    <FormRow label={label}>
      <div className={classes.root}>
        <Autocomplete
          debug
          openOnFocus
          options={options}
          filterOptions={filterOptions}
          groupBy={(option) => option.reinsurer.Name}
          getOptionLabel={(option) => option.Name}
          getOptionSelected={(option) => option.Code === value.Code}
          renderInput={(params) => <TextField {...params} variant="filled" />} // helperText={value.reinsurer && value.reinsurer.Name}
          renderOption={option => option.Name}
          //renderGroup={handleRenderGroup}
          onChange={handleChange}
          value={value}
        />
      </div>
    </FormRow>
  );
}
