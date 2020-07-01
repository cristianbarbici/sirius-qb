import React from "react"
import { useSplatField } from "@splat/splat-react"
import SirField from "../common/SirField"
import { makeStyles } from '@material-ui/core/styles'
import {SPLATFIELD} from './splat/vars'
import IconButton from '@material-ui/core/IconButton'
import RemoveCircleOutlineIcon from '@material-ui/icons/RemoveCircleOutline'
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline'

export const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'row',
  },
  value: {
    minWidth: theme.typography.pxToRem(24),
    textAlign: 'center'
  },
  iconButton: {
    '&:hover': {
      color: theme.palette.text.primary
    }
  }
}));

export default function NrOfBusinesses(props) {
  const [value, setValue] = useSplatField(SPLATFIELD.NROFBUSINESSES)
  const classes = useStyles()
  const min = 1, max = 10

  const decrease = () => {
    if (value > min)
      setValue(value-1)
  }
  const increase = () => {
    if (value < max)
      setValue(value+1)
  }

  return (
    <SirField label={"Nr.of businesses"} valid>
      <div className={classes.root}>
        <IconButton onClick={decrease} disabled={value <= min} className={classes.iconButton}>
          <RemoveCircleOutlineIcon />
        </IconButton>
        <span className={classes.value}>{value}</span>
        <IconButton onClick={increase} disabled={value >= max} className={classes.iconButton}>
          <AddCircleOutlineIcon />
        </IconButton>
      </div>
    </SirField>
  )
}
