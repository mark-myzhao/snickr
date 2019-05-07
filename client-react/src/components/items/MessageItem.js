import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography'

const styles = theme => ({
  root: {
    ...theme.mixins.gutters(),
    paddingTop: theme.spacing.unit * 2,
    paddingBottom: theme.spacing.unit * 2,
    marginTop: theme.spacing.unit * 2,
    marginBottom: theme.spacing.unit * 2
  },
})

class MessageItem extends React.Component {
  render() {
    const { classes, message } = this.props
    return (
      <div>
        <Paper className={classes.root} elevation={1}>
          <Typography variant="h5" component="h3">
            {message.uname}
          </Typography>
          <Typography component="p">
            {message.mcontent}
          </Typography>
        </Paper>
      </div>
    )
  }
}

MessageItem.propTypes = {
  classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(MessageItem)
