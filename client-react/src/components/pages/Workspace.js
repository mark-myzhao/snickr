import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import { withStyles } from '@material-ui/core/styles'
import { withRouter } from 'react-router-dom'
import CssBaseline from '@material-ui/core/CssBaseline'
import Drawer from '@material-ui/core/Drawer'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import Typography from '@material-ui/core/Typography'
import Divider from '@material-ui/core/Divider'
import IconButton from '@material-ui/core/IconButton'
import MenuIcon from '@material-ui/icons/Menu'
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft'
import DashboardIcon from '@material-ui/icons/Dashboard'
import SettingsIcon from '@material-ui/icons/Settings'
import Button from '@material-ui/core/Button'

import MessageItem from '../items/MessageItem'
import ChannelList from '../subcomponents/ChannelList'
import store from '../../store'

const drawerWidth = 240

const styles = theme => ({
  root: {
    display: 'flex',
  },
  toolbar: {
    paddingRight: 24, // keep right padding when drawer closed
  },
  toolbarIcon: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: '0 8px',
    ...theme.mixins.toolbar,
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginLeft: 12,
    marginRight: 36,
  },
  menuButtonHidden: {
    display: 'none',
  },
  title: {
    flexGrow: 1,
  },
  drawerPaper: {
    position: 'relative',
    whiteSpace: 'nowrap',
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerPaperClose: {
    overflowX: 'hidden',
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    width: theme.spacing.unit * 7,
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing.unit * 9,
    },
  },
  appBarSpacer: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    padding: theme.spacing.unit * 3,
    height: '100vh',
    overflow: 'auto',
  },
  h5: {
    marginBottom: theme.spacing.unit * 2,
  },
  button: {
    color: '#FFFFFF',
    marginLeft: '5px'
  }
})

class Workspace extends React.Component {
  state = {
    open: true,
    currentChannel: null,
    channels: [
      {
        wid: 1,
        cname: 'channel1',
        ctype: 'public'
      }, {
        wid: 5,
        cname: 'channel5',
        ctype: 'private'
      }, {
        wid: 6,
        cname: 'D channel',
        ctype: 'direct'
      }
    ],
    messages: [
      {
        uemail: 'mingyusysu@gmail.com',
        uname: 'mingyu',
        mtime: 'Fri Jan 18 2019 11:00:00 GMT-0500 (EST)',
        mcontent: 'Haohao falls in love with Lee'
      }
    ]
  }

  // computed attributes
  getChannels = (type) => {
    return this.state.channels.filter(item => {
      return item.ctype === type
    })
  }

  getCurrentChannel = () => {
    return this.state.currentChannel ? this.state.currentChannel.cname : ''
  }

  userName = () => {
    const name = store.getUser().nickname
    return name ? name : 'Guest'
  }

  workspaceName = () => {
    // const wid = this.match.params.wid
    // get workspace name from DB or cache
    return 'Test Space'
  }

  handleDrawerOpen = () => {
    this.setState({ open: true })
  }

  handleDrawerClose = () => {
    this.setState({ open: false })
  }

  handleDrawerClick = (item) => {
    this.setState({
      currentChannel: item
    })
  }

  render() {
    const { classes } = this.props
    return (
      <div className={classes.root}>
        <CssBaseline />
        <AppBar
          position="absolute"
          color="primary"
          className={classNames(classes.appBar, this.state.open && classes.appBarShift)}
        >
          <Toolbar disableGutters={!this.state.open} className={classes.toolbar}>
            <IconButton
              color="inherit"
              aria-label="Open drawer"
              onClick={this.handleDrawerOpen}
              className={classNames(
                classes.menuButton,
                this.state.open && classes.menuButtonHidden,
              )}
            >
              <MenuIcon />
            </IconButton>
            <Typography
              component="h1"
              variant="h6"
              color="inherit"
              noWrap
              className={classes.title}
            >
              {`${this.workspaceName()}/${this.getCurrentChannel()}`}
            </Typography>
            <IconButton
              color="inherit"
              aria-label="Settings"
            >
              <SettingsIcon />
            </IconButton>
            <Button className={classes.button}>
              {this.userName()}
            </Button>
            <Button className={classes.button}>
              Logout
            </Button>
          </Toolbar>
        </AppBar>
        <Drawer
          variant="permanent"
          classes={{
            paper: classNames(classes.drawerPaper, !this.state.open && classes.drawerPaperClose),
          }}
          open={this.state.open}
        >
          <div className={classes.toolbarIcon}>
            <IconButton onClick={this.handleDrawerClose}>
              <ChevronLeftIcon />
            </IconButton>
          </div>
          <Divider />
          <List>
            <ListItem button>
              <ListItemIcon>
                <DashboardIcon />
              </ListItemIcon>
              <ListItemText primary="Dashboard" />
            </ListItem>
          </List>
          <Divider />
          <ChannelList
            type="Public"
            list={this.getChannels('public')}
            handleClick={this.handleDrawerClick}
          />
          <Divider />
          <ChannelList
            type="Private"
            list={this.getChannels('private')}
            handleClick={this.handleDrawerClick}
          />
          <Divider />
          <ChannelList
            type="Direct"
            list={this.getChannels('direct')}
            handleClick={this.handleDrawerClick}
          />
        </Drawer>
        <main className={classes.content}>
          <div className={classes.appBarSpacer} />
          <div >
            {this.state.messages.map(item => {
              return (
                <MessageItem
                  key={`${item.uemail}-${item.mtime}`}
                  message={item}
                />
              )}
            )}
          </div>
        </main>
      </div>
    )
  }
}

Workspace.propTypes = {
  classes: PropTypes.object.isRequired,
}

export default withRouter(withStyles(styles)(Workspace))
