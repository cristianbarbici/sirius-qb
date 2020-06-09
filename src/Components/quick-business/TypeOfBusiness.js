import React, { useState, useEffect } from "react"
import _ from "lodash"
import { makeStyles, useTheme } from "@material-ui/core/styles"
import Button from "@material-ui/core/Button"
import ButtonGroup from "@material-ui/core/ButtonGroup"
import FormRow from "../common/FormRow"
import { useSplatField } from "@splat/splat-react"
import { useSplatProcessState } from "@splat/splat-react"

export const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    display: "flex",
    justifyContent: "space-between",
  },
}));

export default function TypeOfBusiness(props) {
  const label = 'Type of business';
  const theme = useTheme();
  const classes = useStyles(theme);
  const processState = useSplatProcessState();

  const [value, setValue] = useSplatField("process_TypeOfBusiness");

  // TODO: set primary and secondary based on initial value
  const [primary, setPrimary] = useState('');
  const [secondary, setSecondary] = useState('');

  const handleSelected = (compare, fix) => {
    return compare === fix ? "primary" : "";
  };

  const handlePrimary = (type) => {
    setPrimary(type);
  };

  const handleSecondary = (type) => {
    setSecondary(type);
  };

  const handleChange = () => {
    // TODO: recommend we have the same logic for 'DIRECT'
    const code =
      primary === "PROP" && secondary === "DIR"
        ? "DIRECT"
        : primary + secondary;
    const typeOfBusiness = _.head(_.filter(processState.TypeOfBusinessOptions, (item) => item.Code === code));

    if (!_.isEmpty(typeOfBusiness)) {
      setValue(typeOfBusiness);
    }
  };

  const handleInitValue = (val) => {
    if (!_.isEmpty(val))
      console.log('TODO: reengineer primary and secondary based on val', val)
  }

  useEffect(() => {
    handleChange()
  }, [primary, secondary])

  // run only once, disregard console warning react-hooks/exhaustive-deps
  useEffect(() => {
    handleInitValue(value)
  }, [])

  return (
    <FormRow label={label}>
      <div className={classes.root}>
        <ButtonGroup>
          <Button
            color={handleSelected(primary, "NONPROP")}
            onClick={() => handlePrimary("NONPROP")}
          >
            Non-Prop
          </Button>
          <Button
            color={handleSelected(primary, "PROP")}
            onClick={() => handlePrimary("PROP")}
          >
            Proportional
          </Button>
        </ButtonGroup>
        <ButtonGroup>
          <Button
            color={handleSelected(secondary, "DIR")}
            onClick={() => handleSecondary("DIR")}
          >
            Direct
          </Button>
          <Button
            color={handleSelected(secondary, "FAC")}
            onClick={() => handleSecondary("FAC")}
          >
            Facultative
          </Button>
          <Button
            color={handleSelected(secondary, "TTY")}
            onClick={() => handleSecondary("TTY")}
          >
            Treaty
          </Button>
        </ButtonGroup>
      </div>
    </FormRow>
  );
}
