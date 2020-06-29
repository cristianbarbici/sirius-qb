import React, { useState, useEffect, useRef } from 'react'
import _ from 'lodash'
import moment from 'moment'
import { makeStyles } from "@material-ui/core/styles"
import SirField from "../../common/SirField"
import SirButtonGroup from "../../common/SirButtonGroup"
import SirReadOnlyField from "../../common/SirReadOnlyField"
import SirTextField from '../../common/SirTextField'

import MomentUtils from '@material-ui/pickers/adapter/moment'
import { StaticDatePicker, LocalizationProvider } from '@material-ui/pickers';

import Popper from '@material-ui/core/Popper'
import Fade from '@material-ui/core/Fade'
import Paper from '@material-ui/core/Paper'
import Button from '@material-ui/core/Button'

export const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    alignItems: "center",
    position: "relative",
    width: '100%'
  },
  picker: {
    "& .MuiInputAdornment-root": {
      "& .MuiIconButton-root": {
        padding: theme.spacing(1),
      },
      "& .MuiSvgIcon-root": {
        height: theme.spacing(2.25),
        width: theme.spacing(2.25),
      },
    },

    "& .MuiInputAdornment-positionStart": {
      marginRight: theme.spacing(0.5),
    },

    "& .MuiInputBase-input": {
      width: theme.spacing(12),
      minWidth: "unset",
      maxWidth: "100%",
    },

    "& .MuiOutlinedInput-adornedStart": {
      paddingLeft: theme.spacing(0.5),
    },

    "& fieldset": {
      padding: 0,
      top: 0,

      "& legend": {
        display: "none",
      },
    },
  },
  calendar: {
    position: "absolute",
    left: 0,
    bottom: 0,
    transform: "translateY(100%)",
    backgroundColor: "#fff",
    zIndex: 9999,
    overflow: "hidden",
  },

  rootViewValue: {
    display: 'flex',
    flex: 1,
    alignItems: 'center'
  },

  from: {

  },

  separator: {
    color: 'rgba(0,0,0,.38)',
    margin: theme.spacing(0, 1)
  },

  to: {
    color: 'rgba(0,0,0,.6)',
  },

  duration: {
    color: 'rgba(0,0,0,.3)',
    fontSize: '11px',
    fontWeight: 600,
    marginLeft: theme.spacing(1),
    letterSpacing: '.5px'
  },

  popper: {
    marginTop: theme.spacing(.5),

    '& .MuiPickersCalendar-calendarContainer': {
      minHeight: theme.spacing(30)
    }
  },

  date: {
    width: '30%'
  },

  disabledDatePicker: {
    position: 'relative',

    '&:before': {
      zIndex: 99,
      content: '""',
      position: 'absolute',
      width: '100%',
      height: '100%',
      backgroundColor: 'rgba(255,255,255,.6)'
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
    Code: '2020-09-01'
  }, 
  {
    Name: 'OCT',
    Code: '2020-10-01'
  }, 
  {
    Name: 'NOV',
    Code: '2020-11-01'
  }, 
  {
    Name: 'DEC',
    Code: '2020-12-01'
  }, 
  {
    Name: 'JAN',
    Code: '2021-01-01'
  }, 
]

const format = 'YYYY-MM-DD'                                                 // TODO: format based on local
const displayFormat = 'Do MMM YYYY'

