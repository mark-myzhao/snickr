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

// import store from '../../store'


const styles = theme => ({})

class UserProfileDialog extends React.Component {
  state = {
    uemail: '',
    uname: '',
    nickname: '',
    password: '',
    confirmPassword: ''
  }

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value,
    })
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
            <TextField
              margin="dense"
              id="uemail"
              value={this.state.uemail}
              label="Email Address"
              type="email"
              onChange={this.handleChange('uemail')}
              fullWidth
            />
          }
          {this.getDialogType() === 0 &&
            <TextField
              margin="dense"
              id="uname"
              value={this.state.uname}
              label="Full Name"
              type="text"
              onChange={this.handleChange('uname')}
              fullWidth
            /
          >}
          {this.getDialogType() === 0 &&
            <TextField
              margin="dense"
              id="nickname"
              value={this.state.nickname}
              label="Nick Name"
              type="text"
              onChange={this.handleChange('nickname')}
              fullWidth
            />
          }
          {this.getDialogType() === 1 &&
            <TextField
              margin="dense"
              id="password"
              value={this.state.password}
              label="New Password"
              type="password"
              onChange={this.handleChange('password')}
              fullWidth
            />
          }
          {this.getDialogType() === 1 &&
            <TextField
              margin="dense"
              id="confirm-password"
              value={this.state.confirmPassword}
              label="Confirm Password"
              type="password"
              onChange={this.handleChange('confirmPassword')}
              fullWidth
            />
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
