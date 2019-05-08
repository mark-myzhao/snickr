import React,  { Component } from 'react'
import withStyles from '@material-ui/core/styles/withStyles'
import { withRouter } from 'react-router-dom'
import CssBaseline from '@material-ui/core/CssBaseline'
import Grid from '@material-ui/core/Grid'
import DIYTopBar from '../commons/DIYTopBar'
import WorkspaceItem from '../items/WorkspaceItem'

import store from '../../store'

import backgroundShape from '../../images/shape.svg'

const styles = theme => ({
  root: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    overflow: 'auto',
    flexGrow: 1,
    backgroundColor: theme.palette.grey['100'],
    background: `url(${backgroundShape}) no-repeat`,
    backgroundSize: 'cover',
    backgroundPosition: '0 400px',
    padding: theme.spacing.unit * 3,
    paddingTop: theme.spacing.unit * 6,
  },
  grid: {
    width: 1200,
    marginTop: 40,
    [theme.breakpoints.down('sm')]: {
      width: 'calc(100% - 20px)'
    }
  }
})

class Main extends Component {
  componentDidMount() {
    console.log(store.isLogin())
  }

  state = {
    workspaces: ['w1', 'w2', 'w3', 'w4', 'w5']
  }

  render() {
    const { classes } = this.props
    return (
      <React.Fragment>
        <CssBaseline />
        <DIYTopBar
          open={false}
          title={'Snickr'}
        />
        <div className={classes.root}>
          <Grid
            container
            justify="center"
          >
            <Grid
              className={classes.grid}
              spacing={24}
              alignItems="center"
              justify="flex-start"
              container
            >
              {this.state.workspaces.map((value, index) => {
                return (
                  <WorkspaceItem
                    key={value}
                    value={value}
                    index={index}
                  />
                )
              })}
            </Grid>
          </Grid>
        </div>
      </React.Fragment>
    )
  }
}

export default withRouter(withStyles(styles)(Main))
