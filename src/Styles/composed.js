// import vars

import { makeStyles } from '@material-ui/core/styles'

export const useGlobalStyles = makeStyles((theme) => ({
  rootField: {
    width: '100%',
  },
  option: {
    fontSize: theme.typography.pxToRem(14)
  }
}))
