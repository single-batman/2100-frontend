import React, { Component } from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import { merge } from 'lodash'

import Discover from './components/Discover'
import Asset from './components/Asset'
import Settle from './components/Settle'
import Portfolio from './components/Portfolio'
import Nav from './components/Nav'
import Wallet from './components/Wallet'

// import API from './api'
import { findStake } from './utils'

import './App.scss'

class App extends Component {
  render () {
    return (
      <Router>
        <Nav />
        <div className='container-fluid'>
          <Route exact path='/' component={Discover} />
          <Route path='/wallet' component={Wallet} />
        </div>
      </Router>
    )
  }
}

export default App
