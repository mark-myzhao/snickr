import React,  { Component } from 'react'
import withStyles from '@material-ui/core/styles/withStyles'
import { withRouter } from 'react-router-dom'
import CssBaseline from '@material-ui/core/CssBaseline'
import Grid from '@material-ui/core/Grid'
import DIYTopBar from '../commons/DIYTopBar'
import WorkspaceItem from '../items/WorkspaceItem'

import axios from 'axios'
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
  state = {
    workspace: []
  }

  async componentDidMount() {
    const currentUser = store.getUser()
    const token = store.getToken()
    let { data } = await axios.get(`/workspace/${currentUser.uemail}`, {
      headers: {'Authorization': `bearer ${token}`}
    })
    this.setState({
      workspace: data.workspace
    })
    store.buffer.workspace = data.workspace
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
              {this.state.workspace.map(item => {
                return (
                  <WorkspaceItem
                    key={item.wid}
                    currentWorkspace={item}
                    index={item.wid}
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
