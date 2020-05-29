import { makeStyles } from "@material-ui/core/styles";

export const useStyles = makeStyles((theme) => ({
         root: {
           display: "flex",
           flexDirection: "column",
           maxWidth: "600px",
           margin: "6rem auto"
         },
         controlContainer: {
           margin: "0.5em",
         },
         fullWidthTextField: {
           marginTop: theme.spacing(1),
           marginLeft: theme.spacing(1),
           marginRight: theme.spacing(1),
           width: "100%",
         },
         textField: {
           marginTop: theme.spacing(1),
           marginLeft: theme.spacing(1),
           marginRight: theme.spacing(1),
           width: "30%",
         },
         formContainer: { width: "100%" },
       }));
