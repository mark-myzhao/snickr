import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import { withStyles } from '@material-ui/core/styles'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem'
import Button from '@material-ui/core/Button'
import IconButton from '@material-ui/core/IconButton'
import MenuIcon from '@material-ui/icons/Menu'
import SettingsIcon from '@material-ui/icons/Settings'

import UserProfileDialog from '../subcomponents/UserProfileDialog'

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
    marginLeft: 12,
    marginRight: 36,
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
    dialogOpen: false,
    dialogTitle: ''
  }

  handleUserProfileClick = event => {
    this.setState({ userProfileAnchor: event.currentTarget })
  }

  handleUserProfileClose = () => {
    this.setState({ userProfileAnchor: null })
  }

  handleDialogOpen = title => () => {
    this.setState({
      dialogOpen: true,
      userProfileAnchor: null,
      dialogTitle: title
    })
  }

  handleDialogClose = () => {
    this.setState({ dialogOpen: false })
  }

  render() {
    const { classes, title, open, handleDrawerOpen } = this.props
    return (
      <AppBar
        position="absolute"
        color="primary"
        className={classNames(classes.appBar, open && classes.appBarShift)}
      >
        <Toolbar disableGutters={!open} className={classes.toolbar}>
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
            aria-label="Settings"
          >
            <SettingsIcon />
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
            <MenuItem onClick={this.handleDialogOpen('User Profile')}>User Profile</MenuItem>
            <MenuItem onClick={this.handleDialogOpen('Change Password')}>Change Password</MenuItem>
            <MenuItem onClick={this.handleUserProfileClose}>Logout</MenuItem>
          </Menu>
        </Toolbar>
        <UserProfileDialog
          title={this.state.dialogTitle}
          open={this.state.dialogOpen}
          handleClose={this.handleDialogClose}
        />
      </AppBar>
    )
  }
}

DIYTopBar.propTypes = {
  classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(DIYTopBar)
