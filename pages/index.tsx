/**
 * index.tsx
 * @author soltia48
 * @date 2021-05-23
 */

import Head from "next/head";
import React from "react";

import { Layout } from "~/components/Layout";
import { ScorePredictionTable } from "~/components/ScorePredictionTable/ScorePredictionTable";

const Home = () => {
  return (
    <React.Fragment>
      <Head>
        <title>エンテイくん</title>
      </Head>
      <Layout>
        <ScorePredictionTable />
      </Layout>
    </React.Fragment>
  );
};

export default Home;
