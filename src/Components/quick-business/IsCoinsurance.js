import React from "react"
import Switch from "@material-ui/core/Switch"
import { useSplatField } from "@splat/splat-react"
import FormRow from "../common/FormRow"
import { makeStyles } from '@material-ui/core/styles'

export const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: theme.spacing(.5)
  }
}));

export default function IsCoinsurance(props) {
  const [value, setValue] = useSplatField("process_IsCoinsurance")
  const classes = useStyles()

  return (
    <FormRow label={"Is coinsurance"}>
      <Switch 
        size='small' 
        className={classes.root}
        checked={value} 
        onChange={() => setValue(!value)} 
      />
    </FormRow>
  )
}
