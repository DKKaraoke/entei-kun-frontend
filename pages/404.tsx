/**
 * _error.tsx
 * @author SONODA Yuda
 * @date 2021-07-23
 */

import { Grid, makeStyles, Typography } from "@material-ui/core";
import Head from "next/head";
import React from "react";

import { Layout } from "~/components/Layout";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    height: "100%",
  },
  message: {
    borderLeft: "4px solid",
    borderColor: "#BD1E48",
    paddingTop: theme.spacing(1),
    paddingBottom: theme.spacing(1),
    paddingLeft: theme.spacing(3),
  },
}));

const NotFound: React.FC = () => {
  const classes = useStyles();

  return (
    <React.Fragment>
      <Head>
        <title>404 Not Found | エンテイくん</title>
      </Head>
      <Layout>
        <Grid
          container
          className={classes.root}
          alignItems="center"
          justifyContent="center"
          spacing={2}
        >
          <Grid item xs={6}>
            <Typography className={classes.message} variant="h3">
              404
              <br />
              Not Found
            </Typography>
          </Grid>
        </Grid>
      </Layout>
    </React.Fragment>
  );
};

export default NotFound;
