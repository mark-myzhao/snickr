import React,  { Component } from 'react'
import withStyles from '@material-ui/core/styles/withStyles'
import { withRouter } from 'react-router-dom'
import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography'
import Grid from '@material-ui/core/Grid'
import Button from '@material-ui/core/Button'
import Skeleton from 'react-loading-skeleton'


const styles = theme => ({
  paper: {
    padding: theme.spacing.unit * 3,
    textAlign: 'left',
    color: theme.palette.text.secondary
  },
  box: {
    marginBottom: 40,
    height: 65
  },
  actionButtom: {
    textTransform: 'uppercase',
    margin: theme.spacing.unit,
    width: 152
  },
  buttonContainer: {
    display: 'flex',
    justifyContent: 'flex-end'
  }
})

class WorkspaceItem extends Component {
  handleEnterClick = wid => () => {
    this.props.history.push(`/workspace/${wid}`)
  }

  render () {
    const { classes, currentWorkspace } = this.props
    return (
      <Grid item xs={12} md={4}>
        <Paper className={classes.paper}>
            <div className={classes.box}>
            <Typography
              color='secondary'
              gutterBottom
            >
              {
                currentWorkspace ? currentWorkspace.wname : <Skeleton />
              }
            </Typography>
            <Typography
              variant="body2"
              gutterBottom
            >
              {currentWorkspace ? currentWorkspace.wdesc : <Skeleton count={3} />}
            </Typography>
            </div>
            {
              currentWorkspace &&
              <div className={classes.buttonContainer}>
                <Button
                  color='primary'
                  variant="contained"
                  className={classes.actionButtom}
                  onClick={this.handleEnterClick(currentWorkspace.wid)}
                >
                    Enter
                </Button>
              </div>
            } {
              !currentWorkspace &&
              <div className={classes.buttonContainer}>
                <Skeleton
                  circle={true}
                  height={50}
                  width={50}
                />
              </div>
            }
        </Paper>
      </Grid>
    )
  }
}

export default withRouter(withStyles(styles)(WorkspaceItem))
