import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import TextField from '@material-ui/core/TextField'
import IconButton from '@material-ui/core/IconButton'
import AddIcon from '@material-ui/icons/Add'

// import Typography from '@material-ui/core/Typography'

const styles = theme => ({
  root: {
    display: 'flex',
    position: 'relative',
    alignItems: 'center'
  },
  chatinput: {
    marginRight: theme.spacing.unit
  }
})

class ChatBox extends React.Component {
  state = {
    multiline: ''
  }

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value,
    })
  }

  render() {
    const { classes } = this.props
    return (
      <div className={classes.root}>
        <TextField
          className={classes.chatinput}
          id="outlined-multiline-flexible"
          rowsMax="4"
          value={this.state.multiline}
          onChange={this.handleChange('multiline')}
          margin="normal"
          variant="outlined"
          placeholder="Message"
          multiline
          fullWidth
        />
        <IconButton
          color="inherit"
          aria-label="Add"
        >
          <AddIcon />
        </IconButton>
      </div>
    )
  }
}

ChatBox.propTypes = {
  classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(ChatBox)

