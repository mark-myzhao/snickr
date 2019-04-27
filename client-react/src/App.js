import React, { Component } from 'react'
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles'
import 'typeface-roboto'
import './App.css'
import { blue, indigo } from '@material-ui/core/colors'
import Routes from './routes'
// import 'typeface-roboto'

const theme = createMuiTheme({
  palette: {
    secondary: {
      main: blue[900]
    },
    primary: {
      main: indigo[700]
    }
  },
  typography: {
    useNextVariants: true,
    fontFamily: [
      'Roboto',
      '"Lato"',
      'sans-serif'
    ].join(',')
  }
})

class App extends Component {
  render() {
    return (
      <div>
        <MuiThemeProvider theme={theme}>
          <Routes />
        </MuiThemeProvider>
      </div>
    )
  }
}

export default App
