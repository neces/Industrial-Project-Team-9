import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Home from './pages/Home';
import Host from './pages/Host';
import Quiz from './pages/Quiz';

const Main = () => {

  return (
    <Switch>
      <Route exact path='/' component={Home}></Route>
      <Route exact path='/host' component={Host}></Route>
      <Route exact path='/quiz' component={Quiz}></Route>
    </Switch>
  )
}

export default Main