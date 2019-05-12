import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import axios from 'axios'
import { setIntervalAsync } from 'set-interval-async/dynamic'
import { clearIntervalAsync } from 'set-interval-async'
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
import CircularProgress from '@material-ui/core/CircularProgress'
import ScrollToBottom from 'react-scroll-to-bottom'

import MessageItem from '../items/MessageItem'
import DIYTopBar from '../subcomponents/DIYTopBar'
import ChannelList from '../subcomponents/ChannelList'
import ChatBox from '../subcomponents/ChatBox'
import DetailDrawer from '../subcomponents/DetailDrawer'
import WorkspaceManager from '../subcomponents/WorkspaceManager'
import AddChannelDialog from '../dialogs/AddChannelDialog'

import store from '../../store'


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
  loading: {
    position: 'relative',
    left: '90px',
    top: '150px',
  },
  contentLoading: {
    position: 'relative',
    height: '100vh',
    overflow: 'auto',
    flexGrow: 1,
    display: 'flex',
    flex: 1,
    flexDirection: 'row',
    paddingTop: theme.spacing.unit * 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  memberLoading: {
    // position: 'relative',
    // left: '90px',
    // top: '40vh',
  }
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
    messages: [], // { uemail, uname, nickname, mtime, mcontent, message }
    wmember: [],  // uemail, uname, nickname, wmtype
    messageTimer: null,
    isLoading: true,
  }

  async componentDidMount() {
    await this.updateAll()
    this.setState({
      isLoading: false
    })
  }

  updateAll = async () => {
    const { match } = this.props
    const { uemail } = store.getUser()
    const token = store.getToken()
    const wid = match.params.wid

    // GET workspaces
    await this.updateWorkspace(wid, uemail, token)

    // GET channels
    await this.updateChannel(wid, uemail, token)

    // GET workspace members
    await this.updateWorkspaceMember(wid, token)
  }

  updateWorkspace = async (wid, uemail, token) => {
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
      // console.error(error)
      this.setState({
        currentWorkspace: []
      })
    }
  }

  updateChannel = async (wid, uemail, token) => {
    try {
      let { data } = await axios.get(`/channel/${wid}/${uemail}`, {
        headers: {'Authorization': `bearer ${token}`}
      })
      this.setState({
        channels: data.channels
      })
    } catch(error) {
      // console.error(error)
      this.setState({
        channels: []
      })
    }
  }

  updateWorkspaceMember = async (wid, token) => {
    try {
      let { data } = await axios.get(`/wmember/${wid}`, {
        headers: {'Authorization': `bearer ${token}`}
      })
      this.setState({
        wmember: data.member
      })
    } catch(error) {
      // console.error(error)
      this.setState({
        wmember: []
      })
    }
  }

  // computed attributes
  getChannels = (type) => {
    return this.state.channels.filter(item => {
      return item.ctype.toLowerCase() === type.toLowerCase()
    })
  }

  getAllPublicChannel = () => {
    return []
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
    if (this.state.messageTimer) {
      clearIntervalAsync(this.state.messageTimer)
    }
    this.setState({
      isWorkspace: true,
      currentChannel: {},
      messageTimer: null,
    })
  }

  handleDrawerClick = async (item) => {
    // set messages
    const wid = this.props.match.params.wid
    const cname = item.cname
    await this.updateMessage(wid, cname)
    if (this.state.messageTimer) {
      clearIntervalAsync(this.state.messageTimer)
    }
    let messageTimer = setIntervalAsync(this.updateMessage, 2000, wid, cname)
    this.setState({
      currentChannel: item,
      isWorkspace: false,
      messageTimer
    })
  }

  updateMessage = async (wid, cname) => {
    try {
      const token = store.getToken()
      let { data } = await axios.get(`/message/${wid}/${cname}`, {
        headers: {'Authorization': `bearer ${token}`}
      })
      let sortedMessage = data.message.sort((a, b) => {
        return new Date(b.mtime) < new Date(a.mtime) ? 1 : -1
      })
      this.setState({
        messages: sortedMessage
      })
    } catch(error) {
      // console.error(error)
      this.setState({
        messages: []
      })
    }
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
    const wid = this.props.match.params.wid
    const cname = this.state.currentChannel.cname
    const { isLoading } = this.state
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
            isLoading &&
            <CircularProgress className={classes.loading} />
          } {
            !isLoading && this.getChannels('public').length > 0 &&
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
            !isLoading && this.getChannels('private').length > 0 &&
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
            !isLoading && this.getChannels('direct').length > 0 &&
            <React.Fragment>
              <Divider />
              <ChannelList
                type="Direct"
                currentChannel={this.state.currentChannel}
                list={this.getChannels('direct')}
                handleClick={this.handleDrawerClick}
              />
            </React.Fragment>
          } {
            !isLoading &&
            <>
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
            </>
          } {
            this.state.currentWorkspace.wid &&
            <AddChannelDialog
              open={this.state.addChannelOpen}
              currentWorkspace={this.state.currentWorkspace}
              updateChannel={this.updateChannel}
              handleClose={this.handleAddChannelClose}
            />
          }
        </Drawer>
        {
          !this.state.isWorkspace &&
          <main className={classes.content}>
            <div
              className={classes.chatAreaContainer}
            >
              <ScrollToBottom
                className={classes.messageItemContainer}
              >
                {this.state.messages.map(item => {
                  return (
                    <MessageItem
                      key={`${item.uemail}-${item.mtime}`}
                      message={item}
                    />
                  )}
                )}
              </ScrollToBottom>
              <ChatBox
                wid={wid}
                cname={cname}
                updateMessage={this.updateMessage}
                handleDetailClick={this.handleDetailClick}
              />
            </div>
            <DetailDrawer
              open={this.state.detailOpen}
              currentWorkspace={this.state.currentWorkspace}
              currentChannel={this.state.currentChannel}
              updateChannel={this.updateChannel}
            />
          </main>
        } {
          isLoading &&
          <main className={classes.contentLoading}>
            <CircularProgress className={classes.memberLoading} />
          </main>
        } {
          !isLoading && this.state.isWorkspace &&
          <main className={classes.content}>
            <WorkspaceManager
              wmember={this.state.wmember}
              updateMember={this.updateWorkspaceMember}
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
