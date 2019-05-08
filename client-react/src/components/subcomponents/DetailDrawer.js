import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import Avatar from '@material-ui/core/Avatar'
import Collapse from '@material-ui/core/Collapse'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import ListItemAvatar from '@material-ui/core/ListItemAvatar'
import Divider from '@material-ui/core/Divider'
import InfoIcon from '@material-ui/icons/Info'
import PersonIcon from '@material-ui/icons/Person'
import ExpandLessIcon from '@material-ui/icons/ExpandLess'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import AddIcon from '@material-ui/icons/Add'
import AlternateEmailIcon from '@material-ui/icons/AlternateEmail'

// import Typography from '@material-ui/core/Typography'

const styles = theme => ({
  nested: {
    paddingLeft: theme.spacing.unit * 4
  },
  nestedIcon: {
    paddingLeft: 6,
  },
  nestedText: {
    marginLeft: -6,
  },
  rightDrawerContainer: {
    width: 300,
    overflow: 'auto',
    backgroundColor: theme.palette.background.paper,
    borderLeftWidth: '1px',
    borderLeftStyle: 'solid',
    borderLeftColor: 'rgba(0, 0, 0, 0.12)',
    whiteSpace: 'nowrap',
    transitionProperty: 'width',
    transitionDuration: '225ms',
    transitionTimingFunction: 'cubic-bezier(0.4, 0, 0.6, 1)',
    transitionDelay: '0ms',
  },
  rightDrawerContainerEmpty: {
    width: 0,
    overflowX: 'hidden',
    backgroundColor: theme.palette.background.paper,
    borderLeftWidth: '1px',
    borderLeftStyle: 'solid',
    borderLeftColor: 'rgba(0, 0, 0, 0.12)',
    whiteSpace: 'nowrap',
    transitionProperty: 'width',
    transitionDuration: '225ms',
    transitionTimingFunction: 'cubic-bezier(0.4, 0, 0.6, 1)',
    transitionDelay: '0ms',
  }
})

class DetailDrawer extends React.Component {
  state = {
    channelDetailOpen: false,
    memberOpen: false
  }

  handleChannelDetailClick = () => {
    this.setState(state => ({ channelDetailOpen: !state.channelDetailOpen }));
  }

  handleMemberClick = () => {
    this.setState(state => ({ memberOpen: !state.memberOpen }));
  }

  render() {
    const { classes, open, currentChannel } = this.props

    return (
      <React.Fragment>
        <div className={open ? classes.rightDrawerContainer : classes.rightDrawerContainerEmpty}>
          <List component="nav">
            <ListItem>
              <ListItemText primary={`About #${currentChannel}`} />
            </ListItem>
          </List>
          <Divider />
          <List component="nav">
            <ListItem
              button
              onClick={this.handleChannelDetailClick}
            >
              <ListItemIcon>
                <InfoIcon />
              </ListItemIcon>
              <ListItemText primary="Channel Details" />
              {this.state.channelDetailOpen ? <ExpandLessIcon /> : <ExpandMoreIcon />}
            </ListItem>
            <Collapse
              in={this.state.channelDetailOpen}
              timeout="auto"
              unmountOnExit
            >
              <List
                component="div"
                disablePadding
                dense
              >
                <ListItem className={classes.nested}>
                  <ListItemIcon className={classes.nestedIcon}>
                    <AlternateEmailIcon />
                  </ListItemIcon>
                  <ListItemText
                    className={classes.nestedIcon}
                    inset
                    primary="Created by Mingyu"
                    secondary="on 2018-12-25"
                  />
                </ListItem>
              </List>
            </Collapse>
            <ListItem
              button
              onClick={this.handleMemberClick}
            >
              <ListItemIcon>
                <PersonIcon />
              </ListItemIcon>
              <ListItemText primary="Members" />
              {this.state.memberOpen ? <ExpandLessIcon /> : <ExpandMoreIcon />}
            </ListItem>
            <Collapse
              in={this.state.memberOpen}
              timeout="auto"
              unmountOnExit
            >
              <List
                component="div"
                disablePadding
                dense
              >
                <ListItem button className={classes.nested}>
                  <ListItemAvatar>
                    <Avatar>
                      M
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText
                    inset
                    primary="Mingyu"
                  />
                </ListItem>
                <ListItem button className={classes.nested}>
                  <ListItemIcon className={classes.nestedIcon}>
                    <AddIcon />
                  </ListItemIcon>
                  <ListItemText
                    className={classes.nestedText}
                    inset
                    primary="Add New Member"
                  />
                </ListItem>
              </List>
            </Collapse>
          </List>
        </div>
      </React.Fragment>
    )
  }
}

DetailDrawer.propTypes = {
  classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(DetailDrawer)

