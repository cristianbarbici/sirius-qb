import React from 'react'
import _ from 'lodash'
import clsx from 'clsx'
import { makeStyles } from '@material-ui/core/styles'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import { ExpansionPanel, ExpansionPanelSummary, ExpansionPanelDetails } from '@material-ui/core'

export const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column-reverse',
    '&:before': {
      content: 'unset'
    },
    '&.Mui-expanded': {
      margin: 0
    }
  },
  content: {
    color: 'rgba(0,0,0,.24)',
    justifyContent: 'center',
    alignItems: 'center',
    fontSize: theme.typography.pxToRem(12),
    fontWeight: theme.typography.fontWeightMedium,
    textTransform: 'uppercase',
    letterSpacing: theme.typography.pxToRem(.25)
  },
  details: {
    flexDirection: 'column',
    padding: 0
  },
  icon: {
    marginLeft: theme.spacing(.5),
    transition: 'transform 250ms cubic-bezier(0.4, 0, 0.2, 1)'
  },
  iconRotated: {
    transform: 'rotate(180deg)'
  }
}))

export default function SirExpansionPanel(props) {
  const { children } = props
  const classes = useStyles()
  const [expanded, setExpanded] = React.useState(false)

  const handleChange = (event, newExpanded) => {
    setExpanded(newExpanded);
  }

  return (
    <ExpansionPanel elevation={0} onChange={handleChange} className={classes.root}>
      <ExpansionPanelSummary classes={{ content: classes.content }}>
        {expanded ? 'Less' : 'More'}
        <ExpandMoreIcon className={clsx(classes.icon, { [classes.iconRotated]: expanded })} />
      </ExpansionPanelSummary>
      <ExpansionPanelDetails className={classes.details}>
        {children}
      </ExpansionPanelDetails>
    </ExpansionPanel>
  )
}