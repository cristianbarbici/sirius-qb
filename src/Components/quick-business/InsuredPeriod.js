import React, { useState, useEffect, useRef } from 'react'
import _ from 'lodash'
import clsx from 'clsx'
import moment from 'moment'
import { makeStyles } from '@material-ui/core/styles'

import SirField from '../common/SirField'
import SirButtonGroup from '../common/SirButtonGroup'
import SirReadOnlyField from '../common/SirReadOnlyField'
import SirDatePicker from '../common/SirDatePicker'

import IconButton from '@material-ui/core/IconButton'
import LockIcon from '@material-ui/icons/Lock'
import LockOpenIcon from '@material-ui/icons/LockOpen'
import ClearIcon from '@material-ui/icons/Clear'
import Tooltip from '@material-ui/core/Tooltip'
import NoEncryptionIcon from '@material-ui/icons/NoEncryption';
import EditIcon from '@material-ui/icons/Edit'
import Button from '@material-ui/core/Button'
import Link from '@material-ui/core/Link'
import { hexSecondary, rgbSecondary, bgColorHover } from '../../Styles/colors'
import CtrlActions from './ctrls/CtrlActions'

export const useStyles = makeStyles((theme) => ({
  unselected: {
    display: "flex",
    alignItems: "center",
    position: "relative",
    justifyContent: 'space-between',
    width: '100%'
  },
  viewMode: {
    display: 'flex',
    alignItems: 'center',
    flex: 1,
    width: '100%'
  },
  from: {

  },
  separator: {
    color: 'rgba(0,0,0,.38)',
    margin: theme.spacing(0, 1)
  },
  to: {
    display: 'inline-flex',
    alignItems: 'center',
    color: 'rgba(0,0,0,.38)',
  },
  toUnlocked: {
    color: 'rgba(0,0,0,.87)',
  },

  duration: {
    color: 'rgba(0,0,0,.24)',
    marginLeft: theme.spacing(1),
    fontSize: '.825rem',
  },
  lockIcon: {
    color: 'rgba(0,0,0,.24)',
    fontSize: '.925rem',
    marginLeft: theme.spacing(.5)
  },
  editActions: {
    flex: 1,
    textAlign: 'right',
    marginRight: -theme.spacing(1)
  },
  actionBtn: {
    padding: theme.spacing(1.25)
  },
  actionBtnFirst: {
    marginRight: -theme.spacing(.5)
  },
  actionIcon: {
    fontSize: '1.1rem'
  },
  linkTo: {
    color: 'rgba(0,0,0,.38)',
    padding: theme.spacing(.5,0),
  
    '&:hover': {
      textDecoration: 'none',
      borderBottom: 'dashed 1px rgba(0,0,0,.12)'
    }
  }
}));

const componentMode = {
  UNSELECTED: 'unselected',
  VIEW: 'view',
  EDIT: 'edit'
}

const commonDates = [
  {
    Name: 'SEP',
    Code: '2020-09-01',
    Alt: '1st Sep 2020'
  },
  {
    Name: 'OCT',
    Code: '2020-10-01',
    Alt: '1st Oct 2020'
  },
  {
    Name: 'NOV',
    Code: '2020-11-01',
    Alt: '1st Nov 2020'
  },
  {
    Name: 'DEC',
    Code: '2020-12-01',
    Alt: '1st Dec 2020'
  },
  {
    Name: 'JAN',
    Code: '2021-01-01',
    Alt: '1st Jan 2021'
  },
]

const format = 'YYYY-MM-DD'                                                 // TODO: format based on local
const displayFormat = 'Do MMM YYYY'
const isDateValid = (date) => moment(date, format, true).isValid()

