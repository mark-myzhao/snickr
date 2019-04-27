import React,  { Component } from 'react'
import withStyles from '@material-ui/core/styles/withStyles'
import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography'
import Grid from '@material-ui/core/Grid'
import Button from '@material-ui/core/Button'
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
  }
})

class WorkspaceItem extends Component {
  render () {
    const { classes } = this.props
    const value = this.props.value
    return (
      <Grid item xs={12} md={4} key={value}>
        <Paper className={classes.paper}>
            <div className={classes.box}>
            <Typography style={{textTransform: 'uppercase'}} color='secondary' gutterBottom>
                {value}
            </Typography>
            <Typography variant="body2" gutterBottom>
                A first title style <br/> with two lines
            </Typography>
            </div>
            <div style={{display: 'flex', justifyContent: 'flex-end'}}>
            <Button color='primary' variant="contained" className={classes.actionButtom}>
                Enter
            </Button>
            </div>
        </Paper>
      </Grid>
    )
  }
}

export default withStyles(styles)(WorkspaceItem)
