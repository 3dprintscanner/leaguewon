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
import { useScoreBoard, useMetaData, useLeagueTicket } from "./../../../util/db";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Avatar from "@material-ui/core/Avatar";
import { Link } from "./../../../util/router.js";
import './../Animation.css';
import { useAuth } from "./../../../util/auth";


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
    leadNumber: {
        paddingRight: theme.spacing(2)
    },
    title: {
        margin: theme.spacing(2)
    }
});

function Leaderboard(props) {
    const { classes } = props;
    const auth = useAuth();

    const {
        data: items,
    } = useScoreBoard(1);

    const metaItems = useMetaData(items)

    console.log(metaItems, "metaItems")


    const mapItems = (items) => {
        return (
            <List>
                {items && items.filter(i => i.status == 'success').map((it, idx) => CreateItem(it.data, idx))}
            </List>
        )
    }

    const CreateItem = (it, idx) => {
        console.log(it, idx)
        const score = it.score
        return (<ListItem button component={Link} to={`/players/${it.player_id}`}>
            <Typography className={classes.leadNumber} variant='h5' display='inline'>{idx + 1}.</Typography>
            <ListItemAvatar>
                <Avatar src={`https://avatars.dicebear.com/api/pixel-art/${it.player_id}custom-seed.svg`}>
                </Avatar>
            </ListItemAvatar>
            <ListItemText primary={it.player_name} />
            <ListItemText primary={score} />
            <ListItemAvatar>
                <Avatar src={it.image_url}>
                </Avatar>
            </ListItemAvatar>

        </ListItem>)
    }
    return (
        <Paper className={classes.paper}>
            <Typography variant="h4" gutterBottom className={classes.title}>Scoreboard</Typography>

            <AppBar className={classes.searchBar} position="static" color="default" elevation={0}>
                <Toolbar>
                    <Grid container spacing={2} alignItems="center">
                        <Grid item>
                            <SearchIcon className={classes.block} color="inherit" />
                        </Grid>
                        <Grid item xs>
                            <TextField
                                fullWidth
                                placeholder="Search player name"
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
            {(metaItems && mapItems(metaItems)) ?? (<div className={classes.contentWrapper}>
                <Typography color="textSecondary" align="center">
                    No users match this query
                </Typography>
            </div>)}
        </Paper>
    );
}

Leaderboard.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Leaderboard);
