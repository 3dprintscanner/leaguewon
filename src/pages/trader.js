import React from "react";
import { requireAuth } from "./../util/auth";
import { useRouter } from "./../util/router.js";
import { Paper, Grid, Box } from "@material-ui/core"
import { makeStyles } from "@material-ui/core/styles";
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import TradeTable from '../components/TradeTable';
import './../components/dashboard/Animation.css';
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import { usePosts, useRealUser, createFollower, useIsFollower } from './../util/db'
import CircularProgress from '@material-ui/core/CircularProgress';
import Button from "@material-ui/core/Button";
import { useAuth } from "./../util/auth";
import { Link } from "./../util/router";


const stubData = {
    "wallet_id": "0x886fAc470FE9cFB538861a7d6fdC73666770066f",
    "start": 1664650717,
    "end": 1664660717,
    "portfolio_size": 123322.54,
    "num_trades": 6,
    "asset_allocation": {
        "coins": {
            "percentage": 45.22,
            "value": 55766.452588
        },
        "liquidity": {
            "percentage": 54.78,
            "value": 67556.087412

        }
    },
    "profit_loss": 11233.45,
    "transactions": [
        {
            "id": "0x1Ad49A332634c0D3a072442e330DD3C8154Aa105",
            "block_number": 1238,
            "timestamp": 1664650747,
            "transaction_data": {
                "mints": [
                    {
                        "token_0": "0x999999cf1046e68e36E1aA2E0E07105eDDD1f08E",
                        "token_1": "0xc0ffee254729296a45a3885639AC7E10F9d54979"
                    }
                ],
                "burns": [],
                "swaps": []
            }
        },
        {
            "id": "0x1Ad49A332634c0D3a072442e330DD3C8154Aa106",
            "block_number": 1238,
            "timestamp": 1664650747,
            "transaction_data": {
                "mints": [
                ],
                "burns": [
                    {
                        "token_0": "0x999999cf1046e68e36E1aA2E0E07105eDDD1f08E",
                        "token_1": "0xc0ffee254729296a45a3885639AC7E10F9d54979"
                    }
                ],
                "swaps": []
            }
        },
        {
            "id": "0x1Ad49A332634c0D3a072442e330DD3C8154Aa107",
            "block_number": 1239,
            "timestamp": 1664650747,
            "transaction_data": {
                "mints": [
                    {
                        "token_0": "0x999999cf1046e68e36E1aA2E0E07105eDDD1f08E",
                        "token_1": "0xc0ffee254729296a45a3885639AC7E10F9d54979"
                    }
                ],
                "burns": [],
                "swaps": []
            }
        },
        {
            "id": "0x1Ad49A332634c0D3a072442e330DD3C8154Aa108",
            "block_number": 1240,
            "timestamp": 1664650747,
            "transaction_data": {
                "mints": [
                ],
                "burns": [],
                "swaps": [
                    {
                        "token_0": "0x999999cf1046e68e36E1aA2E0E07105eDDD1f08E",
                        "token_1": "0xc0ffee254729296a45a3885639AC7E10F9d54979"
                    }
                ]
            }
        }
    ]
}


const stubDb = {
    "name": "pepo trader",
    "description": "best trader in the west",
    "profile": "nft_image.png",

}

const stubbed = Object.assign(stubData, stubDb)


// fetch the trader data from the database to get the image and name and pepo

// merge and map into an object to sho 

const useStyles = makeStyles((theme) => ({
    gridItem: {
        // Add border that contrasts lightly with background color.
        // We use boxShadow so that it's hidden around outer edge
        // due to container <Card> having overflow: hidden
        // boxShadow: `1px 1px 0 0 ${emphasize(theme.palette.background.paper, 0.08)}`,
        textAlign: "center",
    },
    imageContainer: {
        margin: "0 auto",
        maxWidth: "200px",
        marginBottom: theme.spacing(1),
        "& img": {
            width: "100%",
        },
    },
    root: {
        maxWidth: 345,
        margin: theme.spacing(2)
    },
    media: {
        height: 140,
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
    }
}));

