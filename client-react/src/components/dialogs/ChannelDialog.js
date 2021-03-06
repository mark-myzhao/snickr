import React from 'react'
import PropTypes from 'prop-types'
import axios from 'axios'
import { withStyles } from '@material-ui/core/styles'
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog'
import IconButton from '@material-ui/core/IconButton'
import TextField from '@material-ui/core/TextField'
import CloseIcon from '@material-ui/icons/Close'
import Slide from '@material-ui/core/Slide'
import MenuItem from '@material-ui/core/MenuItem'
import InputLabel from '@material-ui/core/InputLabel'
import Input from '@material-ui/core/Input'
import FormControl from '@material-ui/core/FormControl'
import Select from '@material-ui/core/Select'

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
  },
  newChannelNameInput: {
    flexGrow: 1
  },
  button: {
    marginLeft: theme.spacing.unit,
  },
  formControl: {
    margin: theme.spacing.unit,
    minWidth: 120,
    flexGrow: 1
  },
})

function Transition(props) {
  return <Slide direction="up" {...props} />
}

class ChannelDialog extends React.Component {
  state = {
    newChannelName: '',
    newChannelType: '',
    errorMessage: ''
  }

  componentDidMount = () => {
    const { op, currentChannel } = this.props
    if (op.toLowerCase() === 'update' && currentChannel) {
      this.setState({
        newChannelName: currentChannel.cname,
        newChannelType: currentChannel.ctype
      })
    }
  }

  handleSubmit = (op) => async () => {
    const you = $store.getUser()
    const token = $store.getToken()
    const { currentWorkspace, currentChannel } = this.props
    const cname = this.state.newChannelName
    const ctype = this.state.newChannelType
    const wid = currentWorkspace.wid

    if (op.toLowerCase() === 'add') {
      await this.handleAddChannel(wid, cname, ctype, token, you.uemail)
    } else if (op.toLowerCase() === 'update') {
      await this.handleUpdateChannel(wid, currentChannel.cname, cname, ctype, token, you.uemail)
    }
  }

  handleAddChannel = async (wid, cname, ctype, token, uemail) => {
    if (cname && ctype) {
      try {
        await axios.post('/channel', {
          wid, cname, ctype, uemail
        }, {
          headers: {'Authorization': `bearer ${token}`}
        })
        this.setState({
          errorMessage: '',
          newWorkspaceName: '',
          newWorkspaceDesc: ''
        })
        await this.props.updateChannel(wid, uemail, token)
        this.props.handleClose()
      } catch(error) {
        console.error(error)
        this.setState({
          errorMessage: 'Channel with the same name already exists.'
        })
      }
    } else {
      this.setState({
        errorMessage: 'Name should not be empty.'
      })
    }
  }

  handleUpdateChannel = async (wid, oname, cname, ctype, token, uemail) => {
    if (cname && ctype) {
      try {
        await axios.put('/channel', {
          wid, oname, cname, ctype, uemail
        }, {
          headers: {'Authorization': `bearer ${token}`}
        })
        this.setState({
          errorMessage: '',
          newWorkspaceName: '',
          newWorkspaceDesc: ''
        })
        await this.props.updateChannel(wid, uemail, token)
        this.props.handleClose()
      } catch(error) {
        console.error(error)
        this.setState({
          errorMessage: 'Channel with the same name already exists.'
        })
      }
    } else {
      this.setState({
        errorMessage: 'Name should not be empty.'
      })
    }
  }

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value,
    })
  }

  render() {
    const { classes, open, op, handleClose, currentWorkspace } = this.props
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
                Add new channel to #{currentWorkspace.wname}
              </div>
              <div className={classes.inputContainer}>
                <TextField
                  className={classes.newChannelNameInput}
                  value={this.state.newChannelName}
                  onChange={this.handleChange('newChannelName')}
                  margin="normal"
                  variant="outlined"
                  placeholder="Channel Name"
                />
              </div>
              <div className={classes.inputContainer}>
                <FormControl className={classes.formControl}>
                  <InputLabel htmlFor="name-readonly">Type</InputLabel>
                  <Select
                    value={this.state.newChannelType}
                    onChange={this.handleChange('newChannelType')}
                    input={<Input name="newChannelType" />}
                  >
                    <MenuItem value="public">Public</MenuItem>
                    <MenuItem value="private">Private</MenuItem>
                    <MenuItem value="direct">Direct</MenuItem>
                  </Select>
                </FormControl>
                <Button
                  className={classes.button}
                  size="large"
                  variant="contained"
                  color="primary"
                  onClick={this.handleSubmit(op)}
                >
                  {op.toUpperCase()}
                </Button>
              </div>
            </div>
          </div>
        </Dialog>
      </React.Fragment>
    )
  }
}

ChannelDialog.propTypes = {
  classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(ChannelDialog)

