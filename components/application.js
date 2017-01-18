console.log('Looking for a developer? Visit our "Meet the Developers" pages!')
//react imports
import React from 'react'
import ReactDOM from 'react-dom'
import { Router, Route, IndexRoute, Link, browserHistory } from 'react-router'


//component imports
import App from './App'
import Homepage from './Homepage'
import FindBeer from './FindBeer'
import FindBrewery from './FindBrewery'
import BeerResult from './BeerResult'
import BrewResult from './BrewResult'
import Signup from './Signup'
import Login from './Login'
import UserProfile from './UserProfile'





ReactDOM.render(
    <Router history={browserHistory}>
        <Route path='/' component={App} >
            <IndexRoute component={Homepage} />
            <Route path='signup' component={Signup} />
                <Route path='login' component={Login} />
                <Route path='userprofile' component={UserProfile} />
            <Route path='find_beer' component={FindBeer} />
                <Route path='beer/:beer_id' component={BeerResult} />
            <Route path='find_brew' component={FindBrewery} />
                <Route path='brew/:brew_id' component={BrewResult} />
        </Route>
    </Router>
    , document.getElementById('aleNomad')
)
