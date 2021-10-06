import React from 'react'
import { BrowserRouter } from 'react-router-dom';
import { Redirect, Route, Switch } from 'react-router';
import Board from '../components/areas/index'
function Routers() {
  return (

    <BrowserRouter>
    <Switch>
      <Route path={`/`} component={Board} />
    </Switch>
  </BrowserRouter>
  )
}

export default Routers
