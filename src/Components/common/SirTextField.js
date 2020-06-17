import React from 'react'
import TextField from '@material-ui/core/TextField'
import InputAdornment from '@material-ui/core/InputAdornment'
import { makeStyles } from '@material-ui/core/styles'
import { pxFieldHeight } from '../../Styles/colors'
import SearchIcon from '@material-ui/icons/Search'

export const useStyles = makeStyles((theme) => ({
  root: {
    '& .MuiInputBase-root': {
      fontSize: '0.875rem',
      lineHeight: '1.43',
      height: pxFieldHeight
    },

    '& .MuiInputBase-input': {
      height: 'unset',
      padding: theme.spacing(1, 2)
    },

    '& .MuiOutlinedInput-adornedEnd .MuiSvgIcon-root': {
      color: 'rgba(0,0,0,.24)',
      fontSize: '1.25rem',
    },

    '& .MuiOutlinedInput-adornedStart .MuiSvgIcon-root': {
      color: 'rgba(0,0,0,.24)',
      fontSize: '1.25rem',
    }
  }
}))

export default function SirTextField(props) {
  const { startIcon, ...other } = props
  const classes = useStyles()

  return (
    <TextField
      className={classes.root}
      variant='outlined'
      size='small'
      InputProps={{
        startAdornment: (
          startIcon === 'search' ?
          <InputAdornment position="start">
            <SearchIcon />
          </InputAdornment> :
          null
        ),
      }}
      InputLabelProps={{ shrink: true }}
      fullWidth
      hiddenLabel
      {...other}
    />
  )
}