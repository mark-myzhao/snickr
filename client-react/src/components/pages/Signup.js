import React, { Component } from 'react'
import axios from 'axios'

import Avatar from '@material-ui/core/Avatar'
import Button from '@material-ui/core/Button'
import CssBaseline from '@material-ui/core/CssBaseline'
import FormControl from '@material-ui/core/FormControl'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import FormHelperText from '@material-ui/core/FormHelperText'
import Checkbox from '@material-ui/core/Checkbox'
import Input from '@material-ui/core/Input'
import InputLabel from '@material-ui/core/InputLabel'
import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography'
import withStyles from '@material-ui/core/styles/withStyles'
import AccountCircleIcon from '@material-ui/icons/AccountCircle'
import { withRouter } from 'react-router-dom'

import $store from '../../store'

// TODO: register

const styles = theme => ({
  main: {
    width: 'auto',
    display: 'block',
    marginLeft: theme.spacing.unit * 3,
    marginRight: theme.spacing.unit * 3,
    [theme.breakpoints.up(400 + theme.spacing.unit * 3 * 2)]: {
      width: 400,
      marginLeft: 'auto',
      marginRight: 'auto',
    },
  },
  paper: {
    marginTop: theme.spacing.unit * 8,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 3}px ${theme.spacing.unit * 3}px`,
  },
  avatar: {
    margin: theme.spacing.unit,
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%',
    marginTop: theme.spacing.unit,
  },
  formItem: {
    marginTop: theme.spacing.unit,
  },
  submit: {
    marginTop: theme.spacing.unit * 2,
    backgroundColor: theme.palette.primary['A100']
  }
})

class Signup extends Component {
  state = {
    agree: true,
    uemail: '',
    uname: '',
    nickname: '',
    password: '',
    passwordRepeat: '',
    uemailErrorMessage: null,
    unameErrorMessage: null,
    nicknameErrorMessage: null,
    passwordErrorMessage: null,
    passwordConfirmErrorMessage: null,
  }

  componentDidMount () {
    if ($store.isAuthenticated()) {
      this.props.history.push('/')
    }
  }

  handleAgreeClick = () => {
    let { agree } = this.state
    this.setState({
      agree: !agree
    })
  }

  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value })
  }

  autoLogin = async (uemail, password) => {
    try{
      let res = await axios.post('/auth/token', {
        uemail,
        password
      })
      $store.setToken(res.data.token)
      res = await axios.get(`/users/${this.state.uemail}`, {
        headers: {'Authorization': `bearer ${res.data.token}`}
      })
      $store.setUser(res.data.users[0])
      this.props.history.push('/')
    } catch(error) {
      console.error(error)
    }
  }

  // generate error messages, if any
  validate = (uemail, username, nickname, password, passwordRepeat) => {
    let uemailErrorMessage = null
    let unameErrorMessage = null
    let nicknameErrorMessage = null
    let passwordErrorMessage = null
    let passwordConfirmErrorMessage = null

    if (password !== passwordRepeat) {
      passwordConfirmErrorMessage = 'passwords do not match'
    }

    return {
      uemailErrorMessage,
      unameErrorMessage,
      nicknameErrorMessage,
      passwordErrorMessage,
      passwordConfirmErrorMessage
    }
  }

  handleSubmit = async (event) => {
    event.preventDefault()
    const {uemail, uname, nickname, password, passwordRepeat } = this.state
    const {
      uemailErrorMessage,
      unameErrorMessage,
      nicknameErrorMessage,
      passwordErrorMessage,
      passwordConfirmErrorMessage
    } = this.validate(uemail, uname, nickname, password, passwordRepeat)
    if (uemailErrorMessage || unameErrorMessage || nicknameErrorMessage || passwordErrorMessage || passwordConfirmErrorMessage) {
      this.setState({
        uemailErrorMessage,
        unameErrorMessage,
        nicknameErrorMessage,
        passwordErrorMessage,
        passwordConfirmErrorMessage
      })
      return
    }
    try {
      let res = await axios.post('/users', {
        uemail,
        username: uname,
        nickname,
        password
      })
      if (res.data.success) {
        this.setState({
          uemailErrorMessage: '',
          unameErrorMessage: '',
          nicknameErrorMessage: '',
          passwordErrorMessage: '',
          passwordConfirmErrorMessage: ''
        })
        // success
        await this.autoLogin(this.state.uemail, this.state.password)
      } else {
        // handle error
        this.setState({
          uemailErrorMessage: res.data.error
        })
      }
    } catch (error) {
      console.error(error)
    }
  }

  handleGoBackClick = () => {
    this.props.history.push('/signin')
  }

  render() {
    const { classes } = this.props
    return (
      <main className={classes.main}>
        <CssBaseline />
        <Paper className={classes.paper}>
          <Avatar className={classes.avatar}>
            <AccountCircleIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Register
          </Typography>
          <form
            className={classes.form}
            onSubmit={this.handleSubmit}
          >
            <FormControl
              margin="dense"
              required
              fullWidth
              error={Boolean(this.state.uemailErrorMessage)}
            >
              <InputLabel htmlFor="uemail">Email Address</InputLabel>
              <Input
                id="uemail"
                name="uemail"
                value={this.state.uemail}
                onChange={this.handleChange}
                autoFocus
              />
              {
                this.state.uemailErrorMessage &&
                <FormHelperText>{this.state.uemailErrorMessage}</FormHelperText>
              }
            </FormControl>
            <FormControl
              margin="dense"
              required
              fullWidth
              error={Boolean(this.state.unameErrorMessage)}
            >
              <InputLabel htmlFor="uname">Full Name</InputLabel>
              <Input
                id="uname"
                name="uname"
                value={this.state.uname}
                onChange={this.handleChange}
              />
              {
                this.state.unameErrorMessage &&
                <FormHelperText>{this.state.unameErrorMessage}</FormHelperText>
              }
            </FormControl>
            <FormControl
              margin="dense"
              required
              fullWidth
              error={Boolean(this.state.nicknameErrorMessage)}
            >
              <InputLabel htmlFor="nickname">Nickname</InputLabel>
              <Input
                id="nickname"
                name="nickname"
                value={this.state.nickname}
                onChange={this.handleChange}
              />
              {
                this.state.nicknameErrorMessage &&
                <FormHelperText>{this.state.nicknameErrorMessage}</FormHelperText>
              }
            </FormControl>
            <FormControl
              margin="dense"
              required
              fullWidth
              error={Boolean(this.state.passwordErrorMessage)}
            >
              <InputLabel htmlFor="password">Password</InputLabel>
              <Input
                id="password"
                name="password"
                type="password"
                value={this.state.password}
                onChange={this.handleChange}
              />
              {
                this.state.passwordErrorMessage &&
                <FormHelperText>{this.state.passwordErrorMessage}</FormHelperText>
              }
            </FormControl>
            <FormControl
              margin="dense"
              required
              fullWidth
              error={Boolean(this.state.passwordConfirmErrorMessage)}
            >
              <InputLabel htmlFor="password">Confirm Password</InputLabel>
              <Input
                id="passwordRepeat"
                name="passwordRepeat"
                type="password"
                value={this.state.passwordRepeat}
                onChange={this.handleChange}
              />
              {
                this.state.passwordConfirmErrorMessage &&
                <FormHelperText>{this.state.passwordConfirmErrorMessage}</FormHelperText>
              }
            </FormControl>
            <FormControlLabel
              control={
                <Checkbox
                  checked={this.state.agree}
                  onChange={this.handleAgreeClick}
                  value="agree"
                  color="primary"
                />
              }
              label="Agree to Snickr's policy"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              Sign up
            </Button>
            <Button
              className={classes.submit}
              fullWidth
              variant="contained"
              onClick={this.handleGoBackClick}
            >
              Go back to login
            </Button>
          </form>
        </Paper>
      </main>
    )
  }
}

export default withRouter(withStyles(styles)(Signup))
