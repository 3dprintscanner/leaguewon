import React from 'react';
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import { withStyles } from '@material-ui/core/styles';
import SearchIcon from '@material-ui/icons/Search';
import { useUsers } from "./../../../util/db";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Avatar from "@material-ui/core/Avatar";
import { Link } from "./../../../util/router.js";
import './../Animation.css';


const styles = (theme) => ({
  paper: {
    maxWidth: 936,
    margin: 'auto',
    overflow: 'hidden',
  },
  searchBar: {
    borderBottom: '1px solid rgba(0, 0, 0, 0.12)',
  },
  searchInput: {
    fontSize: theme.typography.fontSize,
  },
  block: {
    display: 'block',
  },
  addUser: {
    marginRight: theme.spacing(1),
  },
  contentWrapper: {
    margin: '40px 16px',
  },
  profit: {
    fontFamily: "Press Start 2P",
    color: '#b6ff00',
    animation: 'neon4 1.5s ease-in-out infinite alternate'
  },
  losses: {
    fontFamily: "Press Start 2P",
    color: '#f19cd2',
    animation: 'neon1 1.5s ease-in-out infinite alternate'
  },
  title: {
    margin: theme.spacing(2)
  }
});

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min) + min); // The maximum is exclusive and the minimum is inclusive
}







function Content(props) {
  const { classes } = props;

  const {
    data: items,
  } = useUsers();

  const renderPl = (profitLoss) => {
    console.log(profitLoss)
    if (profitLoss >= 0.0) {
      return (
        <Typography gutterBottom variant="h5" component="h2" className={classes.profit}>
          {profitLoss}
        </Typography>)
    } else {
      return (<Typography gutterBottom variant="h5" component="h2" className={classes.losses}>
        {profitLoss}
      </Typography>)
    }
  }
  const mapItems = (items) => {
    console.log(items)
    return (
      <List>
        {items.map(it => mapItem(it))}
      </List>
    )
  }

  const mapItem = (it) => {
    const pl = getRandomInt(-5000, 5000)
    return (<ListItem button component={Link} to={`/traders/${it.id}?pl=${pl}`}>
      <ListItemAvatar>
        <Avatar src={`https://avatars.dicebear.com/api/pixel-art/${it.id}custom-seed.svg`}>
        </Avatar>
      </ListItemAvatar>
      <ListItemText primary={it.name} />
      <ListItemText primary={renderPl(pl)} />
    </ListItem>)
  }
  return (
    <Paper className={classes.paper}>
      <Typography variant="h4" gutterBottom className={classes.title}>Traders</Typography>
      <AppBar className={classes.searchBar} position="static" color="default" elevation={0}>
        <Toolbar>
          <Grid container spacing={2} alignItems="center">
            <Grid item>
              <SearchIcon className={classes.block} color="inherit" />
            </Grid>
            <Grid item xs>
              <TextField
                fullWidth
                placeholder="Search name or wallet address"
                InputProps={{
                  disableUnderline: true,
                  className: classes.searchInput,
                }}
              // onChange={handleChange}
              />
            </Grid>
          </Grid>
        </Toolbar>
      </AppBar>
      {(items && mapItems(items)) ?? (<div className={classes.contentWrapper}>
        <Typography color="textSecondary" align="center">
          No users match this query
        </Typography>
      </div>)}

    </Paper>
  );
}

Content.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Content);
