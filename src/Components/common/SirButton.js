import React from 'react'
import { Button } from '@material-ui/core'
import { makeStyles } from "@material-ui/core/styles"

export const useStyles = makeStyles((theme) => ({
  root: {
    '&.MuiButton-contained': {
      borderRadius: theme.spacing(6),
      paddingLeft: theme.spacing(2.5),
      paddingRight: theme.spacing(2.5)
    },
    '&.MuiButton-text': {
      textTransform: 'unset'
    }
  }
}))

export default function SirButton(props) {
  const { children, ...other } = props
  const classes = useStyles()
  return (
    <Button 
      className={classes.root} 
      disableElevation
      {...other}
    >{children}</Button>
  )
}