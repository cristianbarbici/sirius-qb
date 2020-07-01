import React from 'react'
import _ from 'lodash'
import clsx from 'clsx'
import { makeStyles } from "@material-ui/core/styles"
import Tooltip from '@material-ui/core/Tooltip'
import Button from '@material-ui/core/Button'
import ButtonGroup from '@material-ui/core/ButtonGroup'
import { hexSecondary, bgColor, brdColor, bgColorHover } from '../../Styles/vars'

export const useStyles = makeStyles((theme) => ({
  root: {
    margin: 0,
    '& $selected': {
      borderRightColor: brdColor,
    }
  },
  btn: {},
  selected: {
    backgroundColor: bgColor,
    color: hexSecondary,
    borderColor: brdColor,
    '&:hover': {
      backgroundColor: bgColorHover,
    }
  }
}));

export default function SirButtonGroup(props) {
  const { data, value, callbackClick } = props
  const classes = useStyles()
  const isEmpty = _.isEmpty(value)

  const commonButton = (item) =>
    <Tooltip title={item.Alt ? item.Alt : ''} key={item.Code}>
      <Button
        className={clsx(classes.btn, { [classes.selected]: !isEmpty && item.Code === value.Code })}
        onClick={() => callbackClick(item.Code)}
      >
        {item.Name}
      </Button>
    </Tooltip>
  return (
    <ButtonGroup className={classes.root}>
      {_.map(data, item => commonButton(item))}
    </ButtonGroup>
  )
}
