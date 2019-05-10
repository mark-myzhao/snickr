import React from 'react'
import PropTypes from 'prop-types'
// import classNames from 'classnames'
import { withStyles } from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogTitle from '@material-ui/core/DialogTitle'

import store from '../../store'


const styles = theme => ({})

class UserProfileDialog extends React.Component {
  state = {
    uemail: '',
    uname: '',
    nickname: '',
    password: '',
    confirmPassword: ''
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

  handleUpdateProfile = () => {

  }

  handleUpdatePassword = () => {

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
              />
              <TextField
                margin="dense"
                value={this.state.uname}
                label="Full Name"
                onChange={this.handleChange('uname')}
                fullWidth
              />
              <TextField
                margin="dense"
                value={this.state.nickname}
                label="Nick Name"
                onChange={this.handleChange('nickname')}
                fullWidth
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
              />
              <TextField
                margin="dense"
                id="confirm-password"
                value={this.state.confirmPassword}
                label="Confirm Password"
                type="password"
                onChange={this.handleChange('confirmPassword')}
                fullWidth
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
            onClick={handleClose}
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