function mapPosts(posts) {

    return (
        <>
            <Grid container>
                <Grid item>
                    <Card >
                        <CardHeader title="Recent Posts"/>
                        <List>
                            {posts.map(p => (<ListItem button component={Link} to={`/community/${p.id}`}><ListItemText>{p.content}</ListItemText></ListItem>))}
                        </List>
                    </Card>

                </Grid>
            </Grid>
        </>
    )
}

function TraderPage(props) {


    const router = useRouter();
    console.log(router.query.id)
    const auth = useAuth();


    console.log(router.query.pl)

    const classes = useStyles();
    const { data: user} = useRealUser(router.query.id);
    const { data: follower } = useIsFollower(auth.user.id, router.query.id);
    const { data: posts, isLoading, error: itemsError } = usePosts(router.query.id);

    const data = stubbed;
    console.log(posts);

    const renderPl = (profitLoss) => {
        console.log(profitLoss)
        if (profitLoss >= 0.0) {
            return (
                <Typography gutterBottom variant="h5" component="h2" className={classes.profit}>
                    {profitLoss}
                </Typography>)
        } else {
            return (<Typography gutterBottom variant="h5" component="h2" className={classes.losses}>
                {profitLoss} losses
            </Typography>)
        }
    }

    const renderPercentage = (pl) => {

        if (pl >= 0.0) {
            return (
                <Typography gutterBottom variant="h3" component="h2" className={classes.profit}>
                    {`+${((pl / data['portfolio_size']) * 100).toFixed(2)}%`}
                </Typography>
            )
        }
        else {
            return (
                <Typography gutterBottom variant="h3" component="h2" className={classes.losses}>
                    {`${((pl / data['portfolio_size']) * 100).toFixed(2)}%`}
                </Typography>
            )
        }
    }

    const handleClick = () => {
        // add a row to the follow table for the trader id and the currently signed in user
        const response = createFollower({user_id: auth.user.id, following_id: router.query.id} )
        console.log(response)
        return response;
    }
    return (
        <>
            <Paper elevation={2}>
                <Grid container>
                    <Grid container justifyContent="space-around">
                        <Grid
                            item={true}
                            xs={6}
                            md={2}
                            className={classes.gridItem}>
                            <Card className={classes.root}>
                                <CardActionArea>
                                    <CardMedia
                                        className={classes.media}
                                        image={`https://avatars.dicebear.com/api/pixel-art/${router.query.id}custom-seed.svg`}
                                        title="Contemplative Reptile"
                                    />
                                    <CardContent>
                                        <Typography gutterBottom variant="h5" component="h2">
                                            {user && user.name}
                                        </Typography>
                                        <Typography variant="body2" color="textSecondary" component="p">
                                            {user && user.userType}
                                        </Typography>
                                    </CardContent>
                                </CardActionArea>
                            </Card>
                        </Grid>
                        <Grid
                            item={true}
                            xs={6}
                            md={3}
                            className={classes.gridItem}>
                            <Card className={classes.root}>
                                <CardActionArea>
                                    <CardContent>
                                        {/* {renderPl(data["profit_loss"])} */}
                                        {renderPl((router.query.pl && router.query.pl) ?? 0)}
                                        <Button variant="contained" color="secondary" onClick={handleClick} disabled={follower}>{follower ? "Unfollow" : "Follow this Trader"}</Button>
                                    </CardContent>
                                </CardActionArea>
                            </Card>
                        </Grid>
                        <Grid
                            item={true}
                            xs={6}
                            md={3}
                            className={classes.gridItem}>
                            <Card className={classes.root}>
                                <CardActionArea>
                                    <CardContent>
                                        {renderPercentage(router.query.pl)}
                                    </CardContent>
                                </CardActionArea>
                            </Card>
                        </Grid>
                    </Grid>
                    <Grid container>
                        <Box sx={{ padding: 4, margin: 8 }}>
                            <TradeTable data={stubbed.transactions} />
                        </Box>
                    </Grid>
                    <Grid container>
                        {isLoading ? <CircularProgress /> : (posts && !itemsError && mapPosts(posts)) ?? "No posts by this user"}
                    </Grid>
                </Grid>
            </Paper>

        </>
    );
}

export default requireAuth(TraderPage);
