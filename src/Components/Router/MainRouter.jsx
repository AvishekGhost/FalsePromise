import React from "react";
import { Route, Switch } from "react-router-dom";
import Navbar from "../Navbar/Navbar";
import Home from "../Home/Home";
import Signup from "../Auth/Signup/Reciever/Signup";
import Signin from "../Auth/Signin";
import Donor from "../Auth/Signup/Donor/Donor";

const Mainrouter = () => {
	return (
		<div>
			<Navbar />
			<Switch>
				<Route exact path="/" component={Home}></Route>
				<Route path="/signup" component={Signup}></Route>
				<Route path="/signin" component={Signin}></Route>
				<Route path="/donor" component={Donor}></Route>
			</Switch>
		</div>
	);
};

export default Mainrouter;
