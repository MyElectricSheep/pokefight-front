import React, { useState, useEffect } from "react";
import { Route, Switch, useHistory, useLocation } from "react-router-dom";
import BottomNavBar from "./components/BottomNav";
import Pokedex from "./components/Pokedex";
import Pokeplay from "./components/Pokeplay"
import Grid from "@material-ui/core/Grid";
import Typography from '@material-ui/core/Typography';
import "./App.css";

const App = () => {
  const history = useHistory();
  const navIndex = ["/pokedex", "/play", "/leaderboard"];

  const [bottomNavValue, setBottomNavValue] = useState(0);

  const [chosenPokemon, setChosenPokemon] = useState(null);
  const [chosenPokemonSprites, setChosenPokemonSprites] = useState(null)

  const [randomOpponent, setRandomOpponent] = useState(null)
  const [opponentPokemonSprites, setOpponentPokemonSprites] = useState(null)

  const handleChoosePokemon = (pokemon) => {
    setChosenPokemon(pokemon);
    history.push("/play");
  };

  useEffect(() => {
    console.log(chosenPokemon)
    if (chosenPokemon) {
      fetch(`https://pokeapi.co/api/v2/pokemon/${chosenPokemon.name.english.toLowerCase()}`)
      .then(res => res.json())
      .then(data => setChosenPokemonSprites(data.sprites))
      .catch(err => console.log(err))

      const randomOpponentId = Math.floor(Math.random() * Math.floor(809))
      fetch(`/pokemon/${randomOpponentId}`)
      .then((res) => res.json())
      .then((data) => { 
        setRandomOpponent(data) 
        return fetch(`https://pokeapi.co/api/v2/pokemon/${data.name.english.toLowerCase()}`) 
      })
      .then(res => res.json())
      .then(data => setOpponentPokemonSprites(data.sprites))
      .catch(() => alert("No Pokemon matches that ID"));
    }
  }, [chosenPokemon])

  let location = useLocation();

  useEffect(() => {
    console.log(location.pathname);
    setBottomNavValue(navIndex.indexOf(location.pathname));
  }, [navIndex, location]);


  // const [targetInfo, setTargetInfo] = useState("name");
  // const [halfPoke, setHalfPoke] = useState(null);
  
  // const fetchOnePokemonSpecificInfo = (id) => {
  //   resetView()
  //   if (!id || !/^\d+$/.test(id)) return alert('Please enter the ID of a pokemon...')
  //   fetch(`/pokemon/${id}/${targetInfo}`)
  //     .then(res => res.json())
  //     .then(data => setHalfPoke(data))
  //     .catch(() => alert('No Pokemon matches that ID'))
  // }

  return (
    <Grid container direction="column" justify="center" alignItems="center">
      <Typography gutterBottom variant="h2">POKEFIGHT</Typography>

      {/* 
          {halfPoke && (
            <>
            <span style={{marginTop: '2em'}}>{`Here are the ${targetInfo} characteristics for this Pokemon:`}</span>
            {Object.keys(halfPoke).map(key => {
            return <span>{key}: {halfPoke[key]}</span>
          })}
            </>
          )} */}

      <Switch>
        <Route path="/pokedex">
          <Pokedex onChoosePokemon={handleChoosePokemon} />
        </Route>
        <Route path="/play">
          <Pokeplay chosenPokemon={chosenPokemon} chosenPokemonSprites={chosenPokemonSprites} randomOpponent={randomOpponent} opponentPokemonSprites={opponentPokemonSprites}/>
        </Route>
      </Switch>

      <BottomNavBar
        bottomNavValue={bottomNavValue}
        setBottomNavValue={setBottomNavValue}
        navIndex={navIndex}
      />
    </Grid>
  );
};

export default App;
