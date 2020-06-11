import React, { useState } from 'react'
import _ from 'lodash'
import clsx from 'clsx'
import { makeStyles } from '@material-ui/core/styles'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import CheckIcon from '@material-ui/icons/Check'
import EditIcon from '@material-ui/icons/Edit'
import { pxFieldHeight } from '../../Styles/colors'

// in px
const pxItemMargin = 4
const itemHeight = pxFieldHeight + 2 * pxItemMargin 

export const useStyles = makeStyles((theme) => ({
  group: {
    width: '100%',
    display: 'flex',
    flexWrap: 'wrap',
    flexDirection: 'column',
    padding: 0,
    margin: -theme.spacing(.5)
  },
  item: {
    display: 'inline-flex',
    width: `calc(50% - ${theme.spacing(1)}px)`,
    borderRadius: 3,
    border: 'solid 1px rgba(0,0,0,.06)',
    margin: theme.spacing(.5),

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
    }
  },
  validIcon: {
    opacity: 0
  },
  editIcon: {
    opacity: 0,
    marginRight: theme.spacing(1)
  },
  editable: {
    width: '100%',
    backgroundColor: 'rgba(0,0,0,.02)',
    margin: 0,

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
  selected: {
    '& $validIcon': {
      opacity: 1
    }
  }
}));

export default function SirListGroup(props) {
  const { data, value, setValue, callBack } = props
  const hasValue = !_.isEmpty(value)
  const classes = useStyles()
  const [open, setOpen] = useState(!hasValue)
  const amount = data.length
  const maxGroupHeight = itemHeight * (amount + amount % 2) / 2

  const handleChange = (code) => {
    const selected = _.head(_.filter(
      data,
      (item) => item.Code === code
    ))
    setValue(selected)
    handleOpen()
  }

  const handleOpen = () => {
    setOpen(!open)
    callBack && callBack(!open)
  }

  return (
    !open ? 
      <ListItem dense button className={clsx(classes.item, classes.editable)} onClick={handleOpen}>
        <ListItemText primary={value.Name || '(None)'} />
        <EditIcon className={classes.editIcon} />
        <CheckIcon className={classes.validIcon} />
      </ListItem> : 
      <List
        className={classes.group}
        style={{ maxHeight: maxGroupHeight }}
      >
        {_.map(
          _.orderBy(data, 'Name'),
          function (el) {
            return (
              <ListItem dense button className={clsx(classes.item, { [classes.selected]: el.Code === value.Code })} key={el.Code} onClick={() => handleChange(el.Code)}>
                <ListItemText primary={el.Name || '(None)'} />
                <CheckIcon className={classes.validIcon} />
              </ListItem>
            );
          }
        )}
      </List>
  )
}