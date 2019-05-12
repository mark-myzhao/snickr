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
import LockOutlinedIcon from '@material-ui/icons/LockOutlined'
import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography'
import withStyles from '@material-ui/core/styles/withStyles'
import { withRouter } from 'react-router-dom'

import store from '../../store'


const styles = theme => ({
  main: {
    width: 'auto',
    display: 'block', // Fix IE 11 issue.
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
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing.unit,
  },
  submit: {
    marginTop: theme.spacing.unit * 2,
    backgroundColor: theme.palette.primary['A100']
  }
})

class SignIn extends Component {
  state = {
    remember: true,
    uemail: '',
    password: '',
    emailErrorMessage: null,
    passwordErrorMessage: null,
  }

  componentDidMount () {
    if (store.isAuthenticated()) {
      this.props.history.push('/')
    }
  }

  handleRememberClick = () => {
    let { remember } = this.state
    this.setState({
      remember: !remember
    })
  }

  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value })
  }

  handleSubmit = async (e) => {
    e.preventDefault()
    try {
      let res = await axios.post('/auth/token', {
        uemail: this.state.uemail,
        password: this.state.password
      })
      store.setToken(res.data.token)
      res = await axios.get(`/users/${this.state.uemail}`, {
        headers: {'Authorization': `bearer ${res.data.token}`}
      })
      store.setUser(res.data.users[0])
      this.props.history.push('/')
    } catch (error) {
      let { data } = error.response
      if (data.error.toLowerCase().includes('email')) {
        this.setState({
          emailErrorMessage: data.error,
          passwordErrorMessage: null
        })
      } else {
        this.setState({
          emailErrorMessage: null,
          passwordErrorMessage: data.error
        })
      }
    }
  }

  handleSignupClick = () => {
    this.props.history.push('/signup')
  }

  render() {
    const { classes } = this.props
    return (
      <main className={classes.main}>
        <CssBaseline />
        <Paper className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Snickr Login
          </Typography>
          <form
            className={classes.form}
            onSubmit={this.handleSubmit}
          >
            <FormControl
              margin="normal"
              required
              fullWidth
              error={Boolean(this.state.emailErrorMessage)}
            >
              <InputLabel htmlFor="uemail">Email Address</InputLabel>
              <Input
                id="uemail"
                name="uemail"
                value={this.state.uemail}
                onChange={this.handleChange}
                autoComplete="email"
                autoFocus
              />
              {
                this.state.emailErrorMessage &&
                <FormHelperText>{this.state.emailErrorMessage}</FormHelperText>
              }
            </FormControl>
            <FormControl
              margin="normal"
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
                autoComplete="current-password"
              />
              {
                this.state.passwordErrorMessage &&
                <FormHelperText>{this.state.passwordErrorMessage}</FormHelperText>
              }
            </FormControl>
            <FormControlLabel
              control={
                <Checkbox
                  checked={this.state.remember}
                  onChange={this.handleRememberClick}
                  value="remember"
                  color="primary"
                />
              }
              label="Remember me"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              Sign in
            </Button>
            <Button
              fullWidth
              variant="contained"
              className={classes.submit}
              onClick={this.handleSignupClick}
            >
              Sign up
            </Button>
          </form>
        </Paper>
      </main>
    )
  }
}

export default withRouter(withStyles(styles)(SignIn))
