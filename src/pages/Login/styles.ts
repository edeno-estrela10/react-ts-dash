
import { makeStyles } from "@material-ui/core";
import { green } from "@material-ui/core/colors";

export const useStyles = makeStyles(theme => ({
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  btnWrapper: {
    width: "100%",
    position: 'relative',
  },
  buttonProgress: {
    color: green[500],
    position: 'absolute',
    top: '50%',
    left: '50%',
    marginTop: -12,
    marginLeft: -12,
  },
  errorMessage: {
    textAlign: "center",
  },
}));
