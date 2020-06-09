import React, { useState, useEffect } from "react";
import moment from "moment";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import { useSplatField } from "@splat/splat-react";
import FormRow from "../common/FormRow";
import {
  KeyboardDatePicker,
  Calendar,
  useStaticState,
} from "@material-ui/pickers";
import { MuiPickersUtilsProvider } from "@material-ui/pickers";
import _ from "lodash";

export const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    alignItems: "center",
    position: "relative",
  },
  picker: {
    "& .MuiInputAdornment-root": {
      "& .MuiIconButton-root": {
        padding: theme.spacing(1),
      },
      "& .MuiSvgIcon-root": {
        height: theme.spacing(2.25),
        width: theme.spacing(2.25),
      },
    },

    "& .MuiInputAdornment-positionStart": {
      marginRight: theme.spacing(0.5),
    },

    "& .MuiInputBase-input": {
      width: theme.spacing(12),
      minWidth: "unset",
      maxWidth: "100%",
    },

    "& .MuiOutlinedInput-adornedStart": {
      paddingLeft: theme.spacing(0.5),
    },

    "& fieldset": {
      padding: 0,
      top: 0,

      "& legend": {
        display: "none",
      },
    },
  },
  duration: {
    marginLeft: theme.spacing(2),
    //transform: 'translateY(-50%)' // on a hunch
  },
  calendar: {
    position: "absolute",
    left: 0,
    bottom: 0,
    transform: "translateY(100%)",
    backgroundColor: "#fff",
    zIndex: 9999,
    overflow: "hidden",
  },
}));

export default function InsuredPeriod(props) {
  const label = "Insured period";

  const locale = window.navigator.userLanguage || window.navigator.language; // TODO: set locale from server
  const format = "YYYY-MM-DD"; // TODO: format based on local

  const theme = useTheme();
  const classes = useStyles(theme);

  const [startDate, setStartDate] = useSplatField("process_StartDate");
  const [endDate, setEndDate] = useSplatField("process_EndDate");
  const [duration, setDuration] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  const handleFromDateChange = (date) => {
    setStartDate(date);
  };
  const handleFromDateError = (err) => {
    err && console.log("handleFromDateError", err);
  };

  const handleToDateChange = (date) => {
    setEndDate(date);
  };

  useEffect(() => {
    setStartDate(moment().format(format));
    setEndDate(moment().add(1, "year").format(format));
  }, []);

  useEffect(() => {
    setDuration(moment(endDate).diff(startDate, "months"));
  }, [startDate, endDate]);

  return (
    <FormRow label={label}>
      <div className={classes.root}>
        <KeyboardDatePicker
          className={classes.picker}
          size="small"
          inputVariant="outlined"
          variant="inline"
          autoOk
          InputAdornmentProps={{ position: "start" }}
          format={format}
          value={startDate}
          onChange={(date) => handleFromDateChange(date)}
          onError={(err) => handleFromDateError(err)}
        />
        <KeyboardDatePicker
          className={classes.picker}
          size="small"
          inputVariant="outlined"
          variant="inline"
          autoOk
          InputAdornmentProps={{ position: "start" }}
          format={format}
          value={endDate}
          onChange={(date) => handleToDateChange(date)}
        />
        <div className={classes.duration}>{duration} months</div>
      </div>
    </FormRow>
  );
}
