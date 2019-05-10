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
import AddIcon from '@material-ui/icons/Add'

import DIYTopBar from '../commons/DIYTopBar'
import MessageItem from '../items/MessageItem'
import ChannelList from '../subcomponents/ChannelList'
import ChatBox from '../subcomponents/ChatBox'
import DetailDrawer from '../subcomponents/DetailDrawer'
import WorkspaceManager from '../subcomponents/WorkspaceManager'
import AddChannelDialog from '../subcomponents/AddChannelDialog'

import axios from 'axios'
import store from '../../store'

// TODO: Edit Workspace Dialog
// TODO: Change User Type
// TODO: Join Public Channels
// TODO: Dynamic Update
// TODO: Add People to Workspace
// TODO: Add People to Channel
// TODO: Quit from Workspace
// TODO: Quit from Channel
// TODO: Display Messages (scroll / partial load)

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
    width: 240,
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
    addChannelOpen: false,
    currentWorkspace: {},  // { wid, wname, wdesc }
    currentChannel: {},    // { cname, ctime, ctype }
    isWorkspace: true,
    channels: [],
    messages: [
      {
        uemail: 'mingyusysu@gmail.com',
        uname: 'mingyu',
        mtime: 'Fri Jan 18 2019 11:00:00 GMT-0500 (EST)',
        mcontent: 'This is a testing message. This is a testing message. This is a testing message. This is a testing message. This is a testing message. This is a testing message.'
      }
    ],
    wmember: [] // uemail, uname, nickname, wmtype
  }

  async componentDidMount() {
    const { match } = this.props
    const { uemail } = store.getUser()
    const token = store.getToken()
    const wid = match.params.wid
    // GET workspaces
    try {
      if (!store.buffer.workspace) {
        // Buffer is empty, get data from the server
        let { data } = await axios.get(`/workspace/${uemail}`, {
          headers: {'Authorization': `bearer ${token}`}
        })
        store.buffer.workspace = data.workspace
      }
      for (let item of store.buffer.workspace) {
        if (`${item.wid}` === wid) {
          this.setState({
            currentWorkspace: item
          })
        }
      }
    } catch(error) {
      console.error(error)
    }

    // GET channels
    try {
      let { data } = await axios.get(`/channel/${wid}`, {
        headers: {'Authorization': `bearer ${token}`}
      })
      this.setState({
        channels: data.channels
      })
    } catch(error) {
      console.error(error)
    }

    // GET workspace members
    try {
      let { data } = await axios.get(`/wmember/${wid}`, {
        headers: {'Authorization': `bearer ${token}`}
      })
      this.setState({
        wmember: data.member
      })
    } catch(error) {
      console.error(error)
    }
  }

  // computed attributes
  getChannels = (type) => {
    return this.state.channels.filter(item => {
      return item.ctype === type
    })
  }

  getCurrentChannelName = () => {
    return this.state.currentChannel.cname ? `/${this.state.currentChannel.cname}` : ''
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
      currentChannel: {}
    })
  }

  handleDrawerClick = async (item) => {
    // set messages
    // axios.get()
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

  handleAddChannelOpen = () => {
    this.setState({
      addChannelOpen: true
    })
  }

  handleAddChannelClose = () => {
    this.setState({
      addChannelOpen: false
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
          title={`#${this.getCurrentWorkspaceName()}${this.getCurrentChannelName()}`}
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
          {
            this.getChannels('public').length > 0 &&
            <React.Fragment>
              <Divider />
              <ChannelList
                type="Public"
                currentChannel={this.state.currentChannel}
                list={this.getChannels('public')}
                handleClick={this.handleDrawerClick}
              />
            </React.Fragment>
          } {
            this.getChannels('private') > 0 &&
            <React.Fragment>
              <Divider />
              <ChannelList
                type="Private"
                currentChannel={this.state.currentChannel}
                list={this.getChannels('private')}
                handleClick={this.handleDrawerClick}
              />
            </React.Fragment>
          } {
            this.getChannels('direct') > 0 &&
            <React.Fragment>
              <Divider />
              <ChannelList
                type="Direct"
                currentChannel={this.state.currentChannel}
                list={this.getChannels('direct')}
                handleClick={this.handleDrawerClick}
              />
            </React.Fragment>
          }
          <Divider />
          <ListItem
            button
            onClick={this.handleAddChannelOpen}
          >
            <ListItemIcon>
              <AddIcon />
            </ListItemIcon>
            <ListItemText
              className={classes.nestedText}
              inset
              primary="New Channel"
            />
          </ListItem>
          <AddChannelDialog
            open={this.state.addChannelOpen}
            currentWorkspace={this.state.currentWorkspace}
            handleClose={this.handleAddChannelClose}
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
              currentWorkspace={this.state.currentWorkspace}
              currentChannel={this.state.currentChannel}
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
