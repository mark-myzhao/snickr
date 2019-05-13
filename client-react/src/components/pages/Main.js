import React,  { Component } from 'react'
import axios from 'axios'
import { setIntervalAsync } from 'set-interval-async/dynamic'
import { clearIntervalAsync } from 'set-interval-async'
import withStyles from '@material-ui/core/styles/withStyles'
import { withRouter } from 'react-router-dom'
import CssBaseline from '@material-ui/core/CssBaseline'
import Grid from '@material-ui/core/Grid'
import Fab from '@material-ui/core/Fab'
import AddIcon from '@material-ui/icons/Add'

import backgroundShape from '../../images/shape.svg'
import WorkspaceItem from '../items/WorkspaceItem'
import DIYTopBar from '../subcomponents/DIYTopBar'
import AddWorkspaceDialog from '../dialogs/AddWorkspaceDialog'
import $store from '../../store'


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
  },
  fab: {
    position: 'absolute',
    right: theme.spacing.unit * 3,
    bottom: theme.spacing.unit * 3,
    margin: theme.spacing.unit,
  },
  title: {
    color: '#1d1c1d',
    fontSize: '34px',
    lineHeight: '41px',
    fontWeight: 700,
    marginTop: '40vh',
    marginBottom: theme.spacing.unit * 4,
    justifyContent: 'center',
    display: 'flex',
    flexGrow: 1,
    flexDirection: 'row',
    userSelect: 'none',
  },
})

class Main extends Component {
  state = {
    workspace: [],
    addWorkspaceDialogOpen: false,
    isLoading: true,
    timer: null
  }

  componentDidMount = async () => {
    await this.updateWorkspace()
    const timer = setIntervalAsync(this.updateWorkspace, 2000)
    this.setState({
      isLoading: false,
      timer
    })
  }

  componentWillUnmount = () => {
    const { timer } = this.state
    clearIntervalAsync(timer)
    this.setState({
      timer: null
    })
  }

  updateWorkspace = async () => {
    const currentUser = $store.getUser()
    const token = $store.getToken()
    try {
      let { data } = await axios.get(`/workspace/${currentUser.uemail}`, {
        headers: {'Authorization': `bearer ${token}`}
      })
      this.setState({
        workspace: data.workspace
      })
      $store.buffer.workspace = data.workspace
    } catch(error) {
      this.setState({
        workspace: []
      })
      $store.buffer.workspace = []
    }
  }

  handleAddWorkspaceOpen = () => {
    this.setState({
      addWorkspaceDialogOpen: true
    })
  }

  handleAddWorkspaceClose = () => {
    this.setState({
      addWorkspaceDialogOpen: false
    })
  }

  render() {
    const { classes } = this.props
    const { isLoading } = this.state
    return (
      <React.Fragment>
        <CssBaseline />
        <DIYTopBar
          open={false}
          title={'Snickr'}
        />
        <div className={classes.root}>
          {
            !isLoading && this.state.workspace.length === 0 &&
            <div className={classes.title}>
              no workspace here, create a new one?
            </div>
          }
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
              {
                isLoading &&
                <>
                  <WorkspaceItem />
                  <WorkspaceItem />
                  <WorkspaceItem />
                  <WorkspaceItem />
                  <WorkspaceItem />
                  <WorkspaceItem />
                </>
              } {
                !isLoading && this.state.workspace.map(item => {
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
          <Fab
            color="primary"
            aria-label="Add"
            className={classes.fab}
            onClick={this.handleAddWorkspaceOpen}
          >
            <AddIcon />
          </Fab>
          <AddWorkspaceDialog
            open={this.state.addWorkspaceDialogOpen}
            update={this.updateWorkspace}
            handleClose={this.handleAddWorkspaceClose}
          />
        </div>
      </React.Fragment>
    )
  }
}

export default withRouter(withStyles(styles)(Main))
