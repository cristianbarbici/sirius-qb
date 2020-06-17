import React from "react"
import { makeStyles } from "@material-ui/core/styles"
import TypeOfBusiness from "../Components/quick-business/TypeOfBusiness"
import Section from "../Components/common/Section"
import TypeOfBusinessButtonGroup from "../Components/quick-business/archive/TypeOfBusinessButtonGroup"
import TypeOfBusinessRadioGroup from "../Components/quick-business/archive/TypeOfBusinessRadioGroup"

export const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    maxWidth: theme.spacing(72),
    margin: '0 auto', // `0 auto ${theme.spacing(6)}px`,
    padding: theme.spacing(3, 0),
    backgroundColor: '#fdfdfd' // $hexPanelBg: #fdfdfd;
  },
  section: {
    margin: theme.spacing(4, 0)
  }
}));

export default function TestTOB(props) {
  const classes = useStyles();

  return (
    <div className={classes.root} noValidate autoComplete="off">

      <Section className={classes.section}>
        <TypeOfBusinessRadioGroup />
      </Section>

      <Section className={classes.section}>
        <TypeOfBusinessButtonGroup />
      </Section>

      <TypeOfBusiness />

    </div>
  );
}
