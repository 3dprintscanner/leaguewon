import React from 'react';
import './dashboard/Animation.css';
import { useRouter } from "./../util/router";
import { usePostComments, createComment } from '../util/db';
import { CircularProgress, Typography } from '@material-ui/core';
import Divider from "@material-ui/core/Divider";
import List from "@material-ui/core/List";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Avatar from "@material-ui/core/Avatar";
import { Link } from "./../util/router";
import TextField from "@material-ui/core/TextField";
import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import { useForm } from "react-hook-form";
import Grid from "@material-ui/core/Grid";
import { useAuth } from "./../util/auth";

const mapComments = (comments) => {
    return (<List>
        {comments.map(c => (<ListItem alignItems="flex-start" button component={Link} to={`/traders/${c.owner.id}`}>
            <ListItemAvatar>
                <Avatar alt={c.owner.name} src={`https://avatars.dicebear.com/api/pixel-art/${c.owner.id}custom-seed.svg`} />
            </ListItemAvatar>
            <ListItemText
                primary={c.owner.name}
                secondary={c.comment}
            />
        </ListItem>))}
    </List>)
}

const DiscussionPage = () => {

    const router = useRouter();

    const auth = useAuth();

    const { handleSubmit, register, errors } = useForm();

    const onSubmit = ({ comment }) => {
        console.log(comment)
        const query = createComment({ comment, owner: auth.user.uid, post: router.query.id }, router.query.id);

        query
            .then(() => {
                // Let parent know we're done so they can hide modal
                
            })
            .catch((error) => {
                // Hide pending indicator
                // Show error alert message
                alert(error.message)
            });
    };

    const { data: postComments, isLoading } = usePostComments(router.query.id);
    console.log(postComments)
    if (isLoading) {
        return (<CircularProgress />)
    }
    return (
        <>
            <Typography variant="h4" gutterBottom>{postComments.title}</Typography>
            <Divider />
            <Typography variant="body1" gutterBottom>{postComments.content}</Typography>
            <Divider />
            <Typography variant="h5">Comments</Typography>

            {mapComments(postComments.comments)}
            <Box>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <Grid container={true} spacing={2}>
                        <Grid item={true} xs={true}>
                            <TextField
                                variant="outlined"
                                type="text"
                                label="Comment"
                                name="comment"
                                error={errors.comment ? true : false}
                                helperText={errors.comment && errors.comment.message}
                                fullWidth={true}
                                inputRef={register({
                                    required: "Please enter a comment",
                                })}
                            />
                        </Grid>
                        <Box display="flex" alignItems="stretch" clone={true}>
                            <Grid item={true} xs="auto">
                                <Button
                                    variant="contained"
                                    color="secondary"
                                    size="large"
                                    type="submit"
                                >
                                    Submit
                                </Button>
                            </Grid>
                        </Box>
                    </Grid>
                </form>
            </Box>
        </>
    )
}

export default DiscussionPage