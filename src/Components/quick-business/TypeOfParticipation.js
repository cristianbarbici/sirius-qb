import React, { useState, useEffect } from "react";
import { makeStyles, useTheme } from '@material-ui/core/styles';
import { useSplatField } from "../../SplatComponents/SplField";
import { useProcessState } from "../../SplatComponents/SplProcess";
import FormRow from "../common/FormRow";
import _ from 'lodash';

import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';

export const useStyles = makeStyles((theme) => ({
    root: {
        // fix two columns for long lists of radio buttons
    }
  }));

  export default function TypeOfParticipation(props) {
    const label = 'Type of participation method';
    //const theme = useTheme();
    //const classes = useStyles(theme);
    const processState = useProcessState();
    
    const typeOfBusiness = processState.process_TypeOfBusiness;
    const typeOfParticipationCodes = typeOfBusiness.TypeOfParticipationCodes || [];
    const typeOfParticipationOptions = processState.TypeOfParticipationOptions;
    const typeOfParticipationOptionsFiltered = _.filter(typeOfParticipationOptions, item => _.includes(typeOfParticipationCodes, item.Code)) ;

    const [value, setValue] = useSplatField("process_TypeOfParticipation");

    const handleChange = (e) => {
        const selected = _.filter(typeOfParticipationOptions, item => item.Code === e.target.value);
        setValue(selected);
      };


    return (
        <FormRow label={label}>
            <FormControl component="fieldset">
                <RadioGroup aria-label="gender" name="gender1" value={value.Code} onChange={handleChange}>
                    {_.map(_.orderBy(typeOfParticipationOptionsFiltered, 'Name'), function (el) {
                        return (
                            <FormControlLabel key={el.Code} value={el.Code} control={<Radio />} label={el.Name || '(None)'} />
                        );
                    })}
                </RadioGroup>
            </FormControl>
        </FormRow>
    )
  }