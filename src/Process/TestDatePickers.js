import React, {useRef, useState} from "react"
import { makeStyles } from "@material-ui/core/styles"
import Section from "../Components/common/Section"
import BasicDatePicker from "../Components/labs/BasicDatePicker";
import InsuredPeriod from "../Components/quick-business/InsuredPeriod";
import Button from '@material-ui/core/Button'
import SirTextField from "../Components/common/SirTextField";

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


export default function TestDatePickers(props) {
  const classes = useStyles()
  const inputRef = useRef(null)
  const [sel, setSel] = useState(false)

  const handleOnClick = () => {
    inputRef.current.focus();
    inputRef.current.select();
  }

  return (
    <div className={classes.root}>

      <Section className={classes.section}>
        <InsuredPeriod />
      </Section>

      <Section>
        <Button onClick={() => setSel(true)}>Show</Button>

        {sel && <Button onClick={handleOnClick}>Focus textfield</Button> }

        {sel && <SirTextField
          fullWidth
          inputRef={inputRef}
          placeholder="Enter Your First Name"
        />}
      </Section>

    </div>
  );
}
