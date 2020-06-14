import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Grid, Typography, ButtonBase } from "@material-ui/core";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    paddingTop: "1em",
  },
  paper: {
    padding: theme.spacing(2),
    margin: "auto",
    maxWidth: 500,
  },
  image: {
    width: 128,
    height: 128,
  },
  img: {
    margin: "auto",
    display: "block",
    maxWidth: "100%",
    maxHeight: "100%",
  },
}));

const PokeDisplay = ({ chosenPokemonSprites, chosenPokemon }) => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      {chosenPokemon && (
        <Grid container spacing={2}>
          <Grid item>
            <ButtonBase className={classes.image}>
              {chosenPokemonSprites && (
                <img
                  className={classes.img}
                  alt="complex"
                  src={chosenPokemonSprites.front_default}
                />
              )}
            </ButtonBase>
          </Grid>
          <Grid item xs={12} sm container>
            <Grid item xs container direction="column" spacing={2}>
              <Grid item xs>
                <Typography gutterBottom variant="h4">
                  {chosenPokemon.name.english}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  ID: {chosenPokemon.id}
                </Typography>
              </Grid>
              <Tabs>
                <TabList>
                  <Tab>Base</Tab>
                  <Tab>Type</Tab>
                  <Tab>Names</Tab>
                </TabList>

                <TabPanel>
                  {Object.keys(chosenPokemon.base).map((key) => {
                    return (
                      <p>
                        {key}: {chosenPokemon.base[key]}
                      </p>
                    );
                  })}
                </TabPanel>
                <TabPanel>
                  <Typography variant="body2" gutterBottom>
                    {chosenPokemon.type &&
                      chosenPokemon.type.length &&
                      chosenPokemon.type.map((type) => {
                        return <p>{type}</p>;
                      })}
                  </Typography>
                </TabPanel>
                <TabPanel>
                  {Object.keys(chosenPokemon.name).map((key) => {
                    return (
                      <p>
                        {key}: {chosenPokemon.name[key]}
                      </p>
                    );
                  })}
                </TabPanel>
              </Tabs>
            </Grid>
          </Grid>
        </Grid>
      )}
    </div>
  );
};

export default PokeDisplay;
