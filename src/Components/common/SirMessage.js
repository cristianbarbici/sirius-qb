import React from 'react'
import { makeStyles } from "@material-ui/core/styles"

export const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    justifyContent: 'center',
    backgroundColor: '#ecf3f5',
    borderRadius: 6,
    margin: theme.spacing(0, 4, 2),
    padding: theme.spacing(4),
    color: 'rgba(0,0,0,.3)',
    position: 'relative',
    fontSize: '.8rem',
    fontWeight: 600,
    '&:before': {
      position: 'absolute',
      content: '""',
      width: theme.spacing(3),
      height: theme.spacing(3),
      borderRadius: 3,
      backgroundColor: '#ecf3f5',
      left: '50%',
      top: 0,
      transform: 'translate(-50%, -25%) rotate(45deg)'
    }
  },
}))


export default function SirMessage(props) {
  const { children } = props
  const classes = useStyles()

  return (
    <div className={classes.root}>
      {children}
    </div>
  )
}
