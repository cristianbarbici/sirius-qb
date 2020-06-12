import React from "react"
import clsx from "clsx"
import { makeStyles } from '@material-ui/core/styles'

export const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    position: 'relative',
    margin: 0,
    padding: 0, //theme.spacing(3, 6)
    
    '& + &': {
      //borderTop: 'solid 1px rgba(0,0,0,.08)',
    }

    /*

    $spacing: 1.5rem;


  &.small {
    padding-top: 0;
    margin-top: -($spacing / 2);
    margin-bottom: -($spacing / 2);
  }

  &.border {
    @include sir-section-before(0);
    padding: ($spacing * 2);
  }

  &.action {
    flex-direction: row;
  }

  &.hidden {
    display: none;
  } 
    */
  },
  row: {
    flexDirection: 'row'
  }
}));

export default function Section(props) {
  const { className, row = 'false' } = props
  const classes = useStyles()

  return (
    <div className={clsx(classes.root, className, {[classes.row]: row !== 'false'})} {...props} />
  )
}