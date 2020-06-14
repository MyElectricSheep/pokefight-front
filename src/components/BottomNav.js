import React from "react";
import { useHistory } from "react-router-dom";
import { VideogameAsset, Score, List } from "@material-ui/icons";
import {
  BottomNavigation,
  BottomNavigationAction,
  makeStyles,
} from "@material-ui/core";

const useStyles = makeStyles({
  root: {
    width: "100%",
  },
});

const BottomNav = ({ bottomNavValue, setBottomNavValue, navIndex }) => {
  const classes = useStyles();
  const history = useHistory();

  const handleNavigation = (value) => {
    setBottomNavValue(value);
    history.push(navIndex[value]);
  };

  return (
    <BottomNavigation
      value={bottomNavValue}
      onChange={(event, newValue) => {
        handleNavigation(newValue);
      }}
      showLabels
      className={classes.root}
    >
      <BottomNavigationAction label="Pokedex" icon={<List />} />
      <BottomNavigationAction label="Play" icon={<VideogameAsset />} />
      <BottomNavigationAction label="LeaderBoard" icon={<Score />} />
    </BottomNavigation>
  );
};

export default BottomNav;
