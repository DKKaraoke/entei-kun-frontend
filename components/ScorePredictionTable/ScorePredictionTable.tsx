/**
 * UserSelector.ts
 * @author soltia48
 * @date 2021-07-23
 */

import {
  Avatar,
  Box,
  Button,
  Checkbox,
  createStyles,
  FormControlLabel,
  FormGroup,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  MenuItem,
  Paper,
  Select,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { Star, StarBorder, Sync } from "@material-ui/icons";
import axios from "axios";
import dayjs from "dayjs";
import React, { useEffect, useState } from "react";

import { DamPreciseScoringTotalScoreType } from "~/types/DamPreciseScoringTotalScoreType";
import { ScorePrediction } from "~/types/GetScorePredictionsResponse";

const useStyles = makeStyles((theme) =>
  createStyles({
    root: {
      width: "100%",
    },
    paper: {
      width: "100%",
      marginBottom: theme.spacing(2),
    },
    table: {
      minWidth: 750,
    },
    visuallyHidden: {
      border: 0,
      clip: "rect(0 0 0 0)",
      height: 1,
      margin: -1,
      overflow: "hidden",
      padding: 0,
      position: "absolute",
      top: 20,
      width: 1,
    },
  })
);

export const ScorePredictionTable: React.FC = () => {
  const classes = useStyles();

  const [scorePredictions, setScorePredictions] = useState<ScorePrediction[]>([]);
  const [now, setNow] = useState(dayjs().set("millisecond", 0));

  const [timeLimit, setTimeLimit] = useState(600);
  const [include100, setInclude100] = useState(true);
  const [includeQuadruple, setIncludeQuadruple] = useState(true);
  const [includeNormal, setIncludeNormal] = useState(false);
  const [isJst, setIsJst] = useState(false);

  const handleChangeTimeLimit = (event) => {
    setTimeLimit(event.target.value);
  };

  const handleChangeInclude100 = (event) => {
    setInclude100(event.target.checked);
  };

  const handleChangeIncludeQuadruple = (event) => {
    setIncludeQuadruple(event.target.checked);
  };

  const handleChangeIncludeNormal = (event) => {
    setIncludeNormal(event.target.checked);
  };

  const handleChangeIsJst = (event) => {
    setIsJst(event.target.checked);
  };

  const loadScorePredictions = async () => {
    const getScorePredictions = async () => {
      return axios.get(`${process.env.NEXT_PUBLIC_API_URI}/_score_predictions`, {
        params: { timeLimit, include100, includeQuadruple, includeNormal, isJst },
      });
    };
    const usersResponse = await getScorePredictions();
    setScorePredictions(usersResponse.data.scorePredictions);
  };

  useEffect(() => {
    setInterval(() => {
      setNow(dayjs().set("millisecond", 0));
    }, 100);
  }, []);

  useEffect(() => {
    loadScorePredictions();
  }, [timeLimit, include100, includeQuadruple, includeNormal, isJst]);

  return (
    <div className={classes.root}>
      <Box mx={2} mb={2}>
        <FormGroup row>
          <FormControlLabel
            control={<Checkbox defaultChecked onChange={handleChangeInclude100} />}
            label="100 点"
          />
          <FormControlLabel
            control={<Checkbox defaultChecked onChange={handleChangeIncludeQuadruple} />}
            label="クアドラプル"
          />
          <FormControlLabel
            control={<Checkbox onChange={handleChangeIncludeNormal} />}
            label="通常点"
          />
          <FormControlLabel
            control={<Checkbox onChange={handleChangeIsJst} />}
            label="LIVE DAM STADIUM"
          />
          <Select value={timeLimit} onChange={handleChangeTimeLimit}>
            <MenuItem value={600}>10 分間</MenuItem>
            <MenuItem value={3600}>1 時間</MenuItem>
            <MenuItem value={14400}>4 時間</MenuItem>
          </Select>
          <Box mx={2}>
            <Button variant="contained" onClick={loadScorePredictions}>
              再読込
            </Button>
          </Box>
        </FormGroup>
      </Box>
      <Paper className={classes.paper}>
        <List>
          {scorePredictions.map((row) => {
            const time = dayjs(row.time);
            const timeDiff = time.diff(now, "seconds");
            const timeDiffMinus = timeDiff < 0;
            if (timeDiff < -4) {
              return;
            }

            const timeDiffHours = Math.abs(time.diff(now, "hours") % 24);
            const timeDiffMinutes = Math.abs(time.diff(now, "minutes") % 60);
            const timeDiffSeconds = Math.abs(time.diff(now, "seconds") % 60);

            return (
              <ListItem
                key={row.time}
                style={{ background: timeDiffMinus ? "#bcbcbc" : undefined }}
              >
                <ListItemAvatar>
                  <Avatar>
                    {row.scoreType === DamPreciseScoringTotalScoreType.Hundred && (
                      <Star fontSize="large" />
                    )}
                    {row.scoreType === DamPreciseScoringTotalScoreType.Quadruple && (
                      <StarBorder fontSize="large" />
                    )}
                    {row.scoreType === DamPreciseScoringTotalScoreType.Normal && (
                      <Sync fontSize="large" />
                    )}
                  </Avatar>
                </ListItemAvatar>
                <ListItemText
                  primary={`${row.time} - ${row.scoreString} 点`}
                  secondary={`${timeDiffHours} 時間 ${timeDiffMinutes} 分 ${timeDiffSeconds} 秒${
                    timeDiffMinus ? "前" : "後"
                  }`}
                />
              </ListItem>
            );
          })}
        </List>
      </Paper>
    </div>
  );
};
