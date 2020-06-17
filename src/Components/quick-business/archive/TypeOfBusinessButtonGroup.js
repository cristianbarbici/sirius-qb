import React, { useState, useEffect } from 'react'
import _ from 'lodash'
import clsx from 'clsx'
import { makeStyles, useTheme } from "@material-ui/core/styles"
import Button from "@material-ui/core/Button"
import ButtonGroup from "@material-ui/core/ButtonGroup"
import AddIcon from '@material-ui/icons/Add'
import FormRow from "../../common/FormRow"
import { useSplatField } from "@splat/splat-react"
import { useSplatProcessState } from "@splat/splat-react"
import { hexSecondary, rgbSecondary } from '../../../Styles/colors'

const bgColor = `rgba(${rgbSecondary}, .12)`
const bgColorHover = `rgba(${rgbSecondary}, .2)`
const borderColor = `rgba(${rgbSecondary}, .38)`

export const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    display: 'flex',
    alignItems: 'center'
  },
  add: {
    color: 'rgba(0,0,0,.38)',
    margin: theme.spacing(0, 1)
  },
  group: {
    margin: 0,

    '& $btnSelected': {
      borderRightColor: borderColor,
    }
  },
  btn: {
    fontSize: '13px',
    whiteSpace: 'nowrap',
    
  },
  btnSelected: {
    backgroundColor: bgColor,
    color: hexSecondary,
    borderColor: borderColor,
    '&:hover': {
      backgroundColor: bgColorHover,
    }
  }
}));

export default function TypeOfBusinessButtonGroup(props) {
  const label = 'Type of business';
  const theme = useTheme();
  const classes = useStyles(theme);
  const processState = useSplatProcessState();
  const [value, setValue] = useSplatField("process_TypeOfBusiness");
  // TODO: set primary and secondary based on initial value
  const [primary, setPrimary] = useState('');
  const [secondary, setSecondary] = useState('');

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

  const renderBtn = (label, value, isPrimary) =>
    <Button
      size='small'
      className={clsx(classes.btn, { [classes.btnSelected]: isPrimary ? primary === value : secondary === value })}
      onClick={() => isPrimary ? setPrimary(value) : setSecondary(value)}
    >
      {label}
    </Button>


  return (
    <FormRow label={label}>
      <div className={classes.root}>
        <ButtonGroup className={classes.group}>
          { renderBtn('Non-Prop', 'NONPROP', true) }
          { renderBtn('Proportional', 'PROP', true) }
        </ButtonGroup>
        <AddIcon className={classes.add} />
        <ButtonGroup className={classes.group}>
          { renderBtn('Direct', 'DIR', false) }
          { renderBtn('Facultative', 'FAC', false) }
          { renderBtn('Treaty', 'TTY', false) }
        </ButtonGroup>
      </div>
    </FormRow>
  );
}
