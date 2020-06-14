import React, { useEffect, useState } from "react";
import { withStyles, makeStyles } from "@material-ui/core/styles";

import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Grid,
  Switch,
  FormControlLabel,
} from "@material-ui/core";

import pokeClient from "../utils/client";
import { DateTime } from "luxon";

const CustomCell = withStyles((theme) => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

const CustomRow = withStyles((theme) => ({
  root: {
    "&:nth-of-type(odd)": {
      backgroundColor: theme.palette.action.hover,
    },
  },
}))(TableRow);

const useStyles = makeStyles({
  table: {
    minWidth: 700,
  },
});

const PokeBoard = ({ loggedInPlayer, pokeData }) => {
  const classes = useStyles();

  const [global, setGlobal] = useState(false);
  const [dataToDisplay, setDataToDisplay] = useState(null);

  useEffect(() => {
    if (global) {
      pokeClient.get("/board/ranking").then((res) => {
        setDataToDisplay(res.data);
      }).catch(err => console.error(err));
    } else {
      if (loggedInPlayer) {
        setDataToDisplay(loggedInPlayer.games);
      }
    }
  }, [loggedInPlayer, global]);

  const handlePokeName = (id) => {
    if (!id) return "Unknown Pokemon";
    const targetPoke = pokeData.find((p) => p.id === id);
    if (targetPoke) return targetPoke.name.english;
    else return "Unknown Pokemon";
  };

  const handleFlipSwitch = () => {
    setGlobal((global) => !global);
  };

  return (
    <Grid
      container
      direction="row"
      justify="center"
      alignItems="center"
      spacing={4}
    >
      <Grid item xs={11} md={7}>
        <TableContainer component={Paper}>
          <Table className={classes.table} aria-label="customized table">
            <TableHead>
              <TableRow>
                <CustomCell>Player</CustomCell>
                <CustomCell align="right">
                  {global ? "Games played" : "Game Played On"}
                </CustomCell>
                <CustomCell align="right">
                  {global ? "Wins" : "My Pokemon"}
                </CustomCell>
                <CustomCell align="right">
                  {global ? "Losses" : "Against"}
                </CustomCell>
                <CustomCell align="right">
                  {global ? "Rank" : "Result"}
                </CustomCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {dataToDisplay &&
                dataToDisplay.length &&
                dataToDisplay.map((row, index) => {
                  return (
                    <CustomRow key={index}>
                      <CustomCell component="th" scope="row">
                        {global
                          ? row.name
                          : loggedInPlayer
                          ? loggedInPlayer.username
                          : "You"}
                      </CustomCell>
                      <CustomCell align="right">
                        {global
                          ? row.gamesPlayed
                          : DateTime.fromISO(row.played_on).toLocaleString(
                              DateTime.DATETIME_SHORT_WITH_SECONDS
                            )}
                      </CustomCell>
                      <CustomCell align="right">
                        {global
                          ? row.gamesWon
                          : handlePokeName(row.chosenPokemonId)}
                      </CustomCell>
                      <CustomCell align="right">
                        {global
                          ? row.gamesLost
                          : handlePokeName(row.adversaryPokemonId)}
                      </CustomCell>
                      <CustomCell align="right">
                        {global
                          ? `#${row.rank}`
                          : row.winner === false
                          ? "Loss"
                          : "Win"}
                      </CustomCell>
                    </CustomRow>
                  );
                })}
            </TableBody>
          </Table>
        </TableContainer>

        <FormControlLabel
          control={
            <Switch
              checked={global}
              onChange={handleFlipSwitch}
              color="primary"
              name="checked"
              inputProps={{ "aria-label": "Switch to select leaderboard info" }}
            />
          }
          label={global ? "Showing all players" : "Showing only my data"}
        />
      </Grid>
    </Grid>
  );
}

export default PokeBoard