export default function InsuredPeriodv1(props) {
  const label = 'Insured period (old)'
  const classes = useStyles()
  
  const [mode, setMode] = useState(componentMode.UNSELECTED)
  const [from, setFrom] = useState(null)
  const [inputFrom, setInputFrom] = useState('')
  const [inputTo, setInputTo] = useState('')
  const [to, setTo] = useState(null)
  const [duration, setDuration] = useState(null)
  const [fromErr, setFromErr] = useState(false)
  const [toErr, setToErr] = useState(false)
  const [popperAnchor, setPopperAnchor] = React.useState(null)
  const [popperOpen, setPopperOpen] = React.useState(false)
  const [locked, setLocked] = React.useState(true)

  const fromRef = useRef(null)
  const toRef = useRef(null)
  const parentRef = useRef(null)

  const isDateValid = (date) => moment(date, format, true).isValid()

  const cleanUp = () => {
    setPopperOpen(false)
    setFromErr(false)
  }

  const setInsuredPeriod = (fromDate, toDate = null) => {
    const from = isDateValid(fromDate) ? moment(fromDate) : null
    const to = toDate && isDateValid(toDate) ? moment(toDate) : (isDateValid(fromDate) ? moment(fromDate).add(1, 'year').subtract(1, 'day') : null)
    const duration = from && to ? to.diff(from, 'days') : null

    cleanUp()

    setFrom(from)
    setInputFrom(from.format(format))
    setTo(to)
    setDuration(duration)
    
    setMode(componentMode.VIEW)
  }

  const handleQuickSelect = (date) => {
    setInsuredPeriod(date)
  }

  const handleShowEditMode = () => {
    setInputFrom(from.format(format))
    setInputTo(to.format(format))
    setMode(componentMode.EDIT)
  }

  const handleOnChangeFromDatePicker = (date) => {
    if (locked) {
      setInsuredPeriod(date)
    } else {
      const from = isDateValid(date) ? moment(date) : null
      const duration = from && to ? to.diff(from, 'days') : null
      setFrom(from)
      setInputFrom(from.format(format))
      setDuration(duration)
    }
  }

  const handleOnChangeToDatePicker = (date) => {
    console.log('handleOnChangeToDatePicker TODO')
    const to = isDateValid(date) ? moment(date) : null
    const duration = from && to ? to.diff(from, 'days') : null
    setTo(to)
    setDuration(duration)
  }

  const handleOnChangeFromDateText = (e) => {
    const txt = e.target.value
    setInputFrom(txt)

    const isDate = isDateValid(txt)
    if (isDate)
      setFromErr(false)
    else
      setFromErr(true)
  }

  const handleOnKeyPressFromDateText = (e) => {
    const txt = e.target.value
    if (e.key === 'Enter') {
      setInsuredPeriod(txt)
    }
  }

  const handleOnBlurFromDateText = (e) => {
    if (!popperOpen) {
      const txt = e.target.value
      setInsuredPeriod(txt)
    }
  }

  const handleOnFocusFromDateText = (e) => {
    const target = locked ? fromRef.current : parentRef.current
    setPopperAnchor(target)
    setPopperOpen(true)
  }

  const handleOnChangeToDateText = (e) => {}
  const handleOnKeyPressToDateText = (e) => {}
  const handleOnBlurToDateText = (e) => {}
  const handleOnFocusToDateText = (e) => {}


  const handleCloseCalendar = (e) => {
    cleanUp()
    setMode(componentMode.VIEW)
  }

  const toggleLocked = (e) => {
    const target = !locked ? fromRef.current : parentRef.current
    setPopperAnchor(target)
    setLocked(!locked)
  }

  const renderValue = () =>
    <div className={classes.rootViewValue}>
      <span className={classes.from}>{from.format(displayFormat)}</span>
      <span className={classes.separator}>&mdash;</span>
      <span className={classes.to}>{to.format(displayFormat)}</span>
      <span className={classes.duration}>({duration <= 1 ? duration + ' day' : ( duration === 364 ? '1 year' : duration + ' days' )})</span>
    </div>

  useEffect(() => {
    if (mode === componentMode.EDIT && fromRef.current) {
      fromRef.current.focus()
      fromRef.current.select()
    }
  }, [mode])


  const isUnselectedMode = mode === componentMode.UNSELECTED


  


  return (
    <SirField label={label} hint={isUnselectedMode ? 'Select start date. The 1st of the month and 1y duration are set automatically.' : null}>
      { isUnselectedMode ? 
        <div className={classes.root}>
          <SirButtonGroup data={commonDates} callbackClick={handleQuickSelect} />
        </div> : null }

      { mode === componentMode.VIEW ? 
        <SirReadOnlyField value={renderValue()} onClick={handleShowEditMode} /> : null }

      { mode === componentMode.EDIT ? 
        <div className={classes.root} ref={parentRef}>
          <SirTextField
            className={classes.date}
            inputRef={fromRef}
            value={inputFrom}
            onChange={handleOnChangeFromDateText}
            onKeyPress={handleOnKeyPressFromDateText}
            onBlur={handleOnBlurFromDateText}
            onFocus={handleOnFocusFromDateText}
            error={fromErr}
          />
          <Popper 
            className={classes.popper}
            open={popperOpen} 
            anchorEl={popperAnchor} 
            transition
            placement='bottom'
            disablePortal={false}
            modifiers={{
              flip: {
                enabled: true,
              },
              preventOverflow: {
                enabled: true,
                boundariesElement: 'scrollParent',
              },
              // arrow: {
              //   enabled: true,
              //   element: arrowRef,
              // },
            }}
          >
            {({ TransitionProps }) => (
              <Fade {...TransitionProps} timeout={350}>
                <Paper>
                  <LocalizationProvider dateAdapter={MomentUtils}>
                    <div style={{ display: 'flex', flexWrap: 'wrap' }}>
                      <div>
                        <StaticDatePicker
                          autoOk
                          displayStaticWrapperAs="desktop"
                          //allowKeyboardControl={true} // will set focus to calendar and not field as needed
                          value={from}
                          onChange={handleOnChangeFromDatePicker}
                          renderInput={props => <SirTextField {...props} />}
                        />
                      </div>
                      { !locked && //  className={classes.disabledDatePicker}
                        <div>
                          <StaticDatePicker
                            autoOk
                            disabled={true}
                            displayStaticWrapperAs="desktop"
                            //allowKeyboardControl={true} // will set focus to calendar and not field as needed
                            value={to}
                            onChange={handleOnChangeToDatePicker}
                            renderInput={props => <SirTextField {...props} />}
                          />
                        </div>
                      }
                    </div>
                    {!locked && <div style={{ textAlign: 'right', width: '100%', padding: '0 1rem 1rem 0' }}>
                      <Button onClick={handleCloseCalendar}>Close</Button>
                    </div>}
                  </LocalizationProvider>
                </Paper>
              </Fade>
            )}
          </Popper>
          <span className={classes.separator}>&mdash;</span>
          { locked ? 
            <span className={classes.to} style={{ flex: 1 }}>{to.format(displayFormat)}</span> :
            <SirTextField
              className={classes.date}
              inputRef={toRef}
              value={inputTo}
              onChange={handleOnChangeToDateText}
              onKeyPress={handleOnKeyPressToDateText}
              onBlur={handleOnBlurToDateText}
              onFocus={handleOnFocusToDateText}
              error={toErr}
            />
          }
          <div>
            <Button onClick={toggleLocked}>{locked ? 'Unlock' : 'Lock'}</Button>
          </div>
        </div>
        : null }

    </SirField>
  )
}



      {/* { mode === componentMode.EDIT ? 
        <BasicDatePicker 
          open={isCalOpen} 
          callbackOnChange={handleCallBackCalendarOnChange}
        /> : null } */}
      {/* 
      <Popover
        id={id}
        open={openP}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
      >
        <div className={classes.range}>
          <DatePicker
            //autoOk
            disableToolbar
            variant="static"
            value={from ? from.format(format) : undefined}
            onChange={handleChangeFromDate}
          />
          <DatePicker
            disabled
            disableToolbar
            variant="static"
            value={to ? to.format(format) : undefined}
            onChange={handleChangeToDate}
          />
        </div>
      </Popover> */}
