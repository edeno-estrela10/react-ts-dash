import PropTypes from "prop-types";
import React from "react";

import { makeStyles, Typography } from "@material-ui/core";

import BaseLogo from "../images/logo-2019.svg";

const AuthHeader = ({ title = "" }) => {
  const classes = useStyles();

  return (
    <Typography component="h1" variant="h4" className={classes.root}>
      <img src={BaseLogo} className={classes.logo} alt="Estrela 10" />
      <span>{title}</span>
    </Typography>
  );
};

AuthHeader.propTypes = {
  title: PropTypes.string,
};

const useStyles = makeStyles(theme => ({
  root: {
    display: "block",
    textAlign: "center",
    paddingTop: "50px",
    fontWeight: "bold",
    color: theme.palette.text.primary,
  },
  logo: {
    color: theme.palette.primary.main,
    position: "relative",
    top: "1px",
    width: "100%",
  },
}));

export default AuthHeader;
