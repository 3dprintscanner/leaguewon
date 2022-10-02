import React from 'react';
import './dashboard/Animation.css';
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
    profit: {
        fontFamily: "Press Start 2P",
        color: '#b6ff00',
        animation: 'neon4 1.5s ease-in-out infinite alternate',
        fontSize: 24
      },
      losses: {
        fontFamily: "Press Start 2P",
        color: '#f19cd2',
        animation: 'neon1 1.5s ease-in-out infinite alternate',
        fontSize: 34
      }
  }));


const Logo = () => {

    const classes = useStyles();

    return (
        <>
            <span className={classes.profit}>Rank</span><span className={classes.losses}>Dex</span>
        </>
    )
}

export default Logo