// const locale = window.navigator.userLanguage || window.navigator.language   // TODO: set locale from server
  // const [startDate, setStartDate] = useSplatField("process_StartDate");
  // const [endDate, setEndDate] = useSplatField("process_EndDate");
  /*
  const handleFromDateChange = (date) => {
    setStartDate(date);
  };
  const handleFromDateError = (err) => {
    err && console.log("handleFromDateError", err);
  };

  const handleToDateChange = (date) => {
    setEndDate(date);
  };

  useEffect(() => {
    setStartDate(moment().format(format));
    setEndDate(moment().add(1, "year").format(format));
  }, []);

  useEffect(() => {
    setDuration(moment(endDate).diff(startDate, "months"));
  }, [startDate, endDate]);
  */
        {/* 
        <KeyboardDatePicker
          className={classes.picker}
          size="small"
          inputVariant="outlined"
          variant="inline"
          autoOk
          InputAdornmentProps={{ position: "start" }}
          format={format}
          value={startDate}
          onChange={(date) => handleFromDateChange(date)}
          onError={(err) => handleFromDateError(err)}
        />
        <KeyboardDatePicker
          className={classes.picker}
          size="small"
          inputVariant="outlined"
          variant="inline"
          autoOk
          InputAdornmentProps={{ position: "start" }}
          format={format}
          value={endDate}
          onChange={(date) => handleToDateChange(date)}
        />
        <div className={classes.duration}>{duration} months</div>
        */}

          // GroupButtonCallback
  // const handleCallback = (date) => {    
  //   const from = moment(date.Code)
  //   const to = moment(date.Code).add(1, 'year')
  //   const duration = to.diff(from, 'years')

  //   setFrom(from)
  //   setTo(to)
  //   setDuration(duration)
  // }

  // CalenderFrom
  // const handleChangeFromDate = (date) => {
  //   console.log('handleChangeFromDate', date)
  //   handleCloseCalendar()
  //   handleCallback({ Code: date.format(format) })
  // }

  // const handleChangeToDate = (date) => {
  //   console.log('handleChangeToDate', date)
  // }

  // const handleOnClick = (e) => {
  //   setAnchorEl(e.currentTarget)
  //   setClick(true)
  // }
  // const handleClose = () => setAnchorEl(null)

  // const handleCloseCalendar = () => {
  //   setClick(false)
  //   setOpen(false)
  // }


  // useEffect(() => {
  //   if (click)
  //     setOpen(true)
  // }, [click, setOpen])


  // const openP = Boolean(anchorEl)
  // const id = openP ? 'simple-popover' : undefined