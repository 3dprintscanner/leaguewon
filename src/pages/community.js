import React from "react";
import { requireAuth } from "./../util/auth";
import { useAllPosts, createPost } from './../util/db'
import { Grid, Box } from "@material-ui/core"
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import './../components/dashboard/Animation.css';
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import { Link } from "./../util/router";
import TextField from "@material-ui/core/TextField";
import { useForm } from "react-hook-form";
import { useAuth } from "./../util/auth";
function mapPosts(posts) {

  console.log(posts)
  return (
    <>
      <Grid container>
        <Grid item>
          <Card >
            <CardHeader title="Recent Posts" />
            <List>
              {posts.map(p => (<ListItem button component={Link} to={`/community/${p.id}`}>
                <ListItemAvatar>
                  <Avatar alt={p.owner.name} src={`https://avatars.dicebear.com/api/pixel-art/${p.owner.id}custom-seed.svg`} />
                </ListItemAvatar>
                <ListItemText>{p.content}</ListItemText>
              </ListItem>))}
            </List>
          </Card>

        </Grid>
      </Grid>
    </>
  )
}


function CommunityPage() {

  const { data: posts } = useAllPosts();

  const { handleSubmit, register, errors } = useForm();

  const auth = useAuth();


  const onSubmit = ({ title, content }) => {
      console.log(title, content)
      const query = createPost({ title, content, owner: auth.user.uid, });

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

  return (
    <>
      {posts && mapPosts(posts)}
      <Box sx={{margin: 16}}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Grid container={true} direction="column" spacing={2}>
            <Grid item={true} xs={4}>
              <TextField
                variant="outlined"
                type="text"
                label="Title"
                name="title"
                error={errors.title ? true : false}
                helperText={errors.title && errors.title.message}
                fullWidth={true}
                inputRef={register({
                  required: "Please enter a Title",
                })}
              />
            </Grid>
            <Grid item={true}>
              <TextField
                variant="outlined"
                type="text"
                label="Content"
                name="content"
                multiline
                minRows={7}
                fullWidth
                error={errors.content ? true : false}
                helperText={errors.content && errors.content.message}
                inputRef={register({
                  required: "Please enter a post body",
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
  );
}

export default requireAuth(CommunityPage);
