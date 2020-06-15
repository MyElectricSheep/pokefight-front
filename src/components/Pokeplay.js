import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Grid, Paper, Typography, Button } from "@material-ui/core";
import { Skeleton } from "@material-ui/lab";
import PokeDisplay from "./PokeDisplay";
import { useWindowSize } from 'react-use';
import pokeClient from "../utils/client";
import Confetti from 'react-confetti'

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    height: 650,
    width: 400,
  },
  paperDead: {
    backgroundColor: 'black',
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

const Pokeplay = ({
  chosenPokemon,
  chosenPokemonSprites,
  randomOpponent,
  opponentPokemonSprites,
  loggedInPlayer,
  setGamePlayed
}) => {
  const classes = useStyles();
  const { width, height } = useWindowSize()

  const [pokeImages, setPokeImages] = useState([]);

  const [winner, setWinner] = useState(null)

  const saveGame = (type) => {
    pokeClient.post('/board/save', {
	      player: loggedInPlayer._id,
        chosenPokemonId: chosenPokemon.id,
        adversaryPokemonId: randomOpponent.id,
        winner: type === 'winner' ? true : false
    }).then(() => setGamePlayed(gamePlayed => gamePlayed + 1))
  }

  const handleFight = () => {
    const flipACoin = Math.round(Math.random() * 10)
    if (flipACoin < 5) {
      alert('You lose!')
      setWinner('opponent')
      if (loggedInPlayer) {
        saveGame('loser')
      }
    } else {
      alert('You win!')
      setWinner('player')
      if (loggedInPlayer) {
        saveGame('winner')
      }
    }
  }

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

  const handleWinClass = (index) => {
    if (!winner) return classes.paper
    if (winner === 'player' && index === 0) return classes.paper
    if (winner === 'player' && index === 1) return classes.paperDead
    if (winner === 'opponent' && index === 0) return classes.paperDead
    if (winner === 'opponent' && index === 1) return classes.paper
    else return classes.paper
  }

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
                      ? Array.from({ length: 20 }).map((e, i) => (
                          <Skeleton
                            key={i}
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
              <React.Fragment key={item.pokemon.id}>
                <Grid item>
                  <Paper className={handleWinClass(index)}>
                    <PokeDisplay
                      chosenPokemon={item.pokemon}
                      chosenPokemonSprites={item.sprites}
                    />
                  </Paper>
                </Grid>
                {index !== array.length - 1 && (
                  <Grid item>
                    <Typography gutterBottom variant="h2">
                      {!winner ? 'VS' : winner === 'player' ? 'You win!' : 'You lose!'}
                    </Typography>
                    <br />
                    <Typography gutterBottom variant="h5" align="center">
                    {winner === 'player' && 'Great fight!'}
                    {winner === 'opponent' && 'Better luck next time!'}
                    </Typography>
                    {!winner && <Button variant="contained" color="secondary" onClick={() => handleFight()}>
                      Fight
                    </Button>}
                  </Grid>
                )}
              </React.Fragment>
            ))}
        </Grid>
      </Grid>
      {winner === 'player' && <Confetti
      width={width}
      height={height}
      numberOfPieces={1000}
      recycle={false}
      tweenDuration={25000}
    />}
    </Grid>
  );
};

export default Pokeplay;
