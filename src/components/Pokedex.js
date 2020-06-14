import React, { useState, useEffect } from "react";
import { Route, Link, useHistory } from "react-router-dom";

import { makeStyles } from "@material-ui/core/styles";
import {
  List,
  ListItem,
  ListItemAvatar,
  ListItemSecondaryAction,
  Avatar,
  Grid,
  Typography,
  ListItemText,
  IconButton,
} from "@material-ui/core";
import { PersonOutline, FlashOn } from "@material-ui/icons";
import { Skeleton, Pagination } from "@material-ui/lab";

import PokeInfo from "./PokeInfo";

const useStyles = makeStyles(() => ({
  root: {
    flexGrow: 1,
    paddingTop: "1em",
    paddingBottom: "1em",
  }
}));

const Pokedex = ({ onChoosePokemon, pokeData }) => {
  const classes = useStyles();
  const history = useHistory();

  const [page, setPage] = useState(1);
  const [open, setOpen] = useState(true);
  const [pokeImages, setPokeImages] = useState([]);

  const handleChangePage = (event, value) => {
    setPage(value);
  };

  const handleSlice = (pokeData) => {
    const start = page === 1 ? 0 : (page - 1) * 10;
    const end = page * 10;
    return pokeData.slice(start, end);
  };

  const handleCloseModal = () => {
    setOpen(false);
    history.push("/pokedex");
  };

  useEffect(() => {
    if (pokeData) {
      setPokeImages([]);
      const slicedPokeData = handleSlice(pokeData);
      slicedPokeData.map((poke, index) => {
        return fetch(
          `https://pokeapi.co/api/v2/pokemon/${poke.name.english.toLowerCase()}`
        )
          .then((res) => res.json())
          .then((data) =>
            setPokeImages((prevPokeImages) => [
              ...prevPokeImages,
              { id: index, image: data.sprites },
            ])
          )
          .catch((err) => console.log(err));
      });
    }
  }, [pokeData, page]);

  return (
    <div className={classes.root}>
      <Grid
        container
        direction="row"
        justify="center"
        alignItems="center"
        spacing={2}
      >
        <Grid item xs={12} md={12}>
          <Typography variant="h6">
            Pokedex: the Pokemon Encyclopedia
          </Typography>
          <div className={classes.demo}>
            <List>
              {pokeData ? (
                handleSlice(pokeData).map((p, index) => {
                  const filteredPic = pokeImages.find((i) => i.id === index);
                  return (
                    <ListItem key={p.id}>
                      <ListItemAvatar>
                        <Avatar style={{ width: "55px", height: "55px" }}>
                          {filteredPic ? (
                            <img
                              src={filteredPic.image.front_default}
                              style={{ width: "100%" }}
                              alt="pokemon"
                            ></img>
                          ) : (
                            <PersonOutline />
                          )}
                        </Avatar>
                      </ListItemAvatar>
                      <ListItemText
                        style={{ paddingLeft: "1em" }}
                        primary={p.name.english}
                      />
                      <ListItemSecondaryAction>
                        <IconButton edge="end" aria-label="choose">
                          <Link
                            to={`/pokedex/${p.id}`}
                            onClick={() => setOpen(true)}
                          >
                            <FlashOn />
                          </Link>
                        </IconButton>
                      </ListItemSecondaryAction>
                    </ListItem>
                  );
                })
              ) : (
                <>
                  {Array(20)
                    .fill()
                    .map((a, i) => (
                      <Skeleton
                        key={i}
                        animation="wave"
                        height={25}
                        width="100%"
                        style={{ marginBottom: 6 }}
                      />
                    ))}
                </>
              )}
            </List>
          </div>
        </Grid>
      </Grid>
      {pokeData && (
        <Pagination
          count={Math.ceil(pokeData.length / 10)}
          variant="outlined"
          onChange={handleChangePage}
        />
      )}
      <Route path="/pokedex/:id">
        <PokeInfo
          open={open}
          onClose={handleCloseModal}
          onChoosePokemon={onChoosePokemon}
        />
      </Route>
    </div>
  );
};

export default Pokedex;
