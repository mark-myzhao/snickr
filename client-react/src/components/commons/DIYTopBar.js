import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import { withStyles } from '@material-ui/core/styles'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import IconButton from '@material-ui/core/IconButton'
import Button from '@material-ui/core/Button'
import MenuIcon from '@material-ui/icons/Menu'
import SettingsIcon from '@material-ui/icons/Settings'

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
    open: true
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
          <Button className={classes.button}>
            {store.getUserName()}
          </Button>
          <Button className={classes.button}>
            Logout
          </Button>
        </Toolbar>
      </AppBar>
    )
  }
}

DIYTopBar.propTypes = {
  classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(DIYTopBar)
