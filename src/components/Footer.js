import React from "react";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import LinkMui from "@material-ui/core/Link";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import { makeStyles } from "@material-ui/core/styles";
import Section from "./Section";
import { Link } from "./../util/router";
  
const useStyles = makeStyles((theme) => ({
  sticky: {
    marginTop: "auto",
  },
  brand: {
    display: "block",
    height: 32,
  },
  listItem: {
    paddingTop: 2,
    paddingBottom: 2,
    paddingLeft: 12,
    paddingRight: 12,
  },
  listItemTextHeader: {
    fontWeight: "bold",
  },
  noLink: {
    textDecoration: 'none'
  },
  socialIcon: {
    minWidth: 30,
  },
  legal: {
    marginTop: theme.spacing(3),
    fontSize: "0.875rem",
    opacity: 0.6,
    "& a": {
      color: "inherit",
      marginLeft: "0.8rem",
    },
  },
}));



function Footer(props) {
  const classes = useStyles();

  // Use inverted logo if specified
  // and we are in dark mode
  return (
    <Section
      bgColor={props.bgColor}
      size={props.size}
      bgImage={props.bgImage}
      bgImageOpacity={props.bgImageOpacity}
      className={props.sticky && classes.sticky}
    >
      <Container>
        <Grid container={true} justifyContent="space-between" spacing={4}>
          <Grid item={true} xs={12} md={4}>
            <Link to="/">
              <img src={props.logo} alt="Logo" className={classes.brand} />
            </Link>

            {props.description && (
              <Box mt={3}>
                <Typography component="p">{props.description}</Typography>
              </Box>
            )}

            <div className={classes.legal}>
              {props.copyright}
              <LinkMui component={Link} to="/legal/terms-of-service">
                Terms
              </LinkMui>
              <LinkMui component={Link} to="/legal/privacy-policy">
                Privacy
              </LinkMui>
            </div>
          </Grid>
          <Grid item={true} xs={12} md={6}>
            <Grid container={true} spacing={4}>
              <Grid item={true} xs={12} md={4}>
                <List disablePadding={true}>
                  <ListItem className={classes.listItem}>
                    <Typography
                      variant="overline"
                      className={classes.listItemTextHeader}
                    >
                      Product
                    </Typography>
                  </ListItem>
                  <ListItem
                    component={Link}
                    to="/pricing"
                    button={true}
                    className={classes.listItem}
                  >
                    <ListItemText>Pricing</ListItemText>
                  </ListItem>
                  <ListItem
                    component={Link}
                    to="/faq"
                    button={true}
                    className={classes.listItem}
                  >
                    <ListItemText>FAQ</ListItemText>
                  </ListItem>
                  <ListItem
                    button={true}
                    className={classes.listItem}
                  >
                    <a href="https://github.com/3dprintscanner/leaguewon" style={{textDecoration: 'none', color: 'unset'}}>
                      <ListItemText>GitHub</ListItemText>
                    </a>
                  </ListItem>
                </List>
              </Grid>
              <Grid item={true} xs={12} md={4}>
                <List disablePadding={true}>
                  <ListItem className={classes.listItem}>
                    <Typography
                      variant="overline"
                      className={classes.listItemTextHeader}
                    >
                      Company
                    </Typography>
                  </ListItem>
                  <ListItem
                    component={Link}
                    to="/about"
                    button={true}
                    className={classes.listItem}
                  >
                    <ListItemText>About</ListItemText>
                  </ListItem>
                  <ListItem
                    component={Link}
                    to="/contact"
                    button={true}
                    className={classes.listItem}
                  >
                    <ListItemText>Contact</ListItemText>
                  </ListItem>
                  <ListItem
                    button={true}
                    className={classes.listItem}
                  >
                    <a href="https://docs.google.com/presentation/d/19Q3SI9hq-AmjXSuErVTp2xoqB4HDPSBmV8XitflDepo/edit?usp=sharing" style={{textDecoration: 'none', color: 'unset'}}>
                      <ListItemText>Pitch Deck</ListItemText>
                    </a>
                  </ListItem>
                </List>
              </Grid>
              <Grid item={true} xs={12} md={4}>
                <List disablePadding={true}>
                  <ListItem className={classes.listItem}>
                    <Typography
                      variant="overline"
                      className={classes.listItemTextHeader}
                    >
                      Social
                    </Typography>
                  </ListItem>
                  <ListItem
                    button={true}
                    component="a"
                    href="https://twitter.com/divjoy"
                    target="_blank"
                    rel="noreferrer"
                    className={classes.listItem}
                  >
                    <ListItemIcon className={classes.socialIcon}>
                      <img
                        src="https://uploads.divjoy.com/icon-twitter.svg"
                        alt="Facebook"
                      />
                    </ListItemIcon>
                    <ListItemText>Twitter</ListItemText>
                  </ListItem>
                  <ListItem
                    button={true}
                    component="a"
                    href="https://facebook.com/DivjoyOfficial"
                    target="_blank"
                    rel="noreferrer"
                    className={classes.listItem}
                  >
                    <ListItemIcon className={classes.socialIcon}>
                      <img
                        src="https://uploads.divjoy.com/icon-facebook.svg"
                        alt="Facebook"
                      />
                    </ListItemIcon>
                    <ListItemText>Facebook</ListItemText>
                  </ListItem>
                  <ListItem
                    button={true}
                    component="a"
                    href="https://instagram.com"
                    target="_blank"
                    rel="noreferrer"
                    className={classes.listItem}
                  >
                    <ListItemIcon className={classes.socialIcon}>
                      <img
                        src="https://uploads.divjoy.com/icon-instagram.svg"
                        alt="Facebook"
                      />
                    </ListItemIcon>
                    <ListItemText>Instagram</ListItemText>
                  </ListItem>
                </List>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Container>
    </Section>
  );
}

export default Footer;
