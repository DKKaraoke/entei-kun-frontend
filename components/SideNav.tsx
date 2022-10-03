/**
 * SideNav.tsx
 * @author soltia48
 * @date 2020-08-07
 */

import {
  Divider,
  Drawer,
  Hidden,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from "@material-ui/core";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import { Home, Info } from "@material-ui/icons";
import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";

import { theme } from "../plugins/theme";

interface SideNavProps {
  width: number;
  mobileOpen: boolean;
  toggle: () => void;
}

const useStyles = makeStyles<Theme, SideNavProps>((theme) =>
  createStyles({
    root: {
      [theme.breakpoints.up("sm")]: {
        width: (props) => props.width,
        flexShrink: 0,
      },
    },
    paper: {
      width: (props) => props.width,
    },
    toolbar: theme.mixins.toolbar,
  })
);

interface DrawerItem {
  id: string;
  icon: JSX.Element;
  label: string;
  href: string;
}

export const SideNav: React.FC<SideNavProps> = (props: SideNavProps) => {
  const classes = useStyles(props);
  const router = useRouter();

  const drawerItems: DrawerItem[] = [
    {
      id: "home",
      icon: <Home />,
      label: "ホーム",
      href: "/",
    },
    {
      id: "about",
      icon: <Info />,
      label: "バージョン情報",
      href: "/about",
    },
  ];

  const drawer = (
    <React.Fragment>
      <div className={classes.toolbar}>
        <ListItem></ListItem>
      </div>
      <Divider />
      <List>
        {drawerItems.map((item) => (
          <Link key={item.id} href={item.href}>
            <ListItem button selected={item.href === router.pathname}>
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText primary={item.label} />
            </ListItem>
          </Link>
        ))}
      </List>
    </React.Fragment>
  );

  return (
    <React.Fragment>
      <div className={classes.root} aria-label="side navigation">
        <Hidden smUp implementation="js">
          <Drawer
            variant="temporary"
            anchor={theme.direction === "rtl" ? "right" : "left"}
            open={props.mobileOpen}
            onClose={props.toggle}
            classes={{
              paper: classes.paper,
            }}
            ModalProps={{
              keepMounted: true, // Better open performance on mobile
            }}
          >
            {drawer}
          </Drawer>
        </Hidden>
        <Hidden xsDown implementation="js">
          <Drawer
            classes={{
              paper: classes.paper,
            }}
            variant="permanent"
            open
          >
            {drawer}
          </Drawer>
        </Hidden>
      </div>
    </React.Fragment>
  );
};
