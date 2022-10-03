/**
 * HeadBar.tsx
 * @author soltia48
 * @date 2020-08-07
 */

import { AppBar, IconButton, Link, Toolbar, Typography } from "@material-ui/core";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import { Menu } from "@material-ui/icons";
import NextLink from "next/link";
import React from "react";

interface HeadBarProps {
  sideNavWidth: number;
  sideNavToggle: () => void;
}

const useStyles = makeStyles<Theme, HeadBarProps>((theme) =>
  createStyles({
    root: {
      [theme.breakpoints.up("sm")]: {
        width: (props) => `calc(100% - ${props.sideNavWidth}px)`,
        marginLeft: (props) => props.sideNavWidth,
      },
    },
    navButton: {
      marginRight: theme.spacing(2),
      [theme.breakpoints.up("sm")]: {
        display: "none",
      },
    },
  })
);

export const HeadBar: React.FC<HeadBarProps> = (props) => {
  const classes = useStyles(props);

  return (
    <React.Fragment>
      <AppBar position="fixed" className={classes.root}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open side navigation"
            edge="start"
            onClick={props.sideNavToggle}
            className={classes.navButton}
          >
            <Menu />
          </IconButton>
          <NextLink href="/">
            <Link href="#" color="inherit">
              <Typography variant="h6" noWrap>
                エンテイくん
              </Typography>
            </Link>
          </NextLink>
        </Toolbar>
      </AppBar>
    </React.Fragment>
  );
};
