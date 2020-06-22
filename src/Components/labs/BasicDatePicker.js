import React, { useState } from "react"
import { TextField } from "@material-ui/core"
import MomentUtils from '@material-ui/pickers/adapter/moment'
import { DatePicker, LocalizationProvider } from '@material-ui/pickers';

/*
function BasicDatePicker() {
  const [selectedDate, handleDateChange] = useState(new Date())

  return (
    <LocalizationProvider dateAdapter={MomentUtils}>
      <DatePicker
        label="Basic example"
        value={selectedDate}
        onChange={date => handleDateChange(date)}
        renderInput={props => <TextField {...props} />}
      />
    </LocalizationProvider>
  );
}
*/
//import React, { useState } from "react";
import { styled } from "@material-ui/core/styles";
import { DesktopDatePicker } from "@material-ui/pickers";
import SirTextField from "../common/SirTextField";

const InputContainer = styled("div")({
  display: "flex",
  alignItems: "center",
});

function BasicDatePicker({open, callbackOnChange, ...others}) {
  const [selectedDate, handleDateChange] = useState(new Date());

  return (
    <LocalizationProvider dateAdapter={MomentUtils}>
      <DatePicker
        //inputFormat='YYYY-MM-DD'
        value={selectedDate}
        onChange={callbackOnChange}
        open={open}
        renderInput={({ ref, inputProps, InputProps }) => (
          <InputContainer ref={ref}>
            <SirTextField {...inputProps} />
            {InputProps?.endAdornment}
          </InputContainer>
        )}
      />
    </LocalizationProvider>
  );
}

export default BasicDatePicker