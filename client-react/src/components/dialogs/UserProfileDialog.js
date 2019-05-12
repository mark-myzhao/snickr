import React from 'react'
import PropTypes from 'prop-types'
import axios from 'axios'
import { withStyles } from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogTitle from '@material-ui/core/DialogTitle'

import store from '../../store'
import { validate } from '../../util'


const styles = theme => ({})

class UserProfileDialog extends React.Component {
  state = {
    uemail: '',
    uname: '',
    nickname: '',
    password: '',
    passwordRepeat: '',
    uemailErrorMessage: '',
    unameErrorMessage: '',
    nicknameErrorMessage: '',
    passwordErrorMessage: '',
    passwordConfirmErrorMessage: ''
  }

  componentDidMount = () => {
    const user = store.getUser()
    this.setState({
      ...user
    })
  }

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value,
    })
  }

  handleSave = async () => {
    if (this.getDialogType() === 0) {
      await this.handleUpdateProfile()
    } else if (this.getDialogType() === 1) {
      await this.handleUpdatePassword()
    }
  }

  handleUpdateProfile = async () => {
    const { uemail, uname, nickname, password, passwordRepeat } = this.state
    const token = store.getToken()
    const {
      uemailErrorMessage,
      unameErrorMessage,
      nicknameErrorMessage
    } = validate(uemail, uname, nickname, password, passwordRepeat)
    if (uemailErrorMessage || unameErrorMessage || nicknameErrorMessage) {
      this.setState({
        uemailErrorMessage,
        unameErrorMessage,
        nicknameErrorMessage
       })
       return
    }
    await axios.put(`/users/profile/${uemail}`, {
      uname, nickname
    }, {
      headers: {'Authorization': `bearer ${token}`}
    })
    store.setUser({
      uemail,
      uname,
      nickname
    })
    this.setState({
      uemailErrorMessage: '',
      unameErrorMessage: '',
      nicknameErrorMessage: '',
      passwordErrorMessage: '',
      passwordConfirmErrorMessage: ''
    })
    this.props.handleClose()
  }

  handleUpdatePassword = async () => {
    const { uemail, uname, nickname, password, passwordRepeat } = this.state
    const token = store.getToken()
    const {
      passwordErrorMessage,
      passwordConfirmErrorMessage
    } = validate(uemail, uname, nickname, password, passwordRepeat)
    if (passwordErrorMessage || passwordConfirmErrorMessage) {
      this.setState({
        passwordErrorMessage,
        passwordConfirmErrorMessage
      })
      return
    }
    await axios.put(`/users/password/${uemail}`, {
      password
    }, {
      headers: {'Authorization': `bearer ${token}`}
    })
    this.setState({
      uemailErrorMessage: '',
      unameErrorMessage: '',
      nicknameErrorMessage: '',
      passwordErrorMessage: '',
      passwordConfirmErrorMessage: ''
    })
    this.props.handleClose()
  }

  getDialogType = () => {
    if (this.props.title === 'User Profile') {
      return 0
    } else if (this.props.title === 'Change Password') {
      return 1
    } else {
      return -1
    }
  }

  render() {
    const { title, open, handleClose } = this.props
    return (
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle>{title}</DialogTitle>
        <DialogContent>
          {this.getDialogType() === 0 &&
            <React.Fragment>
              <TextField
                margin="dense"
                value={this.state.uemail}
                label="Email Address"
                onChange={this.handleChange('uemail')}
                fullWidth
                disabled
              />
              <TextField
                margin="dense"
                value={this.state.uname}
                label="Full Name"
                onChange={this.handleChange('uname')}
                fullWidth
                error={this.state.unameErrorMessage !== ''}
                helperText={this.state.unameErrorMessage}
              />
              <TextField
                margin="dense"
                value={this.state.nickname}
                label="Nick Name"
                onChange={this.handleChange('nickname')}
                fullWidth
                error={this.state.nicknameErrorMessage !== ''}
                helperText={this.state.nicknameErrorMessage}
              />
            </React.Fragment>
          }
          {this.getDialogType() === 1 &&
            <React.Fragment>
              <TextField
                margin="dense"
                id="password"
                value={this.state.password}
                label="New Password"
                type="password"
                onChange={this.handleChange('password')}
                fullWidth
                error={this.state.passwordErrorMessage !== ''}
                helperText={this.state.passwordErrorMessage}
              />
              <TextField
                margin="dense"
                id="confirm-password"
                value={this.state.passwordRepeat}
                label="Confirm Password"
                type="password"
                onChange={this.handleChange('passwordRepeat')}
                fullWidth
                error={this.state.passwordConfirmErrorMessage !== ''}
                helperText={this.state.passwordConfirmErrorMessage}
              />
            </React.Fragment>
          }
        </DialogContent>
        <DialogActions>
          <Button
            onClick={handleClose}
            color="primary"
          >
            Cancel
          </Button>
          <Button
            onClick={this.handleSave}
            color="primary"
          >
            Save
          </Button>
        </DialogActions>
      </Dialog>
    )
  }
}

UserProfileDialog.propTypes = {
  classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(UserProfileDialog)
