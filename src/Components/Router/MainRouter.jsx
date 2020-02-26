import React from "react";
import { Route, Switch } from "react-router-dom";
import Navbar from "../Navbar/Navbar";

import Home from "../Home/Home";
import Signin from "../Auth/Signin";
import Signup from "../Auth/Signup";

import BloodBank from "../Auth/BloodBank/BloodBank";
import BloodBankSignin from "../Auth/BloodBank/BloodBankSignin";
import BloodBankSignup from "../Auth/BloodBank/BloodBankSignup";

import Driver from "../Auth/Driver/Driver";
import DriverSignin from "../Auth/Driver/DriverSignin";
import DriverSignup from "../Auth/Driver/DriverSignup";

import Donor from "../Auth/Donor/Donor";
import DonorSignin from "../Auth/Donor/DonorSignin";
import DonorSignup from "../Auth/Donor/DonorSignup";

import Reciever from "../Auth/Reciever/Reciever";
import RecieverSignin from "../Auth/Reciever/RecieverSignin";
import RecieverSignup from "../Auth/Reciever/RecieverSignup";

const Mainrouter = () => {
	return (
		<>
			<Navbar />
			<Switch>
				<Route exact path="/" component={Home}></Route>
				<Route path="/signup" component={Signup}></Route>
				<Route path="/signin" component={Signin}></Route>

				<Route exact path="/bloodbank" component={BloodBank}></Route>
				<Route path="/bloodbank/signin" component={BloodBankSignin}></Route>
				<Route path="/bloodbank/signup" component={BloodBankSignup}></Route>

				<Route exact path="/driver" component={Driver}></Route>
				<Route path="/driver/signin" component={DriverSignin}></Route>
				<Route path="/driver/signup" component={DriverSignup}></Route>

				<Route exact path="/donor" component={Donor}></Route>
				<Route path="/donor/signin" component={DonorSignin}></Route>
				<Route path="/donor/signup" component={DonorSignup}></Route>

				<Route exact path="/reciever" component={Reciever}></Route>
				<Route path="/reciever/signin" component={RecieverSignin}></Route>
				<Route path="/reciever/signup" component={RecieverSignup}></Route>
			</Switch>
		</>
	);
};

export default Mainrouter;
