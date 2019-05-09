import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
// import TextField from '@material-ui/core/TextField'
import Dialog from '@material-ui/core/Dialog'
import IconButton from '@material-ui/core/IconButton'
import TextField from '@material-ui/core/TextField'
import CloseIcon from '@material-ui/icons/Close'
import Slide from '@material-ui/core/Slide'


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
    marginBottom: theme.spacing.unit * 4,
  },
  closeButton: {
    position: 'absolute',
    right: '1rem',
    top: '1rem',
  },
})

function Transition(props) {
  return <Slide direction="up" {...props} />
}

class InvitationDialog extends React.Component {
  state = {
    inviteEmail: ''
  }

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value,
    })
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
              onClick={handleClose}
              aria-label="Close"
              className={classes.closeButton}
            >
              <CloseIcon />
            </IconButton>
            <div className={classes.content}>
              <div className={classes.title}>
                Add people to #{currentWorkspace.wname}{currentChannel ? `/${currentChannel.cname}` : ''}
              </div>
              <TextField
                className={classes.inviteEmail}
                value={this.state.inviteEmail}
                onChange={this.handleChange('inviteEmail')}
                margin="normal"
                variant="outlined"
                placeholder="Message"
              />
            </div>
          </div>
        </Dialog>
      </React.Fragment>
    )
  }
}

InvitationDialog.propTypes = {
  classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(InvitationDialog)

