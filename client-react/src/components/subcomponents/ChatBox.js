import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import TextField from '@material-ui/core/TextField'
import IconButton from '@material-ui/core/IconButton'
import KeyboardReturnIcon from '@material-ui/icons/KeyboardReturn'
import InfoIcon from '@material-ui/icons/Info'

import axios from 'axios'
import $store from '../../store'

const styles = theme => ({
  root: {
    display: 'flex',
    position: 'relative',
    alignItems: 'center',
  },
  chatinput: {
    marginTop: 0,
    marginBottom: 0,
    marginRight: theme.spacing.unit
  }
})

class ChatBox extends React.Component {
  state = {
    value: ''
  }

  handleMessageAdd = async () => {
    const { wid, cname, updateMessage } = this.props
    const mcontent = this.state.value
    const token = $store.getToken()
    const { uemail } = $store.getUser()
    let sendObj = {
      wid: Number(wid),
      cname,
      uemail,
      mcontent
    }
    console.log(sendObj)
    try {
      await axios.post('/message/', sendObj, {
        headers: {'Authorization': `bearer ${token}`}
      })
      await updateMessage(wid, cname)
      this.setState({
        value: ''
      })
    } catch(error) {
      console.error(error)
    }
  }

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value,
    })
  }

  render() {
    const { classes, handleDetailClick } = this.props
    return (
      <div className={classes.root}>
        <TextField
          className={classes.chatinput}
          rowsMax="4"
          value={this.state.value}
          onChange={this.handleChange('value')}
          margin="normal"
          variant="outlined"
          placeholder="Message"
          multiline
          fullWidth
        />
        <IconButton
          color="inherit"
          aria-label="Add"
          onClick={this.handleMessageAdd}
        >
          <KeyboardReturnIcon />
        </IconButton>
        <IconButton
          color="inherit"
          aria-label="Info"
          onClick={handleDetailClick}
        >
          <InfoIcon />
        </IconButton>
      </div>
    )
  }
}

ChatBox.propTypes = {
  classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(ChatBox)

