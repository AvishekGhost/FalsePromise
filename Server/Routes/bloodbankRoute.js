const express = require("express");
const {
  bloodbankSignup,
  bloodbankSignin,
  bloodbankSignout,
  getbloodbank,
  temp
} = require("../Controllers/bloodbankAuth");

const router = express.Router();

router.post("/bloodbank/signup", bloodbankSignup);
router.post("/bloodbank/signin", bloodbankSignin);
router.get("/bloodbank/signout", bloodbankSignout);
router.get("/bloodbank/getbloodbank", getbloodbank);
router.get("/bloodbank/temp", temp);

module.exports = router;
//json object will look like this
/*{
	"name": "nigga",
	"phone": 1234,
	"blood_availability": {
			"a_pos": 10,
			"a_neg": 20,
			"b_pos": 25,
			"b_neg": 30,
			"o_pos": 40,
			"o_neg": 50,
			"ab_pos": 60,
			"ab_neg": 70
	},
	"address": "Nigga house",
	"latitude": 12,
	"longitude": 21,
	"email": "im@nigga.com",
	"password": "1234"
}*/
