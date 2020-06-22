import React from 'react'
import _ from 'lodash'
import clsx from 'clsx'
import { makeStyles } from "@material-ui/core/styles"
import Button from '@material-ui/core/Button'
import ButtonGroup from '@material-ui/core/ButtonGroup'
import { hexSecondary, rgbSecondary } from '../../Styles/colors'

const bgColor = `rgba(${rgbSecondary}, .12)`
const bgColorHover = `rgba(${rgbSecondary}, .2)`
const borderColor = `rgba(${rgbSecondary}, .38)`

export const useStyles = makeStyles((theme) => ({
  root: {
    margin: 0,
    '& $selected': {
      borderRightColor: borderColor,
    }
  },
  btn: {},
  selected: {
    backgroundColor: bgColor,
    color: hexSecondary,
    borderColor: borderColor,
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
    <Button
      key={item.Code}
      className={clsx(classes.btn, { [classes.selected]: !isEmpty && item.Code === value.Code })}
      onClick={() => callbackClick(item.Code)}
    >
      {item.Name}
    </Button>

  return (
    <ButtonGroup className={classes.root}>
      {_.map(data, item => commonButton(item))}
    </ButtonGroup>
  )
}
