/**
 * about.tsx
 * @author soltia48
 * @date 2021-05-23
 */

import { Grid, Typography } from "@material-ui/core";
import Head from "next/head";
import React from "react";

import { Layout } from "../components/Layout";

const About: React.FC = () => {
  return (
    <React.Fragment>
      <Head>
        <title>バージョン情報 | エンテイくん</title>
      </Head>
      <Layout>
        <Grid container alignItems="center" justify="center" style={{ minHeight: "100%" }}>
          <Grid item xs={10}>
            <Typography variant="h3" align="center">
              エンテイくん
            </Typography>
            <Typography variant="h4" align="center">
              v1.2.0-821004001
            </Typography>
          </Grid>
        </Grid>
      </Layout>
    </React.Fragment>
  );
};

export default About;
