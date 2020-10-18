import React, { useState } from 'react'
import { Switch, Route } from 'react-router-dom'
import Home from './pages/Home'
import Host from './pages/Host'
import Quiz from './pages/Quiz'
import Waiting from './pages/Waiting'
import Leaderboard from './pages/Leaderboard'

const Main = () => {
  
  return (
    <Switch>
      <Route exact path='/' component={Home}></Route>
      <Route exact path='/host' component={Host}></Route>
      <Route exact path='/quiz' component={Quiz}></Route>
      <Route exact path='/waiting' component={Waiting}></Route>
      <Route exact path='/leaderboard' component={Leaderboard}></Route>
    </Switch>
  )
}

export default Main