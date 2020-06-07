import React, { useState, useEffect } from 'react';
import { Route, Link, useHistory } from "react-router-dom";
import Skeleton from '@material-ui/lab/Skeleton';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import PersonOutlineIcon from '@material-ui/icons/PersonOutline';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import FlashOnIcon from '@material-ui/icons/FlashOn';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import FolderIcon from '@material-ui/icons/Folder';
import DeleteIcon from '@material-ui/icons/Delete';
import Pagination from '@material-ui/lab/Pagination';
import PokeInfo from './PokeInfo'

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    paddingTop: '1em',
    paddingBottom: '1em'
    // maxWidth: 752,
    // margin: '0 auto',
  },
  title: {
    // margin: theme.spacing(4, 0, 2),
  },
}));

const Pokedex = ({onChoosePokemon}) => {
  const classes = useStyles();
  const history = useHistory();

  const [pokeData, setPokeData] = useState(null)
  const [page, setPage] = useState(1)
  const [open, setOpen] = useState(true)

  const handleChangePage = (event, value) => {
    setPage(value);
  }

  const handleSlice = (pokeData) => {
    const start = page === 1 ? 0 : (page - 1) * 10
    const end = page * 10
    return pokeData.slice(start, end)
  }

  const handleCloseModal = () => {
      setOpen(false)
      history.push('/pokedex')
    }
  
  useEffect(() => {
    fetch('/pokemon').then(res => res.json()).then(data => setPokeData(data))
  }, [])

  return (
    <div className={classes.root}>
      <Grid container direction="row"
  justify="center"
  alignItems="center" spacing={2}>
        <Grid item xs={12} md={12}>
          <Typography variant="h6" className={classes.title}>
            Pokedex: the Pokemon Encyclopedia
          </Typography>
          <div className={classes.demo}>
            <List>
              {pokeData ? handleSlice(pokeData).map(p => {
                  return (
                    <ListItem key={p.id}>
                  <ListItemAvatar>
                    <Avatar>
                      <PersonOutlineIcon />
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText
                    primary={p.name.english}

                  />
                  <ListItemSecondaryAction>
                    <IconButton edge="end" aria-label="choose">
                    <Link to={`/pokedex/${p.id}`} onClick={() => setOpen(true)}><FlashOnIcon /></Link>
                    </IconButton>
                  </ListItemSecondaryAction>
                </ListItem>
                  )
              }
              ) : (<>{Array(20).fill().map(() => <Skeleton animation="wave" height={25} width="100%" style={{ marginBottom: 6 }} />)}</> )}
            </List>
          </div>
        </Grid>
        
      </Grid>
      {pokeData && <Pagination count={Math.ceil(pokeData.length / 10)} variant="outlined" onChange={handleChangePage} /> }
      <Route path="/pokedex/:id">
        <PokeInfo open={open} onClose={handleCloseModal} onChoosePokemon={onChoosePokemon}/>
      </Route>
    </div>
  );
}

export default Pokedex