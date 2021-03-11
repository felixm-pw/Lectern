// React
import React from 'react'
// External
import { Route, Switch, BrowserRouter } from 'react-router-dom'
// Internal
import Home from './components/Home.jsx'
import Module from './components/ModulePage.jsx'
import Video from './components/VideoPlayer.jsx'

class MainRouter extends React.Component {
  render() {
    return (
      <div>
        <BrowserRouter>
          <Switch>
            <Route path="/" exact component={Home}/>
            <Route path="/home" exact component={Home}/>
            <Route path="/module" exact component={Module}/>
            <Route path="/player" exact component={Video}/>
          </Switch>
        </BrowserRouter>
      </div>
    );
  }
}
export default MainRouter
