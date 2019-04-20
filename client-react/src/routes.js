import React from 'react'
import { Route, HashRouter, Redirect, Switch } from 'react-router-dom'
// import Dashboard from './components/Dashboard'
// import Wizard from './components/Wizard'
// import Cards from './components/Cards'
import Main from './components/Main'
import Signin from './components/Signin'
// import Signup from './components/Signup'
import ScrollToTop from './components/ScrollTop'

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
    <HashRouter>
      <ScrollToTop>
        <Switch>
          <PrivateRoute exact path='/' component={ Main } />
          <Route exact path='/signin' component={ Signin } />
          {/* <Route exact path='/dashboard' component={ Dashboard } />
          <Route exact path='/signup' component={ Signup } />
          <Route exact path='/wizard' component={ Wizard } />
          <Route exact path='/cards' component={ Cards } /> */}
        </Switch>
      </ScrollToTop>
    </HashRouter>
  )
