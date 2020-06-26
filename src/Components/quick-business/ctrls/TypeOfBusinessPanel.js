import React from "react"
import _ from 'lodash'
import { makeStyles } from "@material-ui/core/styles"
import { useSplatField } from '@splat/splat-react'
import { SPLATFIELD } from '../splat/vars'
import SirMessage from "../../common/SirMessage"

export const useStyles = makeStyles((theme) => ({
  root: {
  },
  enhanced: {
    margin: theme.spacing(0, .5),
    color: 'rgba(0,0,0,.42)'
  }
}))

export default function TypeOfBusinessPanel(props) {
  const { children } = props
  const classes = useStyles()
  const [value, setValue] = useSplatField(SPLATFIELD.TYPEOFBUSINESS)
  const hasValue = !_.isEmpty(value)
  
  return (
    <div className={classes.root}>
      {hasValue ? children :
        <SirMessage>
          Select <span className={classes.enhanced}>Type of business</span> to reveal more fields.
        </SirMessage>
      }
    </div>
  )
}