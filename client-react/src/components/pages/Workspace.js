import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import { withStyles } from '@material-ui/core/styles'
import { withRouter } from 'react-router-dom'
import CssBaseline from '@material-ui/core/CssBaseline'
import Avatar from '@material-ui/core/Avatar'
import Drawer from '@material-ui/core/Drawer'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import ListItemAvatar from '@material-ui/core/ListItemAvatar'
import ListSubheader from '@material-ui/core/ListSubheader'
import Divider from '@material-ui/core/Divider'
import IconButton from '@material-ui/core/IconButton'
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft'
import DashboardIcon from '@material-ui/icons/Dashboard'

import DIYTopBar from '../commons/DIYTopBar'
import MessageItem from '../items/MessageItem'
import ChannelList from '../subcomponents/ChannelList'
import ChatBox from '../subcomponents/ChatBox'
import DetailDrawer from '../subcomponents/DetailDrawer'
import WorkspaceManager from '../subcomponents/WorkspaceManager'


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
  content: {
    position: 'relative',
    height: '100vh',
    overflow: 'auto',
    flexGrow: 1,
    display: 'flex',
    flex: 1,
    flexDirection: 'row',
    paddingTop: theme.spacing.unit * 8,
  },
  h5: {
    marginBottom: theme.spacing.unit * 2,
  },
  chatAreaContainer: {
    padding: theme.spacing.unit * 3,
    overflow: 'hidden',
    display: 'flex',
    flexDirection: 'column',
    flex: 1
  },
  messageItemContainer: {
    position: 'relative',
    overflow: 'auto',
    flexDirection: 'column',
    flexGrow: 1
  },
  rightDrawerContainer: {
    width: 300,
    overflow: 'auto',
    backgroundColor: theme.palette.background.paper,
    borderLeftWidth: '1px',
    borderLeftStyle: 'solid',
    borderLeftColor: 'rgba(0, 0, 0, 0.12)',
    transitionProperty: 'width',
    transitionDuration: '225ms',
    transitionTimingFunction: 'cubic-bezier(0.4, 0, 0.6, 1)',
    transitionDelay: '0ms',
  },
  rightDrawerContainerEmpty: {
    width: 0,
    overflow: 'auto',
    backgroundColor: theme.palette.background.paper,
    borderLeftWidth: '1px',
    borderLeftStyle: 'solid',
    borderLeftColor: 'rgba(0, 0, 0, 0.12)',
    transitionProperty: 'width',
    transitionDuration: '225ms',
    transitionTimingFunction: 'cubic-bezier(0.4, 0, 0.6, 1)',
    transitionDelay: '0ms',
  },
})

class Workspace extends React.Component {
  state = {
    open: true,
    detailOpen: false,
    currentWorkspace: {
      wid: 1,
      wname: 'Test Space',
      wdesc: 'This is a workspace for testing React UI'
    },
    currentChannel: null,
    isWorkspace: true,
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
        mcontent: 'This is a testing message. This is a testing message. This is a testing message. This is a testing message. This is a testing message. This is a testing message.'
      }
    ],
    wmember: [
      {
        uemail: 'mingyusysu@gmail.com',
        nickname: 'Alex',
        uname: 'Mingyu Zhao',
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

  getCurrentWorkspaceName = () => {
    // const wid = this.match.params.wid
    // get workspace name from DB or cache
    return this.state.currentWorkspace.wname
  }

  handleDrawerOpen = () => {
    this.setState({ open: true })
  }

  handleDrawerClose = () => {
    this.setState({ open: false })
  }

  handleWorkspaceClick = () => {
    this.setState({
      isWorkspace: true,
      currentChannel: null
    })
  }

  handleDrawerClick = (item) => {
    this.setState({
      currentChannel: item,
      isWorkspace: false
    })
  }

  handleDetailClick = () => {
    const current = this.state.detailOpen
    this.setState({
      detailOpen: !current
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
          title={`#${this.getCurrentWorkspaceName()}${this.getCurrentChannel()}`}
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
              selected={this.state.isWorkspace}
              onClick={this.handleWorkspaceClick}
            >
              <ListItemIcon>
                <DashboardIcon />
              </ListItemIcon>
              <ListItemText primary="Workspace" />
            </ListItem>
          </List>
          <Divider />
          <ChannelList
            type="Public"
            currentChannel={this.getCurrentChannel()}
            list={this.getChannels('public')}
            handleClick={this.handleDrawerClick}
          />
          <Divider />
          <ChannelList
            type="Private"
            currentChannel={this.getCurrentChannel()}
            list={this.getChannels('private')}
            handleClick={this.handleDrawerClick}
          />
          <Divider />
          <ChannelList
            type="Direct"
            currentChannel={this.getCurrentChannel()}
            list={this.getChannels('direct')}
            handleClick={this.handleDrawerClick}
          />
        </Drawer>
        {
          !this.state.isWorkspace &&
          <main className={classes.content}>
            <div className={classes.chatAreaContainer}>
              <div className={classes.messageItemContainer}>
                {this.state.messages.map(item => {
                  return (
                    <MessageItem
                      key={`${item.uemail}-${item.mtime}`}
                      message={item}
                    />
                  )}
                )}
              </div>
              <ChatBox
                handleDetailClick={this.handleDetailClick}
              />
            </div>
            <DetailDrawer
              open={this.state.detailOpen}
              currentChannel={this.getCurrentChannel()}
            />
          </main>
        } {
          this.state.isWorkspace &&
          <main className={classes.content}>
            <WorkspaceManager
              wmember={this.state.wmember}
              currentWorkspace={this.state.currentWorkspace}
            />
          </main>
        }
      </div>
    )
  }
}

Workspace.propTypes = {
  classes: PropTypes.object.isRequired,
}

export default withRouter(withStyles(styles)(Workspace))
