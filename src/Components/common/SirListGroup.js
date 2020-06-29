import React from 'react'
import _ from 'lodash'
import clsx from 'clsx'
import { makeStyles } from '@material-ui/core/styles'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import { pxFieldHeight, bgColor, hexSecondary, brdColor, bgColorHover } from '../../Styles/colors'
import SirReadOnlyField from './SirReadOnlyField'

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
    width: `calc(50% - ${theme.spacing(.5)}px)`,
    borderRadius: 3,
    border: 'solid 1px rgba(0,0,0,.06)',
    margin: theme.spacing(.5),
    transition: 'border-color 200ms cubic-bezier(0.4, 0, 0.2, 1)',

    '&:hover': {
      borderColor: 'rgba(0,0,0,.38)'
    },

    '& .MuiListItemText-root .MuiListItemText-primary': {
      whiteSpace: 'nowrap',
      overflow: 'hidden',
      textOverflow: 'ellipsis'
    },

    '& .MuiSvgIcon-root': {
      opacity: 0,
      transition: 'opacity 200ms cubic-bezier(0.4, 0, 0.2, 1)'
    }
  },
  validIcon: {
    opacity: 0,
    color: hexSecondary,
  },
  selected: {
    backgroundColor: bgColor,
    color: hexSecondary,
    borderColor: brdColor,
    '&:hover': {
      backgroundColor: bgColorHover,
    },
    '& $validIcon': {
      opacity: 1
    }
  },
}));

export default function SirListGroup(props) {
  const { data, value, setValue, open, setOpen, hideValidationIcon } = props
  const classes = useStyles()
  const amount = data.length
  const maxGroupHeight = itemHeight * (amount + amount % 2) / 2

  const handleChange = (code) => {
    const selected = _.head(_.filter(
      data,
      (item) => item.Code === code
    ))
    setValue(selected)
    setOpen(!open)
  }
  const renderValue = (vlu) => vlu || '(None)'

  return (
    !open ?
      <SirReadOnlyField value={renderValue(value.Name)} onClick={setOpen} hideValidationIcon={hideValidationIcon} /> : 
      <List
        className={classes.group}
        style={{ maxHeight: maxGroupHeight }}
      >
        {_.map(
          _.orderBy(data, 'Name'),
          function (el) {
            return (
              <ListItem dense button className={clsx(classes.item, { [classes.selected]: el.Code === value.Code })} key={el.Code} onClick={() => handleChange(el.Code)}>
                <ListItemText primary={renderValue(el.Name)} />
                {/*<CheckIcon className={classes.validIcon} fontSize='small' />*/}
              </ListItem>
            );
          }
        )}
      </List>
  )
}