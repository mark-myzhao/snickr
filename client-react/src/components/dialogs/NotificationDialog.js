import React from 'react'
import PropTypes from 'prop-types'
import axios from 'axios'
import { withStyles } from '@material-ui/core/styles'
import Dialog from '@material-ui/core/Dialog'
import ExpansionPanel from '@material-ui/core/ExpansionPanel'
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary'
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails'
import ExpansionPanelActions from '@material-ui/core/ExpansionPanelActions'
import Divider from '@material-ui/core/Divider'
import Button from '@material-ui/core/Button'
import IconButton from '@material-ui/core/IconButton'
import Typography from '@material-ui/core/Typography'
import CloseIcon from '@material-ui/icons/Close'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import Slide from '@material-ui/core/Slide'

import $store from '../../store'

const numToMonth = [
  'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
  'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
]

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
  summary: {
    alignItems: 'baseline'
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
  heading: {
    fontSize: theme.typography.pxToRem(15),
  },
  secondaryHeading: {
    marginLeft: theme.spacing.unit * 4,
    fontSize: theme.typography.pxToRem(15),
    color: theme.palette.text.secondary,
  },
  details: {
    alignItems: 'center',
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
  newChannelNameInput: {
    flexGrow: 1
  },
  button: {
    marginLeft: theme.spacing.unit,
  },
  button2: {
    marginLeft: theme.spacing.unit * -1,
  },
})

function Transition(props) {
  return <Slide direction="up" {...props} />
}

class NotificationDialog extends React.Component {
  state = {}

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value,
    })
  }

  handleAcceptWorkspace = wid => async () => {
    const you = $store.getUser()
    const token = $store.getToken()
    const { update } = this.props
    try {
      console.log({
        uemail: you.uemail,
        wid,
        wmtype: 'user'
      })
      const { data } = await axios.post('/wmember', {
        uemail: you.uemail,
        wid,
        wmtype: 'user'
      }, {
        headers: {'Authorization': `bearer ${token}`}
      })
      console.log(data)
      await update()
    } catch(error) {
      console.log(error)
    }
  }

  handleDeclineWorkspace = (wid, semail) => async () => {
    const you = $store.getUser()
    const token = $store.getToken()
    const { update } = this.props
    try {
      await axios.delete('/winvitation', {
        headers: {'Authorization': `bearer ${token}`},
        data: {
          wid,
          semail,
          remail: you.uemail,
        }
      })
      await update()
    } catch(error) {
      console.log(error)
    }
  }

  handleAcceptChannel = (wid, cname) => async () => {
    const you = $store.getUser()
    const token = $store.getToken()
    const { update } = this.props
    try {
      const { data } = await axios.post('/cmember', {
        wid,
        cname,
        uemail: you.uemail
      }, {
        headers: {'Authorization': `bearer ${token}`}
      })
      console.log(data)
      await update()
    } catch(error) {
      console.log(error)
    }
  }

  handleDeclineChannel = (wid, cname, semail) => async () => {
    const you = $store.getUser()
    const token = $store.getToken()
    const { update } = this.props
    try {
      await axios.delete(`/cmember`, {
        headers: {'Authorization': `bearer ${token}`},
        data: {
          wid,
          cname,
          semail,
          remail: you.uemail,
        }
      })
      await update()
    } catch(error) {
      console.log(error)
    }
  }

  render() {
    const { classes, open, handleClose, cinvitation, winvitation } = this.props
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
            <div
              className={classes.content}
            >
              {
                (cinvitation.length + winvitation.length) === 0 &&
                <div className={classes.title}>
                  No notification right now ...
                </div>
              } {
                winvitation.length > 0 &&
                <React.Fragment>
                  <div className={classes.title}>
                    Workspace Invitations
                  </div>
                  { winvitation.map(item => {
                      let t = new Date(item.witime)
                      return (
                        <ExpansionPanel key={item.semail}>
                          <ExpansionPanelSummary
                            className={classes.summary}
                            expandIcon={<ExpandMoreIcon />}
                          >
                            <Typography
                              variant="h6"
                              color="primary"
                              className={classes.heading}
                            >
                              from {item.semail}
                            </Typography>
                            <Typography
                              variant="subtitle2"
                              className={classes.secondaryHeading}
                            >
                              {numToMonth[t.getMonth()]} {t.getDate()}, {t.getFullYear()}
                            </Typography>
                          </ExpansionPanelSummary>
                          <ExpansionPanelDetails className={classes.details}>
                            <div>
                              <Typography variant="body2">
                                {item.sname} has invited you to join #{item.wname}
                              </Typography>
                            </div>
                          </ExpansionPanelDetails>
                          <Divider />
                          <ExpansionPanelActions>
                            <Button
                              size="small"
                              onClick={this.handleDeclineWorkspace(item.wid, item.semail)}
                            >
                              Decline
                            </Button>
                            <Button
                              size="small"
                              color="primary"
                              onClick={this.handleAcceptWorkspace(item.wid)}
                            >
                              Accept
                            </Button>
                          </ExpansionPanelActions>
                        </ExpansionPanel>
                      )
                    })
                  }
                </React.Fragment>
              } {
                cinvitation.length > 0 &&
                <React.Fragment>
                  <div className={classes.title}>
                    Channel Invitations
                  </div>
                  { cinvitation.map(item => {
                      let t = new Date(item.citime)
                      return (
                        <ExpansionPanel key={item.semail}>
                          <ExpansionPanelSummary
                            className={classes.summary}
                            expandIcon={<ExpandMoreIcon />}
                          >
                            <Typography
                              variant="h6"
                              color="primary"
                              className={classes.heading}
                            >
                              from {item.semail}
                            </Typography>
                            <Typography
                              variant="subtitle2"
                              className={classes.secondaryHeading}
                            >
                              {numToMonth[t.getMonth()]} {t.getDate()}, {t.getFullYear()}
                            </Typography>
                          </ExpansionPanelSummary>
                          <ExpansionPanelDetails className={classes.details}>
                            <div>
                              <Typography variant="body2">
                                {item.sname} has invited you to join #{item.wname}/{item.cname}
                              </Typography>
                            </div>
                          </ExpansionPanelDetails>
                          <Divider />
                          <ExpansionPanelActions>
                            <Button
                              size="small"
                              onClick={this.handleDeclineChannel(item.wid, item.cname, item.semail)}
                            >
                              Decline
                            </Button>
                            <Button
                              size="small"
                              color="primary"
                              onClick={this.handleAcceptChannel(item.wid, item.cname)}
                            >
                              Accept
                            </Button>
                          </ExpansionPanelActions>
                        </ExpansionPanel>
                      )
                    })
                  }
                </React.Fragment>
              }
            </div>
          </div>
        </Dialog>
      </React.Fragment>
    )
  }
}

NotificationDialog.propTypes = {
  classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(NotificationDialog)
