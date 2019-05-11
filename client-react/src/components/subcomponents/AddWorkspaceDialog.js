import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog'
import IconButton from '@material-ui/core/IconButton'
import TextField from '@material-ui/core/TextField'
import CloseIcon from '@material-ui/icons/Close'
import Slide from '@material-ui/core/Slide'
import red from '@material-ui/core/colors/red'


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
    marginBottom: theme.spacing.unit,
  },
  newWorkspaceNameInput: {
    flexGrow: 1
  },
  button: {
    marginLeft: theme.spacing.unit * 2,
  },
  errorMessage: {
    color: red[700]
  }
})

function Transition(props) {
  return <Slide direction="up" {...props} />
}

class AddWorkspaceDialog extends React.Component {
  state = {
    newWorkspaceName: '',
    newWorkspaceDesc: '',
    errorMessage: ''
  }

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value,
    })
  }

  handleAddWorkspace = async () => {
    const you = $store.getUser()
    const token = $store.getToken()
    const wname = this.state.newWorkspaceName
    const wdesc = this.state.newWorkspaceDesc
    if (wname && wdesc) {
      try {
        console.log({
          wname,
          wdesc,
          uemail: you.uemail
        })
        const { data } = await axios.post('/workspace', {
          wname,
          wdesc,
          uemail: you.uemail,
          wmtype: 'admin'
        }, {
          headers: {'Authorization': `bearer ${token}`}
        })
        this.setState({
          errorMessage: ''
        })
        this.setState({
          newWorkspaceName: '',
          newWorkspaceDesc: ''
        })
        this.props.update()
        this.props.handleClose()
      } catch(error) {
        console.error(error)
      }
    } else {
      this.setState({
        errorMessage: 'Name and Description should not be empty.'
      })
    }
  }

  render() {
    const { classes, open, handleClose } = this.props
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
                Add a new Workspace
              </div>
              <div className={classes.inputContainer}>
                <TextField
                  className={classes.newWorkspaceNameInput}
                  value={this.state.newWorkspaceName}
                  onChange={this.handleChange('newWorkspaceName')}
                  margin="normal"
                  variant="outlined"
                  placeholder="Workspace Name"
                />
              </div>
              <div className={classes.inputContainer}>
                <TextField
                  className={classes.newWorkspaceNameInput}
                  value={this.state.newWorkspaceDesc}
                  onChange={this.handleChange('newWorkspaceDesc')}
                  margin="normal"
                  variant="outlined"
                  placeholder="Workspace Description"
                  rows="4"
                  multiline
                />
                <Button
                  className={classes.button}
                  size="large"
                  variant="contained"
                  color="primary"
                  onClick={this.handleAddWorkspace}
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
      </React.Fragment>
    )
  }
}

AddWorkspaceDialog.propTypes = {
  classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(AddWorkspaceDialog)

