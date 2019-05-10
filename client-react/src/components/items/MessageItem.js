import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import Avatar from '@material-ui/core/Avatar'
import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography'

import $store from '../../store'

const styles = theme => ({
  root: {
    padding: theme.spacing.unit * 2,
    marginTop: theme.spacing.unit * 2,
    marginBottom: theme.spacing.unit * 2,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  avatar: {

  },
  textContainer: {
    display: 'flex',
    flexDirection: 'column',
    marginLeft: theme.spacing.unit,
    wordBreak: 'break-word',
  },
  username: {
    color: '#1d1c1d',
    fontWeight: '900',
    lineHeight: '1',
  },
  time: {
    marginLeft: theme.spacing.unit,
    lineHeight: '1',
    color: '#616061',
    fontSize: 12,
  },
  message: {
    color: '#1d1c1d',
    marginTop: theme.spacing.unit,
    wordBreak: 'break-word',
    lineHeight: '1.4',
    'textAlign': 'left',
  }
})

class MessageItem extends React.Component {
  render() {
    const { classes, message } = this.props
    const you = $store.getUser()
    const displayName = message.uemail === you.uemail ? `${message.uname} (You)` : message.uname
    const mt = new Date(message.mtime)
    let dd = String(mt.getDate()).padStart(2, '0')
    let mm = String(mt.getMonth() + 1).padStart(2, '0')
    let yyyy = mt.getFullYear()
    let hour = String(mt.getHours()).padStart(2, '0')
    let minute = String(mt.getMinutes()).padStart(2, '0')
    return (
      <Paper className={classes.root} elevation={1}>
        <Avatar className={classes.avatar}>
          {message.uname[0]}
        </Avatar>
        <div className={classes.textContainer}>
          <div>
            <span className={classes.username}>{displayName}</span>
            <span className={classes.time}>{`${hour}:${minute} ${mm}/${dd}/${yyyy}`}</span>
          </div>
          <Typography
            className={classes.message}
            variant="body1"
          >
            {message.mcontent}
          </Typography>
        </div>
      </Paper>
    )
  }
}

MessageItem.propTypes = {
  classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(MessageItem)
