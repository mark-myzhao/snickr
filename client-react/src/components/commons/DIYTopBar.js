import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import { withStyles } from '@material-ui/core/styles'
import { withRouter } from 'react-router-dom'
import { fade } from '@material-ui/core/styles/colorManipulator'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem'
import Button from '@material-ui/core/Button'
import Badge from '@material-ui/core/Badge'
import IconButton from '@material-ui/core/IconButton'
import InputBase from '@material-ui/core/InputBase'
import MenuIcon from '@material-ui/icons/Menu'
import SearchIcon from '@material-ui/icons/Search'
import NotificationsIcon from '@material-ui/icons/Notifications'
import HomeIcon from '@material-ui/icons/Home'

import UserProfileDialog from '../subcomponents/UserProfileDialog'
import NotificationDialog from '../subcomponents/NotificationDialog'

import axios from 'axios'
import $store from '../../store'

// TODO: User Profile Dialog
// TODO: Change Password Dialog
// TODO: Implement Search

const styles = theme => ({
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: 240,
    width: `calc(100% - ${240}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing.unit * 2,
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing.unit * 3,
      width: 'auto',
    },
  },
  searchIcon: {
    width: theme.spacing.unit * 6,
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputRoot: {
    color: 'inherit',
    width: '100%',
  },
  inputInput: {
    paddingTop: theme.spacing.unit,
    paddingRight: theme.spacing.unit,
    paddingBottom: theme.spacing.unit,
    paddingLeft: theme.spacing.unit * 6,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: 200,
    },
  },
  button: {
    color: '#FFFFFF',
    marginLeft: '5px'
  },
  menuButton: {
    marginLeft: theme.spacing.unit * 1,
    marginRight: theme.spacing.unit * 4,
  },
  menuButtonHidden: {
    display: 'none',
  },
  title: {
    flexGrow: 1,
    marginLeft: theme.spacing.unit * 1,
  },
  toolbar: {
    paddingRight: theme.spacing.unit * 3,
  },
})

class DIYTopBar extends React.Component {
  state = {
    userProfileAnchor: null,
    userDialogOpen: false,
    userDialogTitle: '',
    notificationDialogOpen: false,
    cinvitation: [],  // { semail, remail, citime, cname, wid, wname }
    winvitation: []   // { semail, remail, wid, witime, wname }
  }

  componentDidMount = async () => {
    await this.updateInvitations()
  }

  updateInvitations = async () => {
    const you = $store.getUser()
    const token = $store.getToken()
    try {
      let { data } = await axios.get(`/cinvitation/${you.uemail}`, {
        headers: {'Authorization': `bearer ${token}`}
      })
      this.setState({
        cinvitation: data.member
      })
    } catch(error) {
      if (error && error.response.status === 404) {
        this.setState({
          cinvitation: []
        })
      } else {
        console.error(error)
      }
    }
    try {
      let { data } = await axios.get(`/winvitation/${you.uemail}`, {
        headers: {'Authorization': `bearer ${token}`}
      })
      this.setState({
        winvitation: data.member
      })
    } catch(error) {
      this.setState({
        winvitation: []
      })
    }
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

  handleLogoutClick = () => {
    this.setState({ userProfileAnchor: null })
    $store.clear()
    this.props.history.push('/signin')
  }

  getNotificationNum = () => {
    return this.state.cinvitation.length + this.state.winvitation.length
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
          {!handleDrawerOpen && <div className={classes.menuButton}/>}
          <Typography
            className={classes.title}
            component="h1"
            variant="h6"
            color="inherit"
            noWrap
          >
            {title}
          </Typography>
          <div className={classes.search}>
            <div className={classes.searchIcon}>
              <SearchIcon />
            </div>
            <InputBase
              placeholder="Search…"
              classes={{
                root: classes.inputRoot,
                input: classes.inputInput,
              }}
            />
          </div>
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
              badgeContent={this.getNotificationNum()}
              invisible={this.getNotificationNum() === 0}
            >
              <NotificationsIcon />
            </Badge>
          </IconButton>
          <Button
            className={classes.button}
            onClick={this.handleUserProfileClick}
          >
            {$store.getUserName()}
          </Button>
          <Menu
            anchorEl={this.state.userProfileAnchor}
            open={Boolean(this.state.userProfileAnchor)}
            onClose={this.handleUserProfileClose}
          >
            <MenuItem onClick={this.handleUserDialogOpen('User Profile')}>User Profile</MenuItem>
            <MenuItem onClick={this.handleUserDialogOpen('Change Password')}>Change Password</MenuItem>
            <MenuItem onClick={this.handleLogoutClick}>Logout</MenuItem>
          </Menu>
        </Toolbar>
        <UserProfileDialog
          title={this.state.userDialogTitle}
          open={this.state.userDialogOpen}
          handleClose={this.handleUserDialogClose}
        />
        <NotificationDialog
          open={this.state.notificationDialogOpen}
          update={this.updateInvitations}
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
