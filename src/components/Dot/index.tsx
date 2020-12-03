import classnames from "classnames";
import React from "react";

import { makeStyles, useTheme } from "@material-ui/core";
import { Palette } from "@material-ui/core/styles/createPalette";

// styles
const useStyles = makeStyles(theme => ({
  dotBase: {
    width: 8,
    height: 8,
    backgroundColor: theme.palette.text.hint,
    borderRadius: "50%",
    transition: theme.transitions.create("background-color"),
  },
  dotSmall: {
    width: 5,
    height: 5,
  },
  dotLarge: {
    width: 11,
    height: 11,
  },
}));

interface IDotProps {
  size?: string;
  color?: keyof Palette;
}

export const Dot: React.FunctionComponent<IDotProps> = ({ size, color }) => {
  const classes = useStyles();
  const theme = useTheme();

  return (
    <div
      className={classnames(classes.dotBase, {
        [classes.dotLarge]: size === "large",
        [classes.dotSmall]: size === "small",
      })}
      style={{
        backgroundColor:
          color && theme.palette[color] && (theme.palette[color] as any).main,
      }}
    />
  );
};
