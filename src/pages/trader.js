import React from "react";
import { requireAuth } from "./../util/auth";
import { useRouter } from "./../util/router.js";
import { Paper, Grid } from "@material-ui/core"
import { makeStyles } from "@material-ui/core/styles";
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import TradeTable from '../components/TradeTable';
import './../components/dashboard/Animation.css';
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import { usePosts } from './../util/db'
import CircularProgress from '@material-ui/core/CircularProgress';

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
    "profit_loss": -1233.45,
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
                    <Typography variant="h5">Recent Posts</Typography>
                </Grid>
            </Grid>
            <Grid container>
                <Grid item>
                    <List>
                        {posts.map(p => (<ListItem><ListItemText>{p.content}</ListItemText></ListItem>))}
                    </List>
                </Grid>
            </Grid>
        </>
    )
}

function TraderPage(props) {


    const router = useRouter();
    console.log(router.query.id)

    const classes = useStyles();

    const { data: posts, isLoading, error: itemsError } = usePosts(router.query.id);

    const data = stubbed;
    console.log(posts);

    const renderPl = (profitLoss) => {
        console.log(profitLoss)
        if (profitLoss >= 0.0) {
            return (
                <Typography gutterBottom variant="h5" component="h2">
                    {profitLoss}
                </Typography>)
        } else {
            return (<Typography gutterBottom variant="h5" component="h2">
                {profitLoss} losses
            </Typography>)
        }
    }

    const renderPercentage = () => {

        if (data['profit_loss'] >= 0.0) {
            return (
                <Typography gutterBottom variant="h3" component="h2" className={classes.profit}>
                    {`+${((data['profit_loss'] / data['portfolio_size']) * 100).toFixed(2)}%`}
                </Typography>
            )
        }
        else {
            return (
                <Typography gutterBottom variant="h3" component="h2" className={classes.losses}>
                    {`${((data['profit_loss'] / data['portfolio_size']) * 100).toFixed(2)}%`}
                </Typography>
            )
        }
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
                                        image="/nft_image.png"
                                        title="Contemplative Reptile"
                                    />
                                    <CardContent>
                                        <Typography gutterBottom variant="h5" component="h2">
                                            {data.name}
                                        </Typography>
                                        <Typography variant="body2" color="textSecondary" component="p">
                                            {data.description}
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
                                        {renderPl(data["profit_loss"])}
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
                                        {renderPercentage()}
                                    </CardContent>
                                </CardActionArea>
                            </Card>
                        </Grid>
                    </Grid>
                    <Grid container>
                        <TradeTable data={stubbed.transactions} />
                    </Grid>
                    <Grid container>
                        {isLoading ? <CircularProgress/> : (posts && !itemsError && mapPosts(posts)) ?? "No posts by this user"}
                    </Grid>
                </Grid>
            </Paper>

        </>
    );
}

export default requireAuth(TraderPage);
