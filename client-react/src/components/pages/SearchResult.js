import React from 'react'
import PropTypes from 'prop-types'
import axios from 'axios'
import CssBaseline from '@material-ui/core/CssBaseline'
import { withStyles } from '@material-ui/core/styles'
import { withRouter } from 'react-router-dom'
import IconButton from '@material-ui/core/IconButton'
import CloseIcon from '@material-ui/icons/Close'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import Paper from '@material-ui/core/Paper'

import $store from '../../store'


const styles = theme => ({
  panelContainer: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'flex-start',
    overflowX: 'hidden',
    overflowY: 'auto',
  },
  content: {
    width: '640px',
    height: '100vh',
    maxWidth: '100%',
    display: 'flex',
    flexDirection: 'column',
    paddingTop: theme.spacing.unit * 13,
    marginLeft: theme.spacing.unit * 4,
    marginRight: theme.spacing.unit * 4,
  },
  title: {
    color: '#1d1c1d',
    fontSize: '34px',
    lineHeight: '41px',
    fontWeight: 700,
    marginBottom: theme.spacing.unit * 3,
  },
  closeButton: {
    position: 'absolute',
    right: '4rem',
    top: '3.5rem',
  },
  inputContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: theme.spacing.unit,
  },
  table: {
    minWidth: 790,
  },
  paperRoot: {
    width: '100%',
    marginTop: theme.spacing.unit * 3,
    overflowX: 'auto',
  },
})

const getTimeStr = (time) => {
  const t = new Date(time)
  return `${t.getFullYear()}-${t.getMonth() + 1}-${t.getDate()}`
}

class searchResult extends React.Component {
  state = {
    searchResult: []
  }

  componentDidMount = async () => {
    await this.updateResult()
  }

  updateResult = async () => {
    const { match } = this.props
    const query = match.params.query
    const token = $store.getToken()
    const uemail = $store.getUser().uemail
    try {
      const { data } = await axios.get(`/message/search/${uemail}/${query}`, {
        headers: {'Authorization': `bearer ${token}`}
      })
      this.setState({
        searchResult: data.message
      })
    } catch(error) {
      console.error(error)
    }
  }

  handleClose = () => {
    this.props.history.push('/')
  }

  render() {
    const { classes } = this.props
    const query = this.props.match.params.query
    return (
      <main>
        <CssBaseline />
        <div className={classes.panelContainer}>
          <IconButton
            color="inherit"
            fontSize="large"
            onClick={this.handleClose}
            aria-label="Close"
            className={classes.closeButton}
          >
            <CloseIcon />
          </IconButton>
          <div className={classes.content}>
            {
              this.state.searchResult.length > 0 &&
              <React.Fragment>
                <div className={classes.title}>
                  Search Result for {`"${query}"`}
                </div>
                <Paper className={classes.paperRoot}>
                  <Table className={classes.table}>
                    <TableHead>
                      <TableRow>
                        <TableCell>Message</TableCell>
                        <TableCell>Sender</TableCell>
                        <TableCell>Workspace</TableCell>
                        <TableCell>Channel</TableCell>
                        <TableCell>Time</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {this.state.searchResult.map(row => (
                        <TableRow key={row.mtime}>
                          <TableCell component="th" scope="row">
                            {row.mcontent}
                          </TableCell>
                          <TableCell>{row.nickname}</TableCell>
                          <TableCell>{row.wname}</TableCell>
                          <TableCell>{row.cname}</TableCell>
                          <TableCell>{getTimeStr(row.mtime)}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </Paper>
              </React.Fragment>
            } {
              this.state.searchResult.length === 0 &&
              <div className={classes.title}>
                No Matched Result
              </div>
            }
          </div>
        </div>
      </main>
    )
  }
}

searchResult.propTypes = {
  classes: PropTypes.object.isRequired,
}

export default withRouter(withStyles(styles)(searchResult))

