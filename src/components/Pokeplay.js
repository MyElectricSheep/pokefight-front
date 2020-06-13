import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import PokeDisplay from "./PokeDisplay";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import Skeleton from "@material-ui/lab/Skeleton";

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

  const [pokeImages, setPokeImages] = useState([]);

  useEffect(() => {
    if (!chosenPokemon) {
      setPokeImages([]);
      let fullPoke = [];
      let errors = 0;
      Array.from({ length: 20 }, () => Math.floor(Math.random() * 964)).map(
        (num, index, array) => {
          return fetch(`https://pokeapi.co/api/v2/pokemon/${num}`)
            .then((res) => res.json())
            .then((data) => fullPoke.push({ id: index, image: data.sprites }))
            .catch((err) => {
              errors++;
              console.log(err);
            })
            .finally(() => {
              if (array.length === fullPoke.length + errors) {
                setPokeImages(fullPoke);
              }
            });
        }
      );
    }
  }, [chosenPokemon]);

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
                  <p style={{ paddingTop: "2em", paddingBottom: "1em" }}>
                    Please choose a Pokemon in the Pokedex first!
                  </p>
                  <Grid
                    item
                    container
                    direction="row"
                    justify="center"
                    alignItems="center"
                  >
                    {!pokeImages.length
                      ? Array.from({ length: 20 }).map((i) => (
                          <Skeleton
                            variant="circle"
                            width={70}
                            height={70}
                            style={{ margin: "10px 10px 10px 10px" }}
                          />
                        ))
                      : pokeImages.map((p) => {
                          return (
                            <img
                              key={p.id}
                              src={p.image.front_default}
                              style={{ width: "25%" }}
                              alt="pokemon"
                            ></img>
                          );
                        })}
                  </Grid>
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
                  <Grid item>
                    <Typography gutterBottom variant="h2">
                      VS
                    </Typography>
                    <br />
                    <Button variant="contained" color="secondary">
                      Fight
                    </Button>
                  </Grid>
                )}
              </>
            ))}
        </Grid>
      </Grid>
      <Grid item xs={12}></Grid>
    </Grid>
  );
}
