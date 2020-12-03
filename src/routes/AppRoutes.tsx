import classNames from "classnames";
import React, { FC, lazy, Suspense } from "react";
import { Route, RouteComponentProps, Switch } from "react-router-dom";

import { makeStyles, Theme } from "@material-ui/core";

import Header from "../components/Header/Header";
import { Sidebar } from "../components/Sidebar/Sidebar";
import { useLayoutState } from "../contexts";

// import Dashboard from "../pages/Dashboard";
// import Temp from "../pages/pages/Dashboard";
const Dashboard = lazy(() => import("../pages/Dashboard"));
const Temp = lazy(() => import("../pages/Temp"));

export interface IAppRoutesProps extends Partial<RouteComponentProps> {}

export const AppRoutes: FC<IAppRoutesProps> = (props: IAppRoutesProps) => {
  const classes = styles();
  // global
  const layoutState = useLayoutState();

  return (
    <div className={classes.root}>
      <Header history={props.history} />
      <Sidebar location={props.location} />
      <div
        className={classNames(classes.content, {
          [classes.contentShift]: layoutState.isSidebarOpened,
        })}
      >
        <div className={classes.fakeToolbar} />
        <Suspense fallback={<div>Loading...</div>}>
          <Switch>
            <Route exact path="/app/dashboard" component={Dashboard} />
            <Route path="/app/temp" component={Temp} />
          </Switch>
        </Suspense>
      </div>
    </div>
  );
};

const styles = makeStyles((theme: Theme) => ({
  root: {
    display: "flex",
    maxWidth: "100vw",
    overflowX: "hidden",
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
    width: `calc(100vw - 240px)`,
    minHeight: "100vh",
  },
  contentShift: {
    width: `calc(100vw - ${240 + theme.spacing(6)}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  fakeToolbar: {
    ...theme.mixins.toolbar,
  },
}));
