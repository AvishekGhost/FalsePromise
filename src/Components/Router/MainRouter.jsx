import React from "react";
import { Route, Switch } from "react-router-dom";
import Navbar from '../Navbar/Navbar';
import Home from '../Home/Home';
import Signup from '../Auth/Signup';
import Signin from '../Auth/Signin';

const Mainrouter = () => {
  return (
    <div>
      <Navbar />
      <Switch>
        <Route exact path="/" component={Home}></Route>
        <Route path="/signup" component={Signup}></Route>
        <Route path="/signin" component={Signin}></Route>
      </Switch>
    </div>
  )
}

export default Mainrouter;