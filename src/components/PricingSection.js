import React from "react";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import CheckIcon from "@material-ui/icons/Check";
import ListItemText from "@material-ui/core/ListItemText";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import Section from "./Section";
import SectionHeader from "./SectionHeader";
import { Link } from "./../util/router";
import { useAuth } from "./../util/auth";

const useStyles = makeStyles((theme) => ({
  card: {
    display: "flex",
    flexDirection: "column",
    height: "100%",
  },
  cardContent: {
    display: "flex",
    flexDirection: "column",
    height: "100%",
    padding: theme.spacing(3),
  },
  price: {
    display: "flex",
    alignItems: "baseline",
  },
  listItem: {
    paddingTop: 2,
    paddingBottom: 2,
  },
  perkIcon: {
    minWidth: 34,
    color: theme.palette.success.main,
  },
}));

function PricingSection(props) {
  const classes = useStyles();

  const auth = useAuth();

  const plans = [
    {
      id: "starter",
      name: "Free",
      price: "0",
      perks: [
        "Follow up to 3 traders",
        "View community posts",
        "See data soon after processing",
      ],
    },
    {
      id: "pro",
      name: "Standard",
      price: "20",
      perks: [
        "Follow and copy up to 10 traders",
        "Full access to the knowledge and discussion base",
        "Chances to contact and learn from the best traders",
      ],
    },
    {
      id: "business",
      name: "Pro",
      price: "150",
      perks: [
        "Follow and copy unlimited traders",
        "Aggregated data at the lowest latency",
        "Special members learning content and webinars",
        "Beta testing of new components",
      ],
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
          {plans.map((plan, index) => (
            <Grid item={true} xs={12} md={4} key={index}>
              <Card className={classes.card}>
                <CardContent className={classes.cardContent}>
                  <Typography variant="h6" component="h2">
                    {plan.name}
                  </Typography>
                  <Box className={classes.price} mt={1}>
                    <Typography variant="h3">€{plan.price}</Typography>
                    <Typography variant="h4" color="textSecondary">
                      /mo
                    </Typography>
                  </Box>

                  {plan.description && (
                    <Box mt={2}>
                      <Typography component="p" color="textSecondary">
                        {plan.description}
                      </Typography>
                    </Box>
                  )}

                  {plan.perks && (
                    <Box mt={1}>
                      <List aria-label="perks">
                        {plan.perks.map((perk, index) => (
                          <ListItem
                            className={classes.listItem}
                            disableGutters={true}
                            key={index}
                          >
                            <ListItemIcon className={classes.perkIcon}>
                              <CheckIcon />
                            </ListItemIcon>
                            <ListItemText>{perk}</ListItemText>
                          </ListItem>
                        ))}
                      </List>
                    </Box>
                  )}

                  <Box mt="auto" pt={3}>
                    <Button
                      component={Link}
                      to={
                        auth.user
                          ? `/purchase/${plan.id}`
                          : `/auth/signup?next=/purchase/${plan.id}`
                      }
                      variant="contained"
                      color="secondary"
                      size="large"
                      fullWidth={true}
                    >
                      Choose
                    </Button>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Section>
  );
}

export default PricingSection;
