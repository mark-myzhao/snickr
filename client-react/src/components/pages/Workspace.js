import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import { withStyles } from '@material-ui/core/styles'
import { withRouter } from 'react-router-dom'
import CssBaseline from '@material-ui/core/CssBaseline'
import Drawer from '@material-ui/core/Drawer'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import Divider from '@material-ui/core/Divider'
import IconButton from '@material-ui/core/IconButton'
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft'
import DashboardIcon from '@material-ui/icons/Dashboard'

import MessageItem from '../items/MessageItem'
import ChannelList from '../subcomponents/ChannelList'
import ChatBox from '../subcomponents/ChatBox'
import DIYTopBar from '../commons/DIYTopBar'


const drawerWidth = 240

const styles = theme => ({
  root: {
    display: 'flex',
  },
  toolbarIcon: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: '0 8px',
    ...theme.mixins.toolbar,
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
    position: 'relative',
    padding: theme.spacing.unit * 3,
    height: '100vh',
    overflow: 'auto',
    flexGrow: 1,
    display: 'flex',
    flex: 1,
    flexDirection: 'column',
  },
  h5: {
    marginBottom: theme.spacing.unit * 2,
  },
  messageContainer: {
    position: 'relative',
    overflow: 'auto',
    flexGrow: 1
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

  getWorkspaceName = () => {
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

  handleHomeClick = () => {
    this.props.history.push('/')
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
        <DIYTopBar
          open={this.state.open}
          handleDrawerOpen={this.handleDrawerOpen}
          title={`${this.getWorkspaceName()}/${this.getCurrentChannel()}`}
        />
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
            <ListItem
              button
              onClick={this.handleHomeClick}
            >
              <ListItemIcon>
                <DashboardIcon />
              </ListItemIcon>
              <ListItemText primary="Home" />
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
          <div className={classes.messageContainer}>
            {this.state.messages.map(item => {
              return (
                <MessageItem
                  key={`${item.uemail}-${item.mtime}`}
                  message={item}
                />
              )}
            )}
          </div>
          <ChatBox />
        </main>
      </div>
    )
  }
}

Workspace.propTypes = {
  classes: PropTypes.object.isRequired,
}

export default withRouter(withStyles(styles)(Workspace))
