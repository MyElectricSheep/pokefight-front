import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import PokeDisplay from "./PokeDisplay";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    height: 650,
    width: 400,
  },
  paperEmpty: {
    height: "100%",
    width: 400,
  },
  control: {
    padding: theme.spacing(2),
  },
}));

export default function SpacingGrid({
  chosenPokemon,
  chosenPokemonSprites,
  randomOpponent,
  opponentPokemonSprites,
}) {
  const classes = useStyles();

  return (
    <Grid container className={classes.root} spacing={2}>
      <Grid item xs={12}>
        <Grid
          container
          direction="row"
          justify="center"
          alignItems="center"
          spacing={4}
        >
          {!chosenPokemon && (
            <Grid item>
              <Paper className={classes.paperEmpty}>
                <Grid
                  container
                  direction="column"
                  justify="center"
                  alignItems="center"
                >
                  <p style={{ paddingTop: "2em", paddingBottom: "2em" }}>
                    Please choose a Pokemon in the Pokedex first
                  </p>
                </Grid>
              </Paper>
            </Grid>
          )}
          {chosenPokemon &&
            chosenPokemonSprites &&
            randomOpponent &&
            opponentPokemonSprites &&
            [
              { pokemon: chosenPokemon, sprites: chosenPokemonSprites },
              { pokemon: randomOpponent, sprites: opponentPokemonSprites },
            ].map((item, index, array) => (
              <>
                <Grid key={item.pokemon.id} item>
                  <Paper className={classes.paper}>
                    <PokeDisplay
                      chosenPokemon={item.pokemon}
                      chosenPokemonSprites={item.sprites}
                    />
                  </Paper>
                </Grid>
                {index !== array.length - 1 && (
                  <Typography gutterBottom variant="h2">
                    VS
                  </Typography>
                )}
              </>
            ))}
        </Grid>
      </Grid>
      <Grid item xs={12}></Grid>
    </Grid>
  );
}
