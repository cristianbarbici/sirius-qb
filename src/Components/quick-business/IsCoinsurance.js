import React, {useState} from "react"
import Switch from "@material-ui/core/Switch"
import { useSplatField } from "@splat/splat-react"
import FormRow from "../common/FormRow"
import { makeStyles } from '@material-ui/core/styles'

export const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(1, 4.5, 0, 2)
  },
  switch: {
    marginTop: theme.spacing(.5)
  }
}));

export default function IsCoinsurance(props) {
  const [value, setValue] = useState(false) //useSplatField("process_IsCoinsurance")
  const classes = useStyles()

  return (
    <FormRow label={"Is coinsurance"} className={classes.root} valid>
      <Switch 
        size='small' 
        className={classes.switch}
        checked={value} 
        onChange={() => setValue(!value)} 
      />
    </FormRow>
  )
}
