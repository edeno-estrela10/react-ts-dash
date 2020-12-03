import classNames from "classnames";
import { History } from "history";
import React, { useState } from "react";

import { AppBar, IconButton, Menu, MenuItem, Toolbar, Typography } from "@material-ui/core";
import {
    ArrowBack as ArrowBackIcon, ExitToApp as ExitToAppIcon, Menu as MenuIcon, Person as AccountIcon
} from "@material-ui/icons";

import {
    signOut, toggleSidebar, useLayoutDispatch, useLayoutState, useUserDispatch, useUserState
} from "../../contexts";
import useStyles from "./styles";

export interface IHeaderProps {
  history?: History;
}

const Header: React.FC<IHeaderProps> = (props: IHeaderProps) => {
  const classes = useStyles();

  // global
  const userState = useUserState();
  const layoutState = useLayoutState();
  const layoutDispatch = useLayoutDispatch();
  const userDispatch = useUserDispatch();

  // local
  const [profileMenu, setProfileMenu] = useState<HTMLButtonElement | null>(
    null,
  );

  return (
    <AppBar position="fixed" className={classes.appBar}>
      <Toolbar className={classes.toolbar}>
        <IconButton
          color="inherit"
          onClick={() => toggleSidebar(layoutDispatch)}
          className={classNames(
            classes.headerMenuButton,
            classes.headerMenuButtonCollapse,
          )}
        >
          {layoutState.isSidebarOpened ? (
            <ArrowBackIcon
              classes={{
                root: classNames(
                  classes.headerIcon,
                  classes.headerIconCollapse,
                ),
              }}
            />
          ) : (
            <MenuIcon
              classes={{
                root: classNames(
                  classes.headerIcon,
                  classes.headerIconCollapse,
                ),
              }}
            />
          )}
        </IconButton>
        <Typography variant="h6" className={classes.logotype}>
          Controle Etiquetas - Estrela10
        </Typography>

        <div className={classes.grow} />

        <IconButton
          aria-haspopup="true"
          color="inherit"
          className={classes.headerMenuButton}
          aria-controls="profile-menu"
          onClick={e => setProfileMenu(e.currentTarget)}
        >
          <AccountIcon classes={{ root: classes.headerIcon }} />
        </IconButton>
        <Menu
          id="profile-menu"
          open={Boolean(profileMenu)}
          anchorEl={profileMenu}
          onClose={() => setProfileMenu(null)}
          className={classes.headerMenu}
          classes={{ paper: classes.profileMenu }}
          disableAutoFocusItem
        >
          <div className={classes.profileMenuUser}>
            <Typography variant="h4">{userState.user?.nome}</Typography>
          </div>
          <MenuItem
            className={classNames(
              classes.profileMenuItem,
              classes.headerMenuItem,
            )}
          >
            <AccountIcon className={classes.profileMenuIcon} /> Profile
          </MenuItem>
          <MenuItem
            className={classNames(
              classes.profileMenuItem,
              classes.headerMenuItem,
            )}
            onClick={() => signOut(userDispatch, props.history)}
          >
            <ExitToAppIcon className={classes.profileMenuIconSignOut} /> Sair
          </MenuItem>
        </Menu>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
