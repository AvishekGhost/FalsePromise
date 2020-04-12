const express = require("express");
const {
	driverSignup,
	driverSignin,
	driverSignout
} = require("../Controllers/driverAuth");

const router = express.Router();

router.post("/driver/signup", driverSignup);
router.post("/driver/signin", driverSignin);
router.get("/driver/signout", driverSignout);

module.exports = router;

/*

{
    "name": "nigga",
    "phone": 1234,
    "address": "Nigga house",
    "latitude": 12,
    "longitude": 21,
    "email": "im@nigga.com",
    "password": "1234"
  }
	
	*/
