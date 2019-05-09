import React from 'react'
import { Route, BrowserRouter, Redirect, Switch } from 'react-router-dom'
import ScrollToTop from './components/commons/ScrollTop'
import Main from './components/pages/Main'
import Workspace from './components/pages/Workspace'
import Signin from './components/pages/Signin'
import Signup from './components/pages/Signup'
import NotFound from './components/pages/NotFound'

import store from './store'


function PrivateRoute({ component: Component, ...rest }) {
  return (
    <Route
      {...rest}
      render={(props) => {
        return store.isAuthenticated() ?
          (
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
      }
    />
  )
}

export default props => (
    <BrowserRouter>
      <ScrollToTop>
        <Switch>
          <PrivateRoute exact path="/" component={ Main } />
          <PrivateRoute exact path="/workspace/:wid" component={ Workspace } />
          <Route exact path="/signin" component={ Signin } />
          <Route exact path="/signup" component={ Signup } />
          <Route path="" component={ NotFound } />
        </Switch>
      </ScrollToTop>
    </BrowserRouter>
  )
