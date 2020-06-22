import React, { useState, useEffect, useRef } from 'react'
import _ from 'lodash'
import moment from 'moment'
import { makeStyles } from "@material-ui/core/styles"
import FormRow from "../common/FormRow"
import SirButtonGroup from "../common/SirButtonGroup"
import SirReadOnlyField from "../common/SirReadOnlyField"
import SirTextField from '../common/SirTextField'

import MomentUtils from '@material-ui/pickers/adapter/moment'
import { StaticDatePicker, LocalizationProvider } from '@material-ui/pickers';

import Popper from '@material-ui/core/Popper'
import Fade from '@material-ui/core/Fade'
import Paper from '@material-ui/core/Paper'


export const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    alignItems: "center",
    position: "relative",
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

}));

const componentMode = { 
  SELECT: 'select', 
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

export default function InsuredPeriod(props) {
  const label = 'Insured period'
  const classes = useStyles()
  
  const [mode, setMode] = useState(componentMode.SELECT)
  const [from, setFrom] = useState(null)
  const [inputFrom, setInputFrom] = useState('')
  const [to, setTo] = useState(null)
  const [duration, setDuration] = useState(null)
  const [fromErr, setFromErr] = useState(false)
  const [popperAnchor, setPopperAnchor] = React.useState(null)
  const [popperOpen, setPopperOpen] = React.useState(false)

  const inputRef = useRef(null)

  const handleGroupButtonClick = (date) => {
    const from = moment(date)
    const to = moment(date).add(1, 'year').subtract(1, 'day')
    const duration = to.diff(from, 'days')

    setPopperOpen(false)
    setFromErr(false)

    setFrom(from)
    setInputFrom(from.format(format))
    setTo(to)
    setDuration(duration)
    
    setMode(componentMode.VIEW)
  }

  const handleShowEditMode = () => {
    setMode(componentMode.EDIT)
    

  }

  const handleDatePickerOnChange = (date) => {
    handleGroupButtonClick(date)
  }

  const isDateValid = (date) => moment(date, format, true).isValid()
  const validateField = (txt) => {
    const isDate = isDateValid(txt)
    if (isDate)
      handleGroupButtonClick(txt)
  }

  const handleOnFromTextChange = (e) => {
    const txt = e.target.value
    setInputFrom(txt)

    const isDate = isDateValid(txt)
    if (isDate)
      setFromErr(false)
    else
      setFromErr(true)
  }

  const handleOnKeyPress = (e) => {
    const txt = e.target.value
    if (e.key === 'Enter') {
      validateField(txt)
    }
  }

  const handleOnBlur = (e) => {
    if (!popperOpen) {
      const txt = e.target.value
      validateField(txt)
      setPopperOpen(false)
    }
  }

  const handleOnFocus = (e) => {
    setPopperAnchor(e.currentTarget)
    setPopperOpen(true)
  }

  const renderValue = () =>
    <div className={classes.rootViewValue}>
      <span className={classes.from}>{from.format(displayFormat)}</span>
      <span className={classes.separator}>&mdash;</span>
      <span className={classes.to}>{to.format(displayFormat)}</span>
      <span className={classes.duration}>({duration <= 1 ? duration + ' day' : duration + ' days'})</span>
    </div>

  useEffect(() => {
    if (mode === componentMode.EDIT && inputRef.current) {
      inputRef.current.focus()
      inputRef.current.select()
    }
  }, [mode])

  return (
    <FormRow label={label}>
      { mode === componentMode.SELECT ? 
        <div className={classes.root}>
          <SirButtonGroup data={commonDates} callbackClick={handleGroupButtonClick} />
        </div> : null }

      { mode === componentMode.VIEW ? 
        <SirReadOnlyField value={renderValue()} onClick={handleShowEditMode} /> : null }

      { mode === componentMode.EDIT ? 
        <>
          <SirTextField
            inputRef={inputRef}
            value={inputFrom}
            onChange={handleOnFromTextChange}
            onKeyPress={handleOnKeyPress}
            onBlur={handleOnBlur}
            onFocus={handleOnFocus}
            error={fromErr}
          /> 
          <Popper 
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
                    <StaticDatePicker
                      autoOk
                      displayStaticWrapperAs="desktop"
                      value={from}
                      onChange={handleDatePickerOnChange}
                      renderInput={props => <SirTextField {...props} />}
                    />
                  </LocalizationProvider>
                </Paper>
              </Fade>
            )}
          </Popper>
        </>
        : null }

    </FormRow>
  );
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