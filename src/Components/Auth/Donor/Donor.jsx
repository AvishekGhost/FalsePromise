import React, { useState, useEffect } from "react";
import { isAuthenticated } from "./index";
import classes from './DonorSignup.css'
import {DisplayMapFC} from './DisplayMapFC';
const Donor = () => {

//	const [Name, setName] = useState("");
	const [Latitude, setLatitude] = useState(100);
	const [Longitude, setLongitude] = useState(100);
	const center = { lat: 0, lng: 0 };
	

  //useEffect(() => {});
  return (
    <div>
      <h1>Donor</h1>
	  <div className={classes.name}>
      <div className={classes.name}>Welcome, {isAuthenticated().donor.name}</div>
	  </div>
		<DisplayMapFC></DisplayMapFC>
      <p id="data"></p>
    </div>
  );
};

export default Donor;
