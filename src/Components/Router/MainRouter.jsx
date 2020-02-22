import React from "react";
import { Route, Switch } from "react-router-dom";
import Home from '../Home/Home';
import Signup from '../Auth/Signup';

const Mainrouter = () => {
  return (<div>
    <Switch>
      <Route exact path="/" component={Home}></Route>
      <Route path="/signup" component={Signup}></Route>
    </Switch>
  </div>)
}

export default Mainrouter;