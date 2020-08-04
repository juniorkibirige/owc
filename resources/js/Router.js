import React from 'react';
import { BrowserRouter, Link, Route, Switch } from 'react-router-dom';

import Home from './components/Home/Home'
import Login from './views/Login/Login'
import Register from './views/Register/Register'
import NotFound from './views/NotFound/NotFound'
import PoliceForm from './components/PoliceForm'
import Client from './views/user/Client/Client'
require('./variables/config')

import PrivateRoute from './PrivateRoute'
import Dashboard from './views/user/Dashboard/Dashboard'

const Main = props => (
    <Switch>
        {/* User cannot login */}
        <Route exact path='/' component={Client} />

        {/* User may login */}
        <Route exact path='/admin' component={Home} />
        <Route path='/create' component={PoliceForm} />

        {/* User must login */}
        <Route path='/login' component={Login} />
        <Route path='/register' component={Register} />

        {/* User is LoggedIn */}
        <PrivateRoute path='/dashboard' component={Dashboard} />

        {/* Error 404 */}
        {/* <Route component={NotFound}/> */}

    </Switch>
)

export default Main