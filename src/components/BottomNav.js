import React, {useState} from 'react';
import { Route, Link, useHistory } from "react-router-dom";
import { makeStyles } from '@material-ui/core/styles';
import VideogameAssetIcon from '@material-ui/icons/VideogameAsset';
import ScoreIcon from '@material-ui/icons/Score';
import ListIcon from '@material-ui/icons/List';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';

const useStyles = makeStyles({
  root: {
    width: '100%',
  },
});

export default function SimpleBottomNavigation({bottomNavValue, setBottomNavValue, navIndex}) {
  const classes = useStyles();
  const history = useHistory();
  

  const handleNavigation = (value) => {
    setBottomNavValue(value)
    
    history.push(navIndex[value])
  }

  return (
    <BottomNavigation
      value={bottomNavValue}
      onChange={(event, newValue) => {
          console.log(newValue)
          handleNavigation(newValue)
      }}
      showLabels
      className={classes.root}
    >
      <BottomNavigationAction label="Pokedex" icon={<ListIcon />} />
      <BottomNavigationAction label="Play" icon={<VideogameAssetIcon />} />
      <BottomNavigationAction label="LeaderBoard" icon={<ScoreIcon />} />
     
    </BottomNavigation>
  );
}