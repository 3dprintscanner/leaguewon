import React from "react";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import CardHeader from "@material-ui/core/CardHeader";
import Avatar from "@material-ui/core/Avatar";
import { makeStyles } from "@material-ui/core/styles";
import Section from "./Section";
import SectionHeader from "./SectionHeader";

const useStyles = makeStyles((theme) => ({
  header: {
    paddingTop: 0,
  },
  avatar: {
    width: theme.spacing(7),
    height: theme.spacing(7),
  },
}));

function TestimonialsSection(props) {
  const classes = useStyles();

  const items = [
    {
      avatar: "marc.webp",
      name: "Marc",
      testimonial:
        "Great potential, the visibility of other traders is great together with supporting the learning of users",
      company: "Company",
    },
    {
      avatar: "wong.png",
      name: "Michael",
      testimonial:
        "I like the way investors can stake or follow individual traders",
      company: "Company",
    },
    {
      avatar: "thomas.png",
      name: "Thomas",
      testimonial:
        "Fixes the black box model of firms like eToro and Gate.io and makes that information publibly available",
      company: "Company",
    },
  ];

  return (
    <Section
      bgColor={props.bgColor}
      size={props.size}
      bgImage={props.bgImage}
      bgImageOpacity={props.bgImageOpacity}
    >
      <Container>
        <SectionHeader
          title={props.title}
          subtitle={props.subtitle}
          size={4}
          textAlign="center"
        />
        <Grid container={true} justifyContent="center" spacing={4}>
          {items.map((item, index) => (
            <Grid item={true} xs={12} sm={4} key={index}>
              <Card>
                <CardContent>
                  <Typography variant="body1" component="p">
                    "{item.testimonial}"
                  </Typography>
                </CardContent>
                <CardHeader
                  className={classes.header}
                  avatar={
                    <Avatar
                      src={item.avatar}
                      alt={item.name}
                      className={classes.avatar}
                    />
                  }
                  title={item.name}
                  subheader={item.company}
                />
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Section>
  );
}

export default TestimonialsSection;
