import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import { withStyles } from '@material-ui/core/styles'
import { withRouter } from 'react-router-dom'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem'
import Button from '@material-ui/core/Button'
import Badge from '@material-ui/core/Badge'
import IconButton from '@material-ui/core/IconButton'
import MenuIcon from '@material-ui/icons/Menu'
import NotificationsIcon from '@material-ui/icons/Notifications'
import HomeIcon from '@material-ui/icons/Home'

import UserProfileDialog from '../subcomponents/UserProfileDialog'
import NotificationDialog from '../subcomponents/NotificationDialog'

import store from '../../store'

const drawerWidth = 240

const styles = theme => ({
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  button: {
    color: '#FFFFFF',
    marginLeft: '5px'
  },
  menuButton: {
    marginLeft: 8,
  },
  menuButtonHidden: {
    display: 'none',
  },
  title: {
    flexGrow: 1,
    marginLeft: theme.spacing.unit * 3,
  },
  toolbar: {
    paddingRight: 24,
  },
})

class DIYTopBar extends React.Component {
  state = {
    userProfileAnchor: null,
    userDialogOpen: false,
    userDialogTitle: '',
    notification: 10,
    notificationDialogOpen: false,
    cinvitation: [
      {
        semail: 'mingyusysu@gmail.com',
        wid: '1',
        cname: 'channel1',
        citime: '2018-12-25'
      }
    ],
    winvitation: [
      {
        semail: 'mingyusysu@gmail.com',
        wid: '1',
        citime: '2018-12-24'
      }
    ]
  }

  handleHomeClick = () => {
    this.props.history.push('/')
  }

  handleUserProfileClick = event => {
    this.setState({ userProfileAnchor: event.currentTarget })
  }

  handleUserProfileClose = () => {
    this.setState({ userProfileAnchor: null })
  }

  handleUserDialogOpen = title => () => {
    this.setState({
      userDialogOpen: true,
      userProfileAnchor: null,
      userDialogTitle: title
    })
  }

  handleUserDialogClose = () => {
    this.setState({ userDialogOpen: false })
  }

  handleNotificationDialogOpen = () => {
    this.setState({ notificationDialogOpen: true })
  }

  handleNotificationDialogClose = () => {
    this.setState({ notificationDialogOpen: false })
  }

  render() {
    const { classes, title, open, handleDrawerOpen } = this.props
    return (
      <AppBar
        position="absolute"
        color="primary"
        className={classNames(classes.appBar, open && classes.appBarShift)}
      >
        <Toolbar
          disableGutters={!open}
          className={classes.toolbar}
        >
          {handleDrawerOpen && <IconButton
            className={classNames(
              classes.menuButton,
              open && classes.menuButtonHidden,
            )}
            color="inherit"
            aria-label="Open drawer"
            onClick={() => {handleDrawerOpen()}}
          >
            <MenuIcon />
          </IconButton>}
          <Typography
            className={classes.title}
            component="h1"
            variant="h6"
            color="inherit"
            noWrap
          >
            {title}
          </Typography>
          <IconButton
            color="inherit"
            aria-label="Home"
            onClick={this.handleHomeClick}
          >
            <HomeIcon />
          </IconButton>
          <IconButton
            color="inherit"
            aria-label="Notifications"
            onClick={this.handleNotificationDialogOpen}
          >
            <Badge
              color="error"
              badgeContent={this.state.notification}
              invisible={!this.state.notification}
            >
              <NotificationsIcon />
            </Badge>
          </IconButton>
          <Button
            className={classes.button}
            onClick={this.handleUserProfileClick}
          >
            {store.getUserName()}
          </Button>
          <Menu
            anchorEl={this.state.userProfileAnchor}
            open={Boolean(this.state.userProfileAnchor)}
            onClose={this.handleUserProfileClose}
          >
            <MenuItem onClick={this.handleUserDialogOpen('User Profile')}>User Profile</MenuItem>
            <MenuItem onClick={this.handleUserDialogOpen('Change Password')}>Change Password</MenuItem>
            <MenuItem onClick={this.handleUserProfileClose}>Logout</MenuItem>
          </Menu>
        </Toolbar>
        <UserProfileDialog
          title={this.state.userDialogTitle}
          open={this.state.userDialogOpen}
          handleClose={this.handleUserDialogClose}
        />
        <NotificationDialog
          open={this.state.notificationDialogOpen}
          cinvitation={this.state.cinvitation}
          winvitation ={this.state.winvitation}
          handleClose={this.handleNotificationDialogClose}
        />
      </AppBar>
    )
  }
}

DIYTopBar.propTypes = {
  classes: PropTypes.object.isRequired,
}

export default withRouter(withStyles(styles)(DIYTopBar))
