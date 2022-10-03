/**
 * _error.tsx
 * @author SONODA Yuda
 * @date 2021-07-23
 */

import { Grid, makeStyles, Typography } from "@material-ui/core";
import { GetServerSideProps } from "next";
import Head from "next/head";
import React from "react";

import { Layout } from "~/components/Layout";

const statusCodes: { [code: number]: string } = {
  400: "Bad Request",
  401: "Unauthorized",
  402: "Payment Required",
  403: "Forbidden",
  404: "Not Found",
  405: "Method Not Allowed",
  406: "Not Acceptable",
  407: "Proxy Authentication Required",
  408: "Request Timeout",
  409: "Conflict",
  410: "Gone",
  411: "Length Required",
  412: "Precondition Failed",
  413: "Payload Too Large",
  414: "URI Too Long",
  415: "Unsupported Media Type",
  416: "Range Not Satisfiable",
  417: "Expectation Failed",
  418: "I'm a teapot",
  421: "Misdirected Request",
  422: "Unprocessable Entity",
  423: "Locked",
  424: "Failed Dependency",
  425: "Too Early",
  426: "Upgrade Required",
  428: "Precondition Required",
  429: "Too Many Requests",
  431: "Request Header Fields Too Large",
  451: "Unavailable For Legal Reasons",
  500: "Internal Server Error",
  501: "Not Implemented",
  502: "Bad Gateway",
  503: "Service Unavailable",
  504: "Gateway Timeout",
  505: "HTTP Version Not Supported",
  506: "Variant Also Negotiates",
  507: "Insufficient Storage",
  508: "Loop Detected",
  510: "Not Extended",
  511: "Network Authentication Required",
};

interface MyErrorProps {
  statusCode: number;
  message: string;
}

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

const MyError: React.FC<MyErrorProps> = (props) => {
  const classes = useStyles();
  const { statusCode, message } = props;

  return (
    <React.Fragment>
      <Head>
        <title>
          {statusCode} {message} | エンテイくん
        </title>
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
              {statusCode}
              <br />
              {message}
            </Typography>
          </Grid>
        </Grid>
      </Layout>
    </React.Fragment>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ res, query }) => {
  const statusCode = statusCodes[res.statusCode] ? res.statusCode : "000";
  const message = statusCodes[statusCode]
    ? statusCodes[statusCode]
    : typeof query.error === "string"
    ? query.error
    : "An unexpected error has occurred";
  return { props: { statusCode, message } };
};

export default MyError;
