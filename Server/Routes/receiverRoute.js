const express = require("express");
const {
	receiverSignup,
	receiverSignin,
	receiverSignout,
	getreceivers
} = require("../Controllers/receiverAuth");

const router = express.Router();

router.post("/receiver/signup", receiverSignup);
router.post("/receiver/signin", receiverSignin);
router.get("/receiver/signout", receiverSignout);
router.get("/receiver/getreceivers", getreceivers);

module.exports = router;

/*
{
    "name": "nigga",
    "blood" : "niggative",
    "phone": 1234,
    "address": "Nigga house",
    "latitude": 12,
    "longitude": 21,
    "email": "im@nigga.com",
    "password": "1234"
  }*/
