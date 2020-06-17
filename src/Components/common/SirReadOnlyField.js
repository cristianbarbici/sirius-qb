import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import CheckIcon from '@material-ui/icons/Check'
import EditIcon from '@material-ui/icons/Edit'

export const useStyles = makeStyles((theme) => ({
  root: {
    display: 'inline-flex',
    width: '100%',
    borderRadius: 3,
    backgroundColor: 'rgba(0,0,0,.02)',
    border: 'solid 1px rgba(0,0,0,.06)',
    margin: 0,

    '& .MuiListItemText-root .MuiListItemText-primary': {
      whiteSpace: 'nowrap',
      overflow: 'hidden',
      textOverflow: 'ellipsis'
    },

    '& .MuiSvgIcon-root': {
      opacity: 0,
      color: 'rgba(0,0,0,.24)',
      fontSize: '1.25rem',
      transition: 'opacity 200ms cubic-bezier(0.4, 0, 0.2, 1)'
    },

    '& $validIcon': {
      opacity: 1
    },

    '& $editIcon': {
      opacity: 0
    },

    '&:hover': {
      '& $editIcon': {
        opacity: 1
      }
    }
  },
  validIcon: {
    opacity: 0
  },
  editIcon: {
    opacity: 0,
    marginRight: theme.spacing(1)
  }
}))

export default function SirReadOnlyField(props) {
  const { value, onClick } = props
  const classes = useStyles()

  return (
    <ListItem dense button className={classes.root} onClick={onClick}>
      <ListItemText primary={value} />
      <EditIcon className={classes.editIcon} />
      <CheckIcon className={classes.validIcon} />
    </ListItem>
  )
}
