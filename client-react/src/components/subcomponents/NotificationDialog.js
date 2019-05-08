import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import { withStyles } from '@material-ui/core/styles'
// import TextField from '@material-ui/core/TextField'
import Dialog from '@material-ui/core/Dialog'
import ExpansionPanel from '@material-ui/core/ExpansionPanel'
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary'
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails'
import ExpansionPanelActions from '@material-ui/core/ExpansionPanelActions'
import Divider from '@material-ui/core/Divider'
import Button from '@material-ui/core/Button'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import IconButton from '@material-ui/core/IconButton'
import Typography from '@material-ui/core/Typography'
import CloseIcon from '@material-ui/icons/Close'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import Slide from '@material-ui/core/Slide'

// import Typography from '@material-ui/core/Typography'

const styles = theme => ({
  panelContainer: {
    padding: theme.spacing.unit * 2,
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
  appBar: {
    position: 'relative',
  },
  flex: {
    flex: 1,
  },
  groupTitle: {
    margin: theme.spacing.unit
  }
})

function Transition(props) {
  return <Slide direction="up" {...props} />
}

class NotificationDialog extends React.Component {
  getMergedInvitations = (cinvitation, winvitation) => {
    // TODO:
    // let totalInvitations = []
    // for (let item of winvitation) {

    // }
    // for (let item of cinvitation) {
    //   totalInvitations.push({
    //     sender: {
    //       semail: '...',
    //       sname: '...'
    //     },
    //     target: `${item.wid}/${item.cname}`,
    //     time: item.citime
    //   })
    // }
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
          <AppBar className={classes.appBar}>
            <Toolbar>
              <Typography variant="h6" color="inherit" className={classes.flex}>
                Received Invitations
              </Typography>
              <IconButton color="inherit" onClick={handleClose} aria-label="Close">
                <CloseIcon />
              </IconButton>
            </Toolbar>
          </AppBar>
          <div
            className={classes.panelContainer}
          >
            {[1, 2, 3].map(item => {
              return (
                <ExpansionPanel key={item}>
                  <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                    <Typography
                      variant="h6"
                      color="primary"
                      className={classes.heading}
                    >
                      Workspace Invitation
                    </Typography>
                    <Typography
                      variant="subtitle2"
                      className={classes.secondaryHeading}
                    >
                      2018-12-25
                    </Typography>
                  </ExpansionPanelSummary>
                  <ExpansionPanelDetails className={classes.details}>
                    <div>
                      <Typography variant="body2">
                        Mingyu has invited you to join W1
                      </Typography>
                    </div>
                  </ExpansionPanelDetails>
                  <Divider />
                  <ExpansionPanelActions>
                    <Button size="small">
                      Decline
                    </Button>
                    <Button size="small" color="primary">
                      Accept
                    </Button>
                  </ExpansionPanelActions>
                </ExpansionPanel>
              )
            })}

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

