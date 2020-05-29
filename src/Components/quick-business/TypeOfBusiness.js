import React, { useState } from "react";
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import FormRow from "../common/FormRow";
import { useSplatField } from "../../SplatComponents/SplField";
import { useProcessState } from "../../SplatComponents/SplProcess";

export const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
        display: 'flex',
        justifyContent: 'space-between'
    }
  }));

/*
let typeOfBusinessOptions = [
  {
    Name: "Non-Prop Direct",
    Code: "NONPROPDIR",
  },
  {
    Name: "Non-Prop Facultative",
    Code: "NONPROPFAC",
  },
  {
    Name: "Non-Prop Treaty",
    Code: "NONPROPTTY",
  },
  {
    Name: "Proportional Direct",
    Code: "DIRECT", // PROPDIR
  },
  {
    Name: "Proportional Facultative",
    Code: "PROPFAC",
  },
  {
    Name: "Proportional Treaty",
    Code: "PROPTTY",
  },
];


*/

export default function TypeOfBusiness(props) {
    const label = 'Type of business';
    const theme = useTheme();
    const classes = useStyles(theme);
    const processState = useProcessState();

    const [value, setValue] = useSplatField("process_TypeOfBusiness");
    const [primary, setPrimary] = useState('');
    const [secondary, setSecondary] = useState('');

    const handlePrimary = (type) => {
        console.log(type);
        setPrimary(type);
    }

    const handleSecondary = (type) => {
        console.log(type);
        setSecondary(type);
    }

    const handleChange = () => {
        // componse Code
        const code = primary === 'PROP' && secondary === 'DIR' ? 'DIRECT' : primary + secondary;

        // get TypeOfBusiness by Code
        const typeOfBusinessOptions = processState.TypeOfBusinessOptions;

        // set Type of business
    }

    return (
      <FormRow label={label}>
        <div className={classes.root}>            
            <ButtonGroup>
                <Button onClick={() => handlePrimary('NONPROP')}>Non-Prop</Button>
                <Button onClick={() => handlePrimary('PROP')}>Proportional</Button>
            </ButtonGroup>
            <ButtonGroup>
                <Button onClick={() => handleSecondary('DIR')}>Direct</Button>
                <Button onClick={() => handleSecondary('FAC')}>Facultative</Button>
                <Button onClick={() => handleSecondary('TTY')}>Treaty</Button>
            </ButtonGroup>
        </div>
      </FormRow>
    );
}