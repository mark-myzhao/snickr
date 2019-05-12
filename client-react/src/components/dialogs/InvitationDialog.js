import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog'
import IconButton from '@material-ui/core/IconButton'
import TextField from '@material-ui/core/TextField'
import CloseIcon from '@material-ui/icons/Close'
import Slide from '@material-ui/core/Slide'
import Snackbar from '@material-ui/core/Snackbar'
import red from '@material-ui/core/colors/red'
import green from '@material-ui/core/colors/green'

import DIYSnackbar from '../subcomponents/DIYSnackbar'
import axios from 'axios'
import $store from '../../store'

const styles = theme => ({
  panelContainer: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'flex-start',
    overflowX: 'hidden',
    overflowY: 'auto',
  },
  content: {
    width: '640px',
    height: '100vh',
    maxWidth: '100%',
    display: 'flex',
    flexDirection: 'column',
    paddingTop: theme.spacing.unit * 13,
    marginLeft: theme.spacing.unit * 4,
    marginRight: theme.spacing.unit * 4,
  },
  title: {
    color: '#1d1c1d',
    fontSize: '34px',
    lineHeight: '41px',
    fontWeight: 700,
    marginBottom: theme.spacing.unit * 3,
  },
  closeButton: {
    position: 'absolute',
    right: '4rem',
    top: '3.5rem',
  },
  inputContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: theme.spacing.unit * 4,
  },
  inviteEmailInput: {
    flexGrow: 1
  },
  button: {
    marginLeft: theme.spacing.unit,
  },
  button2: {
    marginLeft: theme.spacing.unit * -1,
  },
  errorMessage: {
    color: red[700]
  },
  snack: {
    marginTop: theme.spacing.unit * 8,
  },
  snackErrorRoot: {
    backgroundColor: red[700],
  },
  snackInfoRoot: {
    backgroundColor: green[700],
  },
  icon: {
    fontSize: 20,
    opacity: 0.9,
    marginRight: theme.spacing.unit,
  },
  message: {
    display: 'flex',
    alignItems: 'center',
  },
})

function Transition(props) {
  return <Slide direction="up" {...props} />
}

class InvitationDialog extends React.Component {
  state = {
    inviteEmail: '',
    errorMessage: '',
    vertical: 'top',
    horizontal: 'center',
    snackbarErrorOpen: false,
    snackbarInfoOpen: false,
    snackMessage: ''
  }

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value,
    })
  }

  handleSnackbarErrorOpen = () => {
    this.setState({ snackbarErrorOpen: true })
  }

  handleSnackbarErrorClose = () => {
    this.setState({ snackbarErrorOpen: false })
  }

  handleSnackbarInfoOpen = () => {
    this.setState({ snackbarInfoOpen: true })
  }

  handleSnackbarInfoClose = () => {
    this.setState({ snackbarInfoOpen: false })
  }

  handleAddClick = async () => {
    const { currentChannel } = this.props
    const token = $store.getToken()
    const you = $store.getUser()
    const target = this.state.inviteEmail
    if (target === '') {
      this.setState({
        errorMessage: 'Please use a validate email'
      })
      return
    }
    if (!currentChannel) {
      await this.sendWorkspaceInvitation(target, you, token)
    } else {
      await this.sendChannelInvitation(target, you, token)
    }
  }

  sendWorkspaceInvitation = async (target, you, token) => {
    const { currentWorkspace, handleClose } = this.props
    try {
      await axios.get(`/users/${target}`, {
        headers: {'Authorization': `bearer ${token}`}
      })
    } catch(error) {
      this.setState({
        snackMessage: 'The user does not exist'
      })
      this.handleSnackbarErrorOpen()
      return
    }
    try {
      const { data } = await axios.post('/winvitation', {
        semail: you.uemail,
        remail: target,
        wid: currentWorkspace.wid
      }, {
        headers: {'Authorization': `bearer ${token}`}
      })
      if (data.success) {
        this.handleSnackbarInfoOpen()
        handleClose()
      } else {
        this.setState({
          snackMessage: data.error
        })
        this.handleSnackbarErrorOpen()
      }
    } catch(error) {
      console.error(error)
    }
  }

  sendChannelInvitation = async (target, you, token) => {
    const { currentWorkspace, currentChannel, handleClose } = this.props
    try {
      const { data } = await axios.post('/cinvitation', {
        semail: you.uemail,
        remail: target,
        cname: currentChannel.cname,
        wid: currentWorkspace.wid
      }, {
        headers: {'Authorization': `bearer ${token}`}
      })
      console.log(data)
      if (data.success) {
        this.handleSnackbarInfoOpen()
        handleClose()
      } else {
        this.setState({
          snackMessage: data.error
        })
        this.handleSnackbarErrorOpen()
      }
    } catch(error) {
      console.error(error)
    }
  }

  render() {
    const { classes, open, handleClose, currentWorkspace, currentChannel } = this.props
    return (
      <React.Fragment>
        <Dialog
          fullScreen
          open={open}
          onClose={handleClose}
          TransitionComponent={Transition}
        >
          <div className={classes.panelContainer}>
            <IconButton
              color="inherit"
              fontSize="large"
              onClick={handleClose}
              aria-label="Close"
              className={classes.closeButton}
            >
              <CloseIcon />
            </IconButton>
            <div className={classes.content}>
              <div className={classes.title}>
                Add people to #{currentChannel ? `${currentChannel.cname}` : `${currentWorkspace.wname}`}
              </div>
              <div className={classes.inputContainer}>
                <TextField
                  className={classes.inviteEmailInput}
                  value={this.state.inviteEmail}
                  onChange={this.handleChange('inviteEmail')}
                  margin="normal"
                  variant="outlined"
                  placeholder="User Email"
                />
                <Button
                  className={classes.button}
                  size="large"
                  variant="contained"
                  onClick={this.handleAddClick}
                >
                  Add
                </Button>
              </div>
              {
                this.state.errorMessage &&
                <div className={classes.errorMessage}>
                  {this.state.errorMessage}
                </div>
              }
            </div>
          </div>
        </Dialog>
        <Snackbar
          anchorOrigin={{
            vertical: 'top',
            horizontal: 'center',
          }}
          open={this.state.snackbarErrorOpen}
          autoHideDuration={6000}
          onClose={this.handleSnackbarErrorClose}
        >
          <DIYSnackbar
            onClose={this.handleSnackbarErrorClose}
            variant="error"
            message={this.state.snackMessage}
          />
        </Snackbar>
        <Snackbar
          anchorOrigin={{
            vertical: 'top',
            horizontal: 'center',
          }}
          open={this.state.snackbarInfoOpen}
          autoHideDuration={6000}
          onClose={this.handleSnackbarInfoClose}
        >
          <DIYSnackbar
            onClose={this.handleSnackbarInfoClose}
            variant="success"
            message="Invitation has been sent"
          />
        </Snackbar>
      </React.Fragment>
    )
  }
}

InvitationDialog.propTypes = {
  classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(InvitationDialog)