export default function InsuredPeriod(props) {
  const { lockTo } = props
  const label = 'Insured period'
  const classes = useStyles()

  const [mode, setMode] = useState(componentMode.UNSELECTED)
  const [from, setFrom] = useState(new Date())
  const [to, setTo] = useState(null)
  const [duration, setDuration] = useState(null)
  const [errorFrom, setErrorFrom] = useState(false)
  const [errorTo, setErrorTo] = useState(false)
  const [locked, setLocked] = React.useState(true)
  const fromRef = useRef(null)
  const toRef = useRef(null)

  const setViewMode = () => {
    setMode(componentMode.VIEW)
  }
  const setEditMode = () => setMode(componentMode.EDIT)
  const calcDuration = (fromDate, toDate) => fromDate && toDate && isDateValid(fromDate) && isDateValid(toDate) ? toDate.diff(fromDate, 'days') : null

  const setInsuredPeriod = (fromDate, toDate = null, changeMode = true) => {
    const from = isDateValid(fromDate) ? moment(fromDate) : null
    const to = toDate && isDateValid(toDate) ? moment(toDate) : (isDateValid(fromDate) ? moment(fromDate).add(1, 'year').subtract(1, 'day') : null)
    const duration = calcDuration(from, to)

    setErrorFrom(false)
    setFrom(from)
    setTo(to)
    setDuration(duration)
    if (lockTo)
      setLocked(false) // TODO: ...
    if (changeMode)
      setViewMode()
  }

  const handleSetFrom = (fromDate) => {
    const from = isDateValid(fromDate) ? moment(fromDate) : null

    setErrorFrom(false)
    setFrom(from)
    setDuration(calcDuration(from, to))
  }

  const handleSetTo = (toDate) => {
    const to = isDateValid(toDate) ? moment(toDate) : null

    setErrorTo(false)
    setTo(to)
    setDuration(calcDuration(from, to))
    setViewMode()
  }

  const handleQuickSelect = (date) => setInsuredPeriod(date)

  const handleOnEnterFrom = (date) => {
    if (!errorFrom)
      locked ? setInsuredPeriod(date) : handleSetFrom(date)
  }

  const handleOnChangeFrom = (date) => setErrorFrom(date && !date.isValid() || _.isNull(date))
  const handleOnAcceptFrom = (date) => locked ? setInsuredPeriod(date) : handleSetFrom(date)
  const handleOnEnterTo = (date) => {
    if (!errorTo)
      handleSetTo(date)
  }
  const handleOnChangeTo = (date) => setErrorTo(date && !date.isValid() || _.isNull(date))
  const handleOnAcceptTo = (date) => handleSetTo(date)
  const toggleLocked = () => {
    if (!locked)
      setInsuredPeriod(from, null, false)

    setLocked(!locked)
  }

  const closeEditMode = () => {
    setErrorFrom(false)
    setErrorTo(false)
    setViewMode()
  }
  const clearPeriod = () => {
    setErrorFrom(false)
    setErrorTo(false)
    setFrom(null)
    setTo(null)
    setDuration(null)
    setMode(componentMode.UNSELECTED)
  }

  // set focus on edit
  useEffect(() => {
    if (mode === componentMode.EDIT && fromRef.current) {
      fromRef.current.focus()
      fromRef.current.select()
    }
  }, [mode])

  useEffect(() => {
    if (mode === componentMode.EDIT && toRef.current) {
      toRef.current.focus()
      toRef.current.select()
    }
  }, [locked])

  const renderDuration = () =>
    <span className={classes.duration}>({duration === 364 ? '1 year' : duration + ' days'})</span>

  const renderTo = (edit) =>
    <>
      <span className={clsx(classes.to, {[classes.toUnlocked]: !locked})}>
        { !edit ? 
          to.format(displayFormat) : 
            locked ? 
            <Tooltip title='Edit end date'><Link className={classes.linkTo} href='#' onClick={toggleLocked}>{to.format(displayFormat)}</Link></Tooltip> : 
            <SirDatePicker
              inputRef={toRef}
              value={to}
              error={errorTo}
              onChange={handleOnChangeTo}
              onAccept={handleOnAcceptTo}
              onEnter={handleOnEnterTo}
            />
        }
      </span>
      {renderDuration()}
    </>

  const renderMode = (edit) => {
    return (
      <div className={classes.viewMode}>
        {edit ?
          <SirDatePicker
            inputRef={fromRef}
            value={from}
            error={errorFrom}
            onChange={handleOnChangeFrom}
            onAccept={handleOnAcceptFrom}
            onEnter={handleOnEnterFrom}
          /> :
          <span className={classes.from}>{from.format(displayFormat)}</span>
        }
        <span className={classes.separator}>&mdash;</span>
        {renderTo(edit)}
        { edit &&
          <span className={classes.editActions}>
            <CtrlActions 
              titleClear='Clear period and start over' 
              callbackClear={clearPeriod} 
              titleOk='Close edit mode' 
              callbackOk={closeEditMode} 
            />
          </span>
        }
      </div>
    )
  }

  const isUnselectedMode = mode === componentMode.UNSELECTED
  const isViewMode = mode === componentMode.VIEW
  const isEditMode = mode === componentMode.EDIT

  return (
    <SirField 
      error={errorFrom || errorTo}
      valid={isViewMode}
      label={label} 
      hint={
        isUnselectedMode ? 
        'Select periods start date. The end date is initially set 1 year away.' : null
        // (isEditMode ? 'Change default duration by selecting a custom end date.' : null)
      }
    >

      {isUnselectedMode && // TODO: fix correct helper texts
        <div className={classes.unselected}>
          <SirButtonGroup
            data={commonDates}
            callbackClick={handleQuickSelect}
          />
          <SirDatePicker
            placeholder={'Custom...'}
            value={null}
            error={errorFrom}
            onChange={handleOnChangeFrom}
            onAccept={handleOnAcceptFrom}
            onEnter={handleOnEnterFrom}
          />
        </div>
      }

      {isViewMode &&
        <SirReadOnlyField
          value={renderMode()}
          onClick={setEditMode}
        />
      }

      {isEditMode && renderMode(true)}

    </SirField>
  )
}


