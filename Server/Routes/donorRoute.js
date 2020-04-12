const express = require("express");
const {
  donorSignup,
  donorSignin,
  donorSignout,
  getDonors
} = require("../Controllers/donorAuth");

const router = express.Router();

router.post("/donor/signup", donorSignup);
router.post("/donor/signin", donorSignin);
router.get("/donor/signout", donorSignout);
router.get("/donor/getdonors", getDonors);

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
