import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { withStyles } from '@material-ui/core/styles';
import Divider from '@material-ui/core/Divider';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import HomeIcon from '@material-ui/icons/Home';
import ForumIcon from '@material-ui/icons/Forum';
import GroupIcon from '@material-ui/icons/Group';
import { Link } from "./../../../util/router.js";
import './../Animation.css';
import Logo from '../../Logo';

const categories = [
  {
    id: 'Explore',
    children: [
      { id: 'Traders', icon: <GroupIcon />, to: '/traders' },
      { id: 'Community', icon: <ForumIcon />, to: '/community' },
    ],
  }
];

const styles = (theme) => ({
  categoryHeader: {
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(2),
  },
  categoryHeaderPrimary: {
    // color: theme.palette.common.white,
  },
  item: {
    paddingTop: 1,
    paddingBottom: 1,
    // color: 'rgba(255, 255, 255, 0.7)',
    // '&:hover,&:focus': {
    //   backgroundColor: 'rgba(255, 255, 255, 0.08)',
    // },
  },
  itemCategory: {
    // backgroundColor: theme.palette.primary.main,
    boxShadow: '0 -1px 0 #404854 inset',
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(2),
  },
  firebase: {
    fontSize: 24,
    color: theme.palette.background,
  },
  itemActiveItem: {
    color: '#4fc3f7',
  },
  itemPrimary: {
    fontSize: 'inherit',
    animation: 'neon1 7.5s ease-in-out infinite alternate'
  },
  itemIcon: {
    minWidth: 'auto',
    marginRight: theme.spacing(2),
  },
  divider: {
    marginTop: theme.spacing(2),
  },
  themeBackground: {
    // backgroundColor: theme.palette.background.default
  },
  profit: {
    fontFamily: "Press Start 2P",
    color: '#b6ff00',
    animation: 'neon4 1.5s ease-in-out infinite alternate'
  },
  losses: {
    fontFamily: "Press Start 2P",
    color: '#f19cd2',
    animation: 'neon1 1.5s ease-in-out infinite alternate',
    fontSize: 34
  }
});

function Navigator(props) {
  const { classes, ...other } = props;

  return (
    <Drawer variant="permanent" {...other}>
      <List disablePadding>
        <ListItem className={clsx(classes.firebase, classes.item, classes.itemCategory)}>
          <Logo/>
          {/* <span className={classes.profit}>Rank</span><span className={classes.losses}>Dex</span> */}
        </ListItem>
        <ListItem className={clsx(classes.item, classes.itemCategory)}  component={Link} to="/overview" button>
          <ListItemIcon className={classes.itemIcon}>
            <HomeIcon />
          </ListItemIcon>
          <ListItemText
            classes={{
              primary: classes.itemPrimary,
            }}
          >
            Leaderboard
          </ListItemText>
        </ListItem>
        {categories.map(({ id, children }) => (
          <React.Fragment key={id}>
            <ListItem className={classes.categoryHeader}>
              <ListItemText
                classes={{
                  primary: classes.categoryHeaderPrimary,
                }}
              >
                {id}
              </ListItemText>
            </ListItem>
            {children.map(({ id: childId, icon, to }) => (
                <ListItem
                  component={Link}
                  to={to}
                  key={childId}
                  button
                  className={clsx(classes.item, false && classes.itemActiveItem)}
                >
                  <ListItemIcon className={classes.itemIcon}>{icon}</ListItemIcon>
                  <ListItemText
                    classes={{
                      primary: classes.itemPrimary,
                    }}
                  >
                    {childId}
                  </ListItemText>
                </ListItem>
            ))}

            <Divider className={classes.divider} />
          </React.Fragment>
        ))}
      </List>
    </Drawer>
  );
}

Navigator.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Navigator);
