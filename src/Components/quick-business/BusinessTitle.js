import React, { useState, useEffect } from "react";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import { useSplatField } from "@splat/splat-react";
import FormRow from "../common/FormRow";
import SirTextField from "../common/SirTextField";

export const useStyles = makeStyles((theme) => ({
  root: {
    '& .MuiFormHelperText-contained': {
      textAlign: 'right',
      marginRight: theme.spacing(.5),
      color: 'rgba(0,0,0,.24)',
      fontSize: '12px',
      lineHeight: '14px',

      '& span:first-child': {
        color: 'rgba(0,0,0,.6)'
      }
    }
  },
}))

export default function BusinessTitle(props) {
  const label = "Business title";
  const maxLength = 40; // TODO: might be set from server
  const [value, setValue] = useSplatField(
    "process_BusinessLayer.BusinessTitle"
  );
  const [count, setCount] = useState(0);
  const handleChange = (event) => {
    setValue(event.target.value);
  };

  const theme = useTheme();
  const classes = useStyles(theme);

  useEffect(() => {
    setCount(value.length);
  }, [value]);

  return (
    <FormRow label={label} className={classes.root}>
      <SirTextField
        value={value || ''}
        onChange={handleChange}
        inputProps={{
          maxLength: maxLength,
        }}
        helperText={<><span>{count}</span> / <span>{maxLength}</span></>}
      />
    </FormRow>
  );
}
