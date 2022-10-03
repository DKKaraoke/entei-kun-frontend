/**
 * Layout.tsx
 * @author soltia48
 * @date 2020-08-07
 */

import { CssBaseline } from "@material-ui/core";
import { createStyles, makeStyles, ThemeProvider } from "@material-ui/core/styles";
import React from "react";

import { HeadBar } from "../components/HeadBar";
import { SideNav } from "../components/SideNav";
import { theme } from "../plugins/theme";

const drawerWidth = 240;

const useStyles = makeStyles((theme) =>
  createStyles({
    root: {
      display: "flex",
      minHeight: `calc(100% - ${theme.mixins.toolbar.minHeight}px)`,
    },
    content: {
      flexGrow: 1,
      padding: theme.spacing(2),
    },
    // For content to be below app bar
    toolbar: theme.mixins.toolbar,
  })
);

export const Layout: React.FC = ({ children }) => {
  const classes = useStyles();

  const [mobileOpen, setMobileOpen] = React.useState(false);
  // const [showBottomNav, setShowBottomNav] = React.useState(false);

  const handleSideNavToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  // Disable bouce
  // useEffect(() => {
  //   document.addEventListener(
  //     "touchstart",
  //     (event) => {
  //       event.preventDefault();
  //     },
  //     { passive: false }
  //   );
  // });

  // const onChangeShowState = (isShow: boolean) => setShowBottomNav(isShow);

  return (
    <React.Fragment>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <div className={classes.root}>
          <HeadBar sideNavWidth={drawerWidth} sideNavToggle={handleSideNavToggle} />
          <SideNav width={drawerWidth} mobileOpen={mobileOpen} toggle={handleSideNavToggle} />
          <main className={classes.content}>
            <div className={classes.toolbar} />
            {children}
          </main>
        </div>
      </ThemeProvider>

      <style jsx global>{`
        html,
        body {
          height: 100%;
        }
      `}</style>
    </React.Fragment>
  );
};
