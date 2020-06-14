import React, { useState, useEffect } from "react";

// Routing
import {
  Route,
  Switch,
  Redirect,
  useHistory,
  useLocation,
} from "react-router-dom";

// Custom components
import BottomNavBar from "./components/BottomNav";
import Pokedex from "./components/Pokedex";
import Pokeplay from "./components/Pokeplay";
import Pokeboard from "./components/PokeBoard";
import Authenticate from "./components/Authenticate";

// Utils
import pokeClient from "./utils/client";
import Cookies from "js-cookie";

// Mui
import { Grid, Typography, Button } from "@material-ui/core";

const App = () => {
  const history = useHistory();

  const [pokeData, setPokeData] = useState(null);

  const [bottomNavValue, setBottomNavValue] = useState(0);

  const [chosenPokemon, setChosenPokemon] = useState(null);
  const [chosenPokemonSprites, setChosenPokemonSprites] = useState(null);

  const [randomOpponent, setRandomOpponent] = useState(null);
  const [opponentPokemonSprites, setOpponentPokemonSprites] = useState(null);

  const [hasLoggedIn, setHasLoggedIn] = useState(false);
  const [loggedInPlayer, setLoggedInPlayer] = useState(null);

  const [openAuth, setOpenAuth] = useState(false);
  const [authData, setAuthData] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [authType, setAuthType] = useState(null);

  const navIndex = ["/pokedex", "/play", "/leaderboard"];

  const handleChoosePokemon = (pokemon) => {
    setChosenPokemon(pokemon);
    history.push("/play");
  };

  useEffect(() => {
    fetch("/pokemon")
      .then((res) => res.json())
      .then((data) => setPokeData(data));
  }, []);

  useEffect(() => {
    const token = Cookies.get("pokefight-token");
    if (token) {
      pokeClient
        .get(`auth/me`)
        .then((response) => {
          setLoggedInPlayer(response.data);
        })
        .catch((error) => {
          console.log(error);
        });
    } else setLoggedInPlayer(null);
  }, [hasLoggedIn]);

  useEffect(() => {
    if (chosenPokemon) {
      fetch(
        `https://pokeapi.co/api/v2/pokemon/${chosenPokemon.name.english.toLowerCase()}`
      )
        .then((res) => res.json())
        .then((data) => setChosenPokemonSprites(data.sprites))
        .catch((err) => console.log(err));

      const randomOpponentId = Math.floor(Math.random() * Math.floor(809));
      fetch(`/pokemon/${randomOpponentId}`)
        .then((res) => res.json())
        .then((data) => {
          setRandomOpponent(data);
          return fetch(
            `https://pokeapi.co/api/v2/pokemon/${data.name.english.toLowerCase()}`
          );
        })
        .then((res) => res.json())
        .then((data) => setOpponentPokemonSprites(data.sprites))
        .catch(() => alert("No Pokemon matches that ID"));
    }
  }, [chosenPokemon]);

  let location = useLocation();

  const handleClickOpenAuth = (type) => {
    setAuthType(type);
    setOpenAuth(true);
  };

  const cleanAuthData = () =>
    setAuthData({
      username: "",
      email: "",
      password: "",
    });

  const handleClickCloseAuth = () => {
    setOpenAuth(false);
    cleanAuthData();
  };

  const handleChangeInput = (e) => {
    setAuthData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const authError = () => {
    cleanAuthData();
    return alert("Wrong credentials, please try again");
  };

  const handleSubmitAuth = (type) => {
    const { username, email, password } = authData;
    if (!authData || !email || !password || (type === "register" && !username))
      return alert("Please enter your credentials");
    pokeClient
      .post(`auth/${type}`, {
        username,
        email,
        password,
      })
      .then((response) => {
        const token = response.headers["x-auth-token"];
        if (!token) return authError();
        Cookies.set("pokefight-token", token);
        handleClickCloseAuth();
        setHasLoggedIn(true);
      })
      .catch((error) => {
        return authError();
      });
  };

  useEffect(() => {
    setBottomNavValue(navIndex.indexOf(location.pathname));
  }, [navIndex, location]);

  return (
    <Grid container direction="column" justify="center" alignItems="center">
      <Typography gutterBottom variant="h2">
        POKEFIGHT
      </Typography>
      <Switch>
        <Route path="/pokedex">
          <Pokedex onChoosePokemon={handleChoosePokemon} pokeData={pokeData} />
        </Route>
        <Route path="/play">
          <Pokeplay
            chosenPokemon={chosenPokemon}
            chosenPokemonSprites={chosenPokemonSprites}
            randomOpponent={randomOpponent}
            opponentPokemonSprites={opponentPokemonSprites}
          />
        </Route>
        <Route path="/leaderboard">
          <Pokeboard loggedInPlayer={loggedInPlayer} pokeData={pokeData} />
        </Route>
        <Route exact path="/">
          {hasLoggedIn ? (
            <Redirect to="/leaderboard" />
          ) : (
            <Redirect to="/pokedex" />
          )}
        </Route>
      </Switch>

      <BottomNavBar
        bottomNavValue={bottomNavValue}
        setBottomNavValue={setBottomNavValue}
        navIndex={navIndex}
      />
      <Grid
        container
        direction={hasLoggedIn ? "column" : "row"}
        justify="center"
        alignItems="center"
      >
        {loggedInPlayer ? (
          <>
            <>{`Welcome back ${loggedInPlayer.username}`}</>{" "}
            <Button
              onClick={() => {
                Cookies.remove("pokefight-token");
                setHasLoggedIn(false);
                setLoggedInPlayer(null);
                history.push("/pokedex");
              }}
            >
              LOGOUT
            </Button>
          </>
        ) : (
          <>
            <Button onClick={() => handleClickOpenAuth("register")}>
              REGISTER
            </Button>
            <Button onClick={() => handleClickOpenAuth("login")}>LOGIN</Button>
          </>
        )}
      </Grid>
      <Authenticate
        type={authType}
        openAuth={openAuth}
        authData={authData}
        onClose={handleClickCloseAuth}
        onChangeAuth={handleChangeInput}
        onSendAuth={handleSubmitAuth}
      />
    </Grid>
  );
};

export default App;
