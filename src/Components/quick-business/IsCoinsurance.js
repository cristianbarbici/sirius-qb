import React from "react"
import Switch from "@material-ui/core/Switch"
import { useSplatField } from "@splat/splat-react"
import SirField from "../common/SirField"
import { makeStyles } from '@material-ui/core/styles'
import {SPLATFIELD} from './splat/vars'

export const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(1, 4.5, 0, 2)
  },
  switch: {
    marginTop: theme.spacing(.5),
    marginBottom: theme.spacing(2.25)
  }
}));

export default function IsCoinsurance(props) {
  const [value, setValue] = useSplatField(SPLATFIELD.ISCOINSURANCE)
  const classes = useStyles()

  return (
    <SirField label={"Is coinsurance"} className={classes.root} valid>
      <Switch 
        size='small' 
        className={classes.switch}
        checked={value} 
        onChange={() => setValue(!value)} 
      />
    </SirField>
  )
}
