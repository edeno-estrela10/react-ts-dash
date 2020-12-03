import classnames from "classnames";
import React, { forwardRef, useState } from "react";
import { NavLink, NavLinkProps, RouteComponentProps } from "react-router-dom";

import {
    Collapse, Divider, List, ListItem, ListItemIcon, ListItemText, Typography
} from "@material-ui/core";
import { Inbox as InboxIcon } from "@material-ui/icons";

import { Dot } from "../Dot";
import useStyles from "./styles";

interface ISidebarLinkProps extends Partial<RouteComponentProps> {
  type?: "title" | "divider" | string;
  label?: string;
  link?: string;
  icon?: JSX.Element;
  children?: {
    label: string;
    link: string;
  }[];
  isSidebarOpened?: boolean;
  nested?: boolean;
}

export const SidebarLink: React.FunctionComponent<ISidebarLinkProps> = props => {
  const classes = useStyles();

  // local
  const [isOpen, setIsOpen] = useState(false);
  const isLinkActive =
    props.link &&
    props.location &&
    (props.location.pathname === props.link ||
      props.location.pathname.indexOf(props.link) !== -1);

  const toggleCollapse = (e: Event | any) => {
    if (props.isSidebarOpened) {
      e.preventDefault();
      setIsOpen(!isOpen);
    }
  };

  if (props.type === "title") {
    return (
      <Typography
        className={classnames(classes.linkText, classes.sectionTitle, {
          [classes.linkTextHidden]: !props.isSidebarOpened,
        })}
      >
        {props.label}
      </Typography>
    );
  } else if (props.type === "divider") {
    return <Divider className={classes.divider} />;
  }

  if (!props.children) {
    return (
      <ListItem
        button
        component={forwardRef((props: NavLinkProps, ref: any) => (
          <NavLink exact {...props} innerRef={ref} />
        ))}
        // component={NavLink}
        to={props.link ? props.link : ""}
        className={classes.link}
        classes={{
          root: classnames({
            [classes.linkActive]: isLinkActive && !props.nested,
            [classes.linkNested]: props.nested,
          }),
        }}
      >
        <ListItemIcon
          className={classnames(classes.linkIcon, {
            [classes.linkIconActive]: isLinkActive,
          })}
        >
          {props.nested ? (
            <Dot color={isLinkActive ? "primary" : undefined} />
          ) : (
            props.icon
          )}
        </ListItemIcon>
        <ListItemText
          classes={{
            primary: classnames(classes.linkText, {
              [classes.linkTextActive]: isLinkActive,
              [classes.linkTextHidden]: !props.isSidebarOpened,
            }),
          }}
          primary={props.label}
        />
      </ListItem>
    );
  }

  return (
    <>
      <ListItem
        button
        // component={Link}
        onClick={toggleCollapse}
        className={classes.link}
        // to={props.link ? props.link : ""}
        disableRipple
      >
        <ListItemIcon
          className={classnames(classes.linkIcon, {
            [classes.linkIconActive]: isLinkActive,
          })}
        >
          {props.icon ? props.icon : <InboxIcon />}
        </ListItemIcon>
        <ListItemText
          classes={{
            primary: classnames(classes.linkText, {
              [classes.linkTextActive]: isLinkActive,
              [classes.linkTextHidden]: !props.isSidebarOpened,
            }),
          }}
          primary={props.label}
        />
      </ListItem>
      {props.children && (
        <Collapse
          in={isOpen && props.isSidebarOpened}
          timeout="auto"
          unmountOnExit
          className={classes.nestedList}
        >
          <List component="div" disablePadding>
            {props.children.map(childrenLink => (
              <SidebarLink
                key={childrenLink && childrenLink.link}
                location={props.location}
                isSidebarOpened={props.isSidebarOpened}
                nested
                {...childrenLink}
              />
            ))}
          </List>
        </Collapse>
      )}
    </>
  );
};
