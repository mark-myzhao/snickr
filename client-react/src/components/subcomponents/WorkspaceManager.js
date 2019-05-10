import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import Avatar from '@material-ui/core/Avatar'
import ExpansionPanel from '@material-ui/core/ExpansionPanel'
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary'
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails'
import ExpansionPanelActions from '@material-ui/core/ExpansionPanelActions'
import Typography from '@material-ui/core/Typography'
import Menu from '@material-ui/core/Menu'
import MenuItem from '@material-ui/core/MenuItem'
import Divider from '@material-ui/core/Divider'
import Button from '@material-ui/core/Button'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'

import InvitationDialog from '../subcomponents/InvitationDialog'
import store from '../../store';


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
    marginBottom: theme.spacing.unit,
    flexDirection: 'row',
    display: 'flex',
    alignItems: 'baseline',
  },
  workDescription: {
    marginLeft: theme.spacing.unit,
    marginBottom: theme.spacing.unit * 2,
  },
  heading: {
    marginLeft: theme.spacing.unit * 2
  },
  userDetail: {
    marginRight: theme.spacing.unit * 3
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
    invitationOpen: false,
    anchorEl: null,
    isAdmin: false,
  }

  componentDidMount = () => {
    const { wmember } = this.props
    for (let item of wmember) {
      if (item.uemail === store.getUser.uemail) {
        this.setState({
          isAdmin: true
        })
      }
    }
  }

  handleMenuClick = event => {
    this.setState({
      anchorEl: event.currentTarget
    })
  }

  handleMenuClose = () => {
    this.setState({
      anchorEl: null
    })
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
        <div className={classes.title}>
          <Typography
            variant="h6"
          >
            Workspace Description
          </Typography>
          <Button color="primary">
            Edit
          </Button>
        </div>
        <Typography
          variant="body1"
          className={classes.workDescription}
        >
          {currentWorkspace.wdesc}
        </Typography>
        <Typography
          variant="h6"
          className={classes.title}
        >
          Workspace Members
        </Typography>
        { wmember && wmember.map(item => {
          const you = store.getUserName() === item.nickname ? ' (You)' : ''
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
                    {`${item.nickname}${you}`}
                  </Typography>
                </div>
              </ExpansionPanelSummary>
              <ExpansionPanelDetails className={classes.details}>
                <div
                  className={classes.userDetail}
                >
                  <Typography variant="subtitle2">
                    Email:
                  </Typography>
                  <Typography variant="body2">
                    {item.uemail}
                  </Typography>
                </div>
                <div
                  className={classes.userDetail}
                >
                  <Typography variant="subtitle2">
                    Full Name:
                  </Typography>
                  <Typography variant="body2">
                    {item.uname}
                  </Typography>
                </div>
                <div
                  className={classes.userDetail}
                >
                  <Typography variant="subtitle2">
                    User Type:
                  </Typography>
                  <Typography variant="body2">
                    {item.wmtype}
                  </Typography>
                </div>
              </ExpansionPanelDetails>
              {
                this.state.isAdmin &&
                <React.Fragment>
                  <Divider />
                  <ExpansionPanelActions>
                    <Button
                      size="small"
                      onClick={this.handleMenuClick}
                    >
                      Change Type
                    </Button>
                    <Button size="small">
                      Remove
                    </Button>
                  </ExpansionPanelActions>
                </React.Fragment>
              }
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
        <Menu
          anchorEl={this.state.anchorEl}
          open={Boolean(this.state.anchorEl)}
          onClose={this.handleMenuClose}
        >
          <MenuItem onClick={this.handleMenuClose}>Admin</MenuItem>
          <MenuItem onClick={this.handleMenuClose}>User</MenuItem>
        </Menu>
      </div>
    )
  }
}

WMemberManager.propTypes = {
  classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(WMemberManager)
