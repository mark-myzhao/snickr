import React from 'react'
import { Route, BrowserRouter, Redirect, Switch } from 'react-router-dom'
// import Dashboard from './components/Dashboard'
// import Wizard from './components/Wizard'
// import Cards from './components/Cards'
import Main from './components/pages/Main'
import Signin from './components/pages/Signin'
// import Signup from './components/Signup'
import ScrollToTop from './components/commons/ScrollTop'

const fakeAuth = {
  isAuthenticated: true
}

function PrivateRoute({ component: Component, ...rest }) {
  return (
    <Route
      {...rest}
      render={props =>
        fakeAuth.isAuthenticated ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{
              pathname: "/signin",
              state: { from: props.location }
            }}
          />
        )
      }
    />
  )
}

export default props => (
    <BrowserRouter>
      <ScrollToTop>
        <Switch>
          <PrivateRoute exact path='/' component={ Main } />
          <Route exact path='/signin' component={ Signin } />
          {/* <Route exact path='/dashboard' component={ Dashboard } />
          <PrivateRoute exact path='/signup' component={ Signup } />
          <PrivateRoute exact path='/wizard' component={ Wizard } />
          <PrivateRoute exact path='/cards' component={ Cards } /> */}
        </Switch>
      </ScrollToTop>
    </BrowserRouter>
  )