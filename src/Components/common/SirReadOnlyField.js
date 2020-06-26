import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import CheckIcon from '@material-ui/icons/Check'
import EditIcon from '@material-ui/icons/Edit'
import { hexValid } from '../../Styles/colors'

export const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  item: {
    display: 'inline-flex',
    borderRadius: 3,
    // backgroundColor: '#f8faf3',
    backgroundColor: 'rgba(0,0,0,.01)',
    border: 'solid 1px rgba(0,0,0,.06)',
    margin: theme.spacing(0, 2, 0, 0),

    '& .MuiListItemText-root .MuiListItemText-primary': {
      whiteSpace: 'nowrap',
      overflow: 'hidden',
      textOverflow: 'ellipsis'
    },

    '&:hover': {
      // backgroundColor: '#f2f5e6',
      '& $editIcon': {
        opacity: 1
      }
    }
  },
  validIcon: {
    color: hexValid
  },
  editIcon: {
    opacity: 0,
    color: 'rgba(0,0,0,.24)',
    transition: 'opacity 200ms cubic-bezier(0.4, 0, 0.2, 1)'
  }
}))

export default function SirReadOnlyField(props) {
  const { value, onClick, hideValidationIcon, ...other } = props
  const classes = useStyles()

  return (
    <div className={classes.root}>
      <ListItem dense button className={classes.item} onClick={onClick} {...other}>
        <ListItemText primary={value} />
        <EditIcon className={classes.editIcon} fontSize='small' />
      </ListItem>
      {!hideValidationIcon && <CheckIcon className={classes.validIcon} fontSize='small' />}
    </div>
  )
}
