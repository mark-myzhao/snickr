import React,  { Component } from 'react'
import withStyles from '@material-ui/core/styles/withStyles'
import { Link, withRouter } from 'react-router-dom'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import Toolbar from '@material-ui/core/Toolbar'
import AppBar from '@material-ui/core/AppBar'
import Tabs from '@material-ui/core/Tabs'
import Tab from '@material-ui/core/Tab'
import MenuIcon from '@material-ui/icons/Menu'
import IconButton from '@material-ui/core/IconButton'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer'
import Button from '@material-ui/core/Button'
import Menu from './Menu'

import store from '../../store'
import logo from '../../images/logo.svg'

const styles = theme => ({
  appBar: {
    position: 'relative',
    backgroundColor: 'white'
  },
  logo: {
    'vertical-align': 'text-top',
    width: 35
  },
  inline: {
    display: 'inline'
  },
  button: {
    margin: theme.spacing.unit,
  },
  flex: {
    display: 'flex',
    [theme.breakpoints.down('sm')]: {
      display: 'flex',
      justifyContent: 'space-evenly',
      alignItems: 'center'
    }
  },
  grow: {
    flexGrow: 1
  },
  link: {
    textDecoration: 'none',
    color: 'inherit'
  },
  productLogo: {
    display: 'inline-block',
    // borderLeft: `1px solid ${theme.palette.grey['A100']}`,
    // marginRight: 32,
    // paddingRight: 24,
    [theme.breakpoints.up('md')]: {
      paddingTop: 22
    }
  },
  tagline: {
    display: 'inline-block',
    marginLeft: 5,
    [theme.breakpoints.up('md')]: {
      paddingTop: 15
    }
  },
  iconContainer: {
    display: 'none',
    [theme.breakpoints.down('sm')]: {
      display: 'block'
    }
  },
  iconButton: {
    float: 'right'
  },
  tabContainer: {
    marginLeft: 32,
    [theme.breakpoints.down('sm')]: {
      display: 'none'
    }
  },
  tabItem: {
    paddingTop: 15,
    paddingBottom: 15,
    minWidth: 'auto'
  }
})

class Topbar extends Component {

  state = {
    value: 0,
    menuDrawer: false
  }

  componentDidMount() {
    window.scrollTo(0, 0)
  }

  handleChange = (event, value) => {
    this.setState({ value })
  }

  mobileMenuOpen = (event) => {
    this.setState({ menuDrawer: true })
  }

  mobileMenuClose = (event) => {
    this.setState({ menuDrawer: false })
  }

  // computed attributes
  userName = () => {
    const name = store.getUser().nickname
    return name ? name : 'Guest'
  }

  current = () => {
    const switcher = {
      '/': 0,
      '/profile': 1
    }
    return switcher[this.props.location.pathname]
  }

  render() {
    const { classes } = this.props

    return (
      <AppBar
        position="static"
        color="default"
        className={classes.appBar}
      >
        <Toolbar>
            <Grid
              container
              spacing={24}
              alignItems="baseline"
            >
              <Grid
                item xs={12}
                className={classes.flex}
              >
                <div className={classes.inline}>
                  <Typography
                    variant="h6"
                    color="inherit"
                    noWrap
                  >
                    <Link to='/' className={classes.link}>
                      <img
                        className={classes.logo}
                        src={logo}
                        alt="logo"
                      />
                      <span className={classes.tagline}>Snickr</span>
                    </Link>
                  </Typography>
                </div>
                { !this.props.noTabs && (
                  <React.Fragment>
                    <div className={classes.iconContainer}>
                      <IconButton
                        onClick={this.mobileMenuOpen}
                        color="inherit"
                        aria-label="Menu"
                        className={classes.iconButton}
                      >
                        <MenuIcon />
                      </IconButton>
                    </div>
                    <div className={classes.tabContainer}>
                      <SwipeableDrawer
                        anchor="right"
                        open={this.state.menuDrawer}
                        onClose={this.mobileMenuClose}
                        onOpen={this.mobileMenuOpen}
                      >
                        <List>
                          {Menu.map((item, index) => (
                            <ListItem
                              key={item.label}
                              component={Link}
                              to={{pathname: item.pathname, search: this.props.location.search}}
                              button
                            >
                              <ListItemText primary={item.label} />
                            </ListItem>
                          ))}
                        </List>
                      </SwipeableDrawer>
                      <Tabs
                        value={this.current() || this.state.value}
                        indicatorColor="primary"
                        textColor="primary"
                        onChange={this.handleChange}
                      >
                        {Menu.map((item, index) => (
                          <Tab
                            key={index}
                            component={Link}
                            to={{pathname: item.pathname, search: this.props.location.search}}
                            label={item.label}
                            classes={{root: classes.tabItem}}
                          />
                        ))}
                      </Tabs>
                    </div>
                    <div className={classes.grow} />
                    <Button
                      color="primary"
                      className={classes.button}
                    >
                      {this.userName()}
                    </Button>
                    <Button className={classes.button}>
                      Logout
                    </Button>
                  </React.Fragment>
                )}
              </Grid>
            </Grid>
        </Toolbar>
      </AppBar>
    )
  }
}

export default withRouter(withStyles(styles)(Topbar))
