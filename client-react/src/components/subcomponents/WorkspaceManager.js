import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import Avatar from '@material-ui/core/Avatar'
import ExpansionPanel from '@material-ui/core/ExpansionPanel'
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary'
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails'
import ExpansionPanelActions from '@material-ui/core/ExpansionPanelActions'
import Typography from '@material-ui/core/Typography'
import Divider from '@material-ui/core/Divider'
import Button from '@material-ui/core/Button'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'

import InvitationDialog from '../subcomponents/InvitationDialog'


const styles = theme => ({
  workspaceContainer: {
    flexGrow: 1,
    margin: theme.spacing.unit * 3,
  },
  expansionSummary: {
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'row',
  },
  title: {
    marginLeft: theme.spacing.unit,
    marginBottom: theme.spacing.unit * 2,
  },
  heading: {
    marginLeft: theme.spacing.unit * 2
  },
  details: {
    paddingLeft: theme.spacing.unit * 3,
    paddingRight: theme.spacing.unit * 3,
    alignItems: 'center',
  },
  addPeople: {
    marginTop: theme.spacing.unit,
  }
})

class WMemberManager extends React.Component {
  state = {
    invitationOpen: false
  }

  handleInvitationDialogOpen = () => {
    this.setState({
      invitationOpen: true
    })
  }

  handleInvitationDialogClose = () => {
    this.setState({
      invitationOpen: false
    })
  }

  render() {
    const { classes, wmember, currentWorkspace } = this.props
    return (
      <div className={classes.workspaceContainer}>
        <Typography
          variant="h6"
          className={classes.title}
        >
          Workspace Members
        </Typography>
        {wmember && wmember.map(item => {
          return (
            <ExpansionPanel
              key={item.uemail}
            >
              <ExpansionPanelSummary
                expandIcon={<ExpandMoreIcon />}
              >
                <div className={classes.expansionSummary}>
                  <Avatar>
                    {item.nickname[0]}
                  </Avatar>
                  <Typography
                    variant="h6"
                    color="primary"
                    className={classes.heading}
                  >
                    {item.nickname}
                  </Typography>
                </div>
              </ExpansionPanelSummary>
              <ExpansionPanelDetails className={classes.details}>
                <Typography variant="body2">
                  Email: {item.uemail}
                </Typography>
                <Typography variant="body2">
                  Full Name: {item.uname}
                </Typography>
              </ExpansionPanelDetails>
              <Divider />
              <ExpansionPanelActions>
                <Button size="small">
                  Remove
                </Button>
              </ExpansionPanelActions>
            </ExpansionPanel>
          )
        })}
        {!wmember &&
          <Typography
            variant="subtitle2"
          >
            You have no member in this work space yet.
          </Typography>
        }
        <Button
          className={classes.addPeople}
          color="primary"
          onClick={this.handleInvitationDialogOpen}
        >
          Add More People...
        </Button>
        <InvitationDialog
          open={this.state.invitationOpen}
          currentWorkspace={currentWorkspace}
          handleClose={this.handleInvitationDialogClose}
        />
      </div>
    )
  }
}

WMemberManager.propTypes = {
  classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(WMemberManager)
