import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import Avatar from '@material-ui/core/Avatar'
import Collapse from '@material-ui/core/Collapse'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import ListItemAvatar from '@material-ui/core/ListItemAvatar'
import Divider from '@material-ui/core/Divider'
import Dialog from '@material-ui/core/Dialog'
import DialogTitle from '@material-ui/core/DialogTitle'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import Button from '@material-ui/core/Button'
import ExitToAppIcon from '@material-ui/icons/ExitToApp'
import PersonIcon from '@material-ui/icons/Person'
import ExpandLessIcon from '@material-ui/icons/ExpandLess'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import EditIcon from '@material-ui/icons/Edit'
import AddIcon from '@material-ui/icons/Add'
import axios from 'axios'

import InvitationDialog from './InvitationDialog'
import ChannelDialog from './ChannelDialog'
import $store from '../../store'


const styles = theme => ({
  nested: {
    paddingLeft: theme.spacing.unit * 4
  },
  nestedIcon: {
    paddingLeft: 6,
  },
  nestedText: {
    marginLeft: -6,
  },
  rightDrawerContainer: {
    width: 300,
    overflow: 'auto',
    backgroundColor: theme.palette.background.paper,
    borderLeftWidth: '1px',
    borderLeftStyle: 'solid',
    borderLeftColor: 'rgba(0, 0, 0, 0.12)',
    whiteSpace: 'nowrap',
    transitionProperty: 'width',
    transitionDuration: '225ms',
    transitionTimingFunction: 'cubic-bezier(0.4, 0, 0.6, 1)',
    transitionDelay: '0ms',
  },
  rightDrawerContainerEmpty: {
    width: 0,
    overflowX: 'hidden',
    backgroundColor: theme.palette.background.paper,
    borderLeftWidth: '1px',
    borderLeftStyle: 'solid',
    borderLeftColor: 'rgba(0, 0, 0, 0.12)',
    whiteSpace: 'nowrap',
    transitionProperty: 'width',
    transitionDuration: '225ms',
    transitionTimingFunction: 'cubic-bezier(0.4, 0, 0.6, 1)',
    transitionDelay: '0ms',
  }
})

class DetailDrawer extends React.Component {
  state = {
    channelDetailOpen: false,
    addMemberOpen: false,
    memberOpen: false,
    cmember: [],  // uemail, uname, nickname
    editOpen: false,
    quitOpen: false,
  }

  componentDidMount = async () => {
    await this.updateCMember()
  }

  updateCMember = async () => {
    const { currentWorkspace, currentChannel } = this.props
    const token = $store.getToken()
    const wid = currentWorkspace.wid
    const cname = currentChannel.cname
    try {
      let { data } = await axios.get(`/cmember/${wid}/${cname}`, {
        headers: {'Authorization': `bearer ${token}`}
      })
      // console.log(data)
      this.setState({
        cmember: data.member
      })
    } catch(error) {
      // console.error(error)
      this.setState({
        cmember: []
      })
    }
  }

  handleChannelDetailClick = () => {
    this.setState(state => ({ channelDetailOpen: !state.channelDetailOpen }));
  }

  handleMemberClick = () => {
    this.setState(state => ({ memberOpen: !state.memberOpen }));
  }

  handleAddMemberOpen = () => {
    this.setState({
      addMemberOpen: true
    })
  }

  handleAddMemberClose = () => {
    this.setState({
      addMemberOpen: false
    })
  }

  handleEditDialogOpen = () => {
    this.setState({
      editOpen: true
    })
  }

  handleEditDialogClose = () => {
    this.setState({
      editOpen: false
    })
  }

  handleQuitDialogOpen = () => {
    this.setState({
      quitOpen: true
    })
  }

  handleQuitDialogClose = () => {
    this.setState({
      quitOpen: false
    })
  }

  handleQuit = async () => {
    const { currentWorkspace, currentChannel } = this.props
    const token = $store.getToken()
    const uemail = $store.getUser().uemail
    const wid = currentWorkspace.wid
    const cname = currentChannel.cname
    try {
      await axios.delete('/cmember', {
        data: {
          wid,
          cname,
          uemail
        },
        headers: {'Authorization': `bearer ${token}`}
      })
      window.location.reload()
      this.handleQuitDialogClose()
    } catch(error) {
      console.error(error)
    }
  }

  render() {
    const { classes, open, currentChannel, currentWorkspace } = this.props

    return (
      <React.Fragment>
        <div className={open ? classes.rightDrawerContainer : classes.rightDrawerContainerEmpty}>
          <List component="nav">
            <ListItem>
              <ListItemText primary={`About #${currentChannel.cname}`} />
            </ListItem>
          </List>
          <Divider />
          <List component="nav">
            <ListItem
              button
              onClick={this.handleMemberClick}
            >
              <ListItemIcon>
                <PersonIcon />
              </ListItemIcon>
              <ListItemText primary="Members" />
              {this.state.memberOpen ? <ExpandLessIcon /> : <ExpandMoreIcon />}
            </ListItem>
            <Collapse
              in={this.state.memberOpen}
              timeout="auto"
              unmountOnExit
            >
              <List
                component="div"
                disablePadding
                dense
              >
                {
                  this.state.cmember.map(item => {
                    return (
                      <ListItem
                        button
                        key={item.uemail}
                        className={classes.nested}
                      >
                        <ListItemAvatar>
                          <Avatar>
                            {item.nickname[0]}
                          </Avatar>
                        </ListItemAvatar>
                        <ListItemText
                          inset
                          primary={item.nickname}
                        />
                      </ListItem>
                    )
                  })
                } {
                  (currentChannel.ctype !== 'direct' || this.state.cmember.length < 2) &&
                  <ListItem
                    className={classes.nested}
                    button
                    onClick={this.handleAddMemberOpen}
                  >
                    <ListItemIcon className={classes.nestedIcon}>
                      <AddIcon />
                    </ListItemIcon>

                    <ListItemText
                      className={classes.nestedText}
                      inset
                      primary="Add New Member"
                    />
                  </ListItem>
                }
              </List>
            </Collapse>
            <ListItem
              button
              onClick={this.handleEditDialogOpen}
            >
              <ListItemIcon>
                <EditIcon />
              </ListItemIcon>
              <ListItemText primary="Edit" />
            </ListItem>
            <ListItem
              button
              onClick={this.handleQuitDialogOpen}
            >
              <ListItemIcon>
                <ExitToAppIcon />
              </ListItemIcon>
              <ListItemText primary="Quit" />
            </ListItem>
          </List>
          <InvitationDialog
            open={this.state.addMemberOpen}
            currentWorkspace={currentWorkspace}
            currentChannel={currentChannel}
            handleClose={this.handleAddMemberClose}
          />
          <ChannelDialog
            open={this.state.editOpen}
            op="update"
            currentWorkspace={currentWorkspace}
            currentChannel={currentChannel}
            handleClose={this.handleEditDialogClose}
          />
          <Dialog
            open={this.state.quitOpen}
            onClose={this.handleQuitDialogClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
          >
            <DialogTitle id="alert-dialog-title">{"Quit"}</DialogTitle>
            <DialogContent>
              <DialogContentText id="alert-dialog-description">
                Want to quit this channel?
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button
                onClick={this.handleQuitDialogClose}
                color="primary"
                autoFocus
              >
                Cancel
              </Button>
              <Button
                onClick={this.handleQuit}
                color="primary"
              >
                Confirm
              </Button>
            </DialogActions>
          </Dialog>
        </div>
      </React.Fragment>
    )
  }
}

DetailDrawer.propTypes = {
  classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(DetailDrawer